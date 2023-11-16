import CardComponent from "@/components/cardComponent";
import { UserContext } from "@/store/userContext";
import axios from "@/config/axios";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react"
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Home() {
    const { isAdmin, isAnalist } = useContext(UserContext);
    const [nome, setNome] = useState('');
    const [_id, setId] = useState('');
    const [busca, setBusca] = useState('');
    const [lista, setLista] = useState([]);
    const listaFiltrada = lista.filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {
        getLista();
    }, [])

    async function getLista() {
        const res = await axios.get('/api/localidade');
        setLista(res.data);
    }

    async function salvar() {
        if (_id === '') {
            await axios.post('/api/localidade', {
                nome
            });
        } else {
            await axios.put('/api/localidade', {
                _id,
                nome
            });
        }
        toast.success('Local cadastrado com sucesso.');
        setNome('');
        setId('');
        getLista();
    }

    async function updateStatus(_id, status) {
        await axios.put('/api/localidade', {
            _id,
            bloqueado: !status
        });
        toast.success(`Local ${!status ? 'bloqueado' : 'ativado'} com sucesso.`)
        getLista();
    }

    async function deleteItem(_id) {
        await axios.delete('/api/localidade', {
            data: {
                _id
            }
        })
            .then(() => {
                toast.success("Local deletado com sucesso.");
                getLista();
            })
    }

    return (
        <main className="col" >
            <div className="mb-4 fs-4">
                Local
            </div>
            {isAnalist() || isAdmin() ?
                <div className='form-floating btn-group col-12'>
                    <input value={nome} className='form-control' id='cadastrar' type='text' placeholder="Cadastrar" onChange={e => setNome(e.target.value)} />
                    <label htmlFor='cadastrar'>Nome</label>
                    <button className="btn btn-primary" onClick={salvar}>
                        {_id == '' ?
                            "Cadastrar"
                            : "Atualizar"
                        }
                    </button>
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
                                    <CardComponent key={item._id} >
                                        <div>
                                            <label className="fw-bolder">Nome:</label> {item.nome}
                                        </div>
                                        <div>
                                            <label className="fw-bolder">Bloqueado:</label>  {item.bloqueado ? "Sim" : "Não"}
                                        </div>
                                        <div>
                                            <label className="fw-bolder">Data Criação:</label>  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                        </div>
                                        <div>
                                            <label className="fw-bolder">Última Atualização:</label>  {moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}
                                        </div>
                                        {isAnalist() || isAdmin() ?
                                            <div className='btn-group mt-2 col-12'>
                                                {!item.bloqueado ?
                                                    <button className="btn btn-danger" onClick={() => { updateStatus(item._id, item.bloqueado) }} >
                                                        <FaTimes />
                                                        Bloquear
                                                    </button>
                                                    :
                                                    <>
                                                        <button className="btn btn-success" onClick={() => { updateStatus(item._id, item.bloqueado) }} >
                                                            <FaCheck />
                                                            Ativar
                                                        </button>
                                                        <button className="btn btn-danger" onClick={() => { deleteItem(item._id) }} >
                                                            <FaTrash />
                                                            Excluir
                                                        </button>
                                                    </>
                                                }
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