import CardComponent from "@/components/cardComponent";
import { UserContext } from "@/store/userContext";
import axios from "axios";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react"
import { FaEdit, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Home() {
    const { isAdmin, isAnalist } = useContext(UserContext);
    const [nome, setNome] = useState('');
    const [_id, setId] = useState('');
    const [busca, setBusca] = useState('');
    const [qtd, setQtd] = useState('');
    const [obs, setObs] = useState('');
    const [lista, setLista] = useState([]);
    const listaFiltrada = lista.filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {
        getLista();
    }, [])

    async function getLista() {
        const res = await axios.get('/api/insumo');
        setLista(res.data);
    }

    async function salvar(item = { _id: '', nome: '', obs: '', qtd: 0 }) {
        if (_id === '' && item._id === '') {
            await axios.post('/api/insumo', {
                nome,
                obs
            });
            toast.success('Insumo cadastrado com sucesso.');
        } else {
            await axios.put('/api/insumo', {
                _id: item._id,
                nome: item.nome,
                obs: item.obs,
                qtd: item.qtd
            });
            toast.success('Insumo atualizado com sucesso.');
        }
        setNome('');
        setId('');
        setQtd(0);
        setObs('');
        getLista();
    }

    async function deleteItem(_id) {
        await axios.delete('/api/insumo', {
            data: {
                _id
            }
        })
            .then(() => {
                toast.success("Insumo deletado com sucesso.");
                getLista();
            })
    }

    return (
        <main className="col" >
            <div className="mb-4 fs-4">
                Insumos
            </div>
            {isAnalist() || isAdmin() ?
                <div className="col-12 d-flex">
                    <div className='form-floating btn-group col'>
                        <input value={nome} className='form-control' id='cadastrar' type='text' placeholder="Cadastrar" onChange={e => setNome(e.target.value)} />
                        <label htmlFor='cadastrar'>Nome</label>
                    </div>
                    <div className='form-floating btn-group col'>
                        <input value={obs} className='form-control' id='observacao' type='text' placeholder="observacao" onChange={e => setObs(e.target.value)} />
                        <label htmlFor='observacao'>Observação</label>

                        {_id !== '' &&
                            <button className="btn btn-danger" onClick={() => { setNome(""); setId(''); setObs("") }}>
                                Cancelar
                            </button>
                        }

                        <button className="btn btn-primary" onClick={() => salvar({ _id, nome, obs, qtd })}>
                            {_id == '' ?
                                "Cadastrar"
                                : "Atualizar"
                            }
                        </button>
                    </div>
                </div>
                : null}

            <div className='mt-5'>
                {lista.length > 0 && lista ?
                    <>
                        <div className='d-flex justify-content-end'>
                            <div className="col-12 col-md-6 col-xl-4 pe-2 ps-2">
                                <input className='form-control' id='buscar' placeholder='Buscar' onChange={e => setBusca(e.target.value)} />
                            </div>
                        </div>

                        <div className='d-flex flex-wrap'>
                            {listaFiltrada.map(item => {
                                return (
                                    <CardComponent key={item._id}>
                                        <div>
                                            <label className="fw-bolder ">Nome:</label> {item.nome}
                                        </div>
                                        <div>

                                            <label className="fw-bolder ">Qtd.:</label>
                                            {(item.qtd > 0 && isAdmin()) &&
                                                <button className='btn' onClick={() => { salvar({ _id: item._id, nome: item.nome, obs: item.obs, qtd: item.qtd - 1 }) }}>
                                                    <FaMinus />
                                                </button>
                                            }
                                            <label className='ms-2 me-2'>
                                                {item.qtd}
                                            </label>
                                            {isAdmin() &&
                                                <button className='btn' onClick={() => { salvar({ _id: item._id, nome: item.nome, obs: item.obs, qtd: item.qtd + 1 }) }}>
                                                    <FaPlus />
                                                </button>
                                            }
                                        </div>
                                        {item.obs !== '' &&
                                            <div>
                                                <label className="fw-bolder ">Obs:</label> {item.obs}
                                            </div>
                                        }
                                        <div>
                                            <label className="fw-bolder ">Data Criação:</label>  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                        </div>
                                        <div>
                                            <label className="fw-bolder ">Última Atualização:</label>  {moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}
                                        </div>
                                        {isAnalist() || isAdmin() ?
                                            <div className='btn-group mt-2 col-12'>
                                                <button className="btn btn-danger" onClick={() => { deleteItem(item._id) }} >
                                                    <FaTrash />
                                                    Excluir
                                                </button>
                                                <button className="btn btn-primary" onClick={() => { setId(item._id); setNome(item.nome) }}>
                                                    <FaEdit />
                                                    Editar
                                                </button>
                                            </div>
                                            : null}
                                    </CardComponent>
                                )
                            })}
                        </div>
                    </>
                    : null
                }
            </div>
        </main>
    )
}  