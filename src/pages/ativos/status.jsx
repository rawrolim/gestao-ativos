import CardComponent from "@/components/cardComponent";
import { UserContext } from "@/store/userContext";
import axios from "@/config/axios";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { FaArrowLeft, FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Marcas() {
    const { isAdmin, isAnalist } = useContext(UserContext);
    const [nome, setNome] = useState('');
    const [bloqueia_ativo, setBloqueiaAtivo] = useState(false);
    const [_id, setId] = useState('');
    const [busca, setBusca] = useState('');
    const [lista, setLista] = useState([]);
    const listaFiltrada = lista.filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()));
    const router = useRouter();

    useEffect(() => {
        getLista();
    }, [])

    async function getLista() {
        const res = await axios.get('/api/status');
        setLista(res.data);
    }

    async function salvar() {
        if (_id === '') {
            await axios.post('/api/status', {
                nome: nome.toUpperCase(),
                bloqueia_ativo: bloqueia_ativo === 'true' ? true : false
            });
        } else {
            await axios.put('/api/status', {
                _id,
                nome: nome.toUpperCase(),
                bloqueia_ativo: bloqueia_ativo === 'true' ? true : false
            });
        }
        toast.success('status cadastrado com sucesso.');
        setNome('');
        setId('');
        setBloqueiaAtivo(false)
        getLista();
    }

    async function updateStatus(_id, status) {
        await axios.put('/api/status', {
            _id,
            bloqueado: !status
        });
        toast.success(`Status ${!status ? 'bloqueado' : 'ativado'} com sucesso.`)
        getLista();
    }

    async function deleteItem(_id) {
        await axios.delete('/api/status', {
            data: {
                _id
            }
        })
            .then(() => {
                toast.success("status deletado com sucesso.");
                getLista();
            })
    }

    return (
        <main className="col" >
            <div className="mb-4 fs-4">
                <FaArrowLeft onClick={() => { router.push('/ativos') }} /> Status dos ativos
            </div>
            {isAnalist() || isAdmin() ?
                <>
                    <div className='d-flex col-12'>
                        <div className="col">
                            <label className="text-white">Nome: </label>
                            <input value={nome} className='form-control rounded-0' id='cadastrar' type='text' placeholder="Cadastrar" onChange={e => setNome(e.target.value)} />
                        </div>
                        <div className='col'>
                            <label className="text-white">Bloqueia Ativo: </label>
                            <select value={bloqueia_ativo} className='form-control rounded-0' id='inativar' onChange={e => setBloqueiaAtivo(e.target.value)} >
                                <option value={false}>Não</option>
                                <option value={true}>Sim</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 text-end mt-2">
                        <button className="btn btn-primary" onClick={salvar}>
                            {_id == '' ?
                                "Cadastrar"
                                : "Atualizar"
                            }
                        </button>
                    </div>
                </>
                : null
            }

            <div className='mt-5'>
                {lista.length > 0 && lista ?
                    <>
                        <div className='d-flex justify-content-end'>
                            <div className="col-12 col-md-6 col-xl-4 ps-2 pe-2">
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
                                            <label className="fw-bolder">Bloqueia Ativo:</label>  {item.bloqueia_ativo ? "Sim" : "Não"}
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
        </main >
    )
}
