import axios from "@/config/axios";
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import moment from "moment/moment";
import { FaComment, FaEdit, FaHistory, FaPaperPlane, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { UserContext } from '@/store/userContext';
import CardComponent from '@/components/cardComponent';

export default function Ativos() {
    const router = useRouter();
    const { usuario, isAnalist, isAdmin } = useContext(UserContext);
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState('');
    const [historico, setHistorico] = useState([]);
    const [lista, setLista] = useState([]);
    const [listaStatus, setListaStatus] = useState([]);
    const [listaResponsavel, setListaResponsavel] = useState([]);
    const [busca, setBusca] = useState('');
    const [_id, setId] = useState('');
    const listaFiltrada = lista.filter(item => item.modelo.toLowerCase().includes(busca.toLowerCase()) || item.serial.toLowerCase().includes(busca.toLowerCase()) || item.responsavel_obj.nome.toLowerCase().includes(busca.toLowerCase()) || item.localidade_obj.nome.toLowerCase().includes(busca.toLowerCase()) || item.marca_obj.nome.toLowerCase().includes(busca.toLowerCase()) || item.tipo_ativo_obj.nome.toLowerCase().includes(busca.toLowerCase()))

    useEffect(() => {
        getLista();
        getStatus();
        getListaResponsavel();
    }, [])

    async function getLista() {
        await axios.get('/api/ativo', {
            data: {
                bloqueado: false
            }
        }).then(r => {
            setLista(r.data);
        });
    }

    async function updateStatus(item, status_id) {
        const res_status = await axios.get('/api/status', {
            params: {
                _id: status_id
            }
        })
        const status = res_status.data;
        item.bloqueado = status.bloqueia_ativo;
        item.status = status._id;
        item.historico.push({ message: `Status alterado de ${item.status_obj.nome} para ${status.nome}`, createdAt: new Date() });
        await axios.put('/api/ativo', {
            _id: item._id,
            status: status._id,
            bloqueado: item.bloqueado,
            historico: item.historico
        }).then(r => {
            toast.success("Status atualizado com sucesso.")
        });
        getLista();
    }

    async function updateResponsavel(item, responsavel_id) {
        const res_status = await axios.get('/api/usuario', {
            params: {
                _id: responsavel_id
            }
        })
        const status = res_status.data;
        item.historico.push({ message: `Reponsável alterado de ${item.responsavel_obj.nome} para ${status.nome}`, createdAt: new Date() });
        await axios.put('/api/ativo', {
            _id: item._id,
            responsavel: responsavel_id,
            historico: item.historico
        }).then(r => {
            toast.success("Responsável alterado com sucesso.")
        });
        getLista();
    }

    async function deleteItem(_id) {
        await axios.delete('/api/ativo', {
            data: {
                _id
            }
        }).then(() => {
            toast.success('Ativo deletado com sucesso.');
        });
        getLista();
    }

    async function comentar() {
        if (comentario !== '') {
            comentarios.push({
                message: comentario,
                createdAt: new Date(),
                usuario: {
                    _id: usuario._id,
                    nome: usuario.nome
                }
            });
            setComentarios([...comentarios]);

            await axios.put('/api/ativo', {
                _id,
                comentarios
            });
            setComentario("");
            getLista();
        }
    }

    function getStatus() {
        axios.get('/api/status', {
            params: {
                bloqueado: false
            }
        }).then(r => r.data)
            .then(data => setListaStatus(data))
    }

    function getListaResponsavel() {
        axios.get('/api/usuario', {
            params: {
                bloqueado: false
            }
        }).then(r => r.data)
            .then(data => setListaResponsavel(data))
    }
    
    return (
        <main className="col" >

            <div className='d-flex col-12 pe-2 ps-2'>
                <div className='d-flex justify-content-start pe-2 ps-2 col-8'>
                    <div className='btn-group '>
                        <button className='btn btn-light' onClick={()=>router.push("localidades")}>Gestão de localidade</button>
                        <button className='btn btn-light' onClick={()=>router.push("marcas")}>Gestão de marcas</button>
                        <button className='btn btn-light' onClick={()=>router.push("tipo_ativos")}>Gestão de tipo de ativo</button>
                        {(isAnalist() || isAdmin()) && 
                            <button className='btn btn-light border-0' onClick={() => { router.push('/ativos/status') }}>
                                Cadastrar status de ativo
                            </button>
                        }
                    </div>
                </div>
                <div className='d-flex justify-content-end col'>
                    <div className='btn-group'>
                        <button className='btn btn-primary d-flex' onClick={() => { router.push('/ativos/formulario/') }}>
                            <FaPlus className='me-1 align-self-center'/>
                            Cadastrar Ativo
                        </button>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-end mt-3 pe-2 ps-2'>
                <div className="col-12 col-md-6 col-xl-4 ">
                    <input className='form-control' id='buscar' placeholder='Buscar' onChange={e => setBusca(e.target.value)} />
                </div>
            </div>

            <div className='d-flex flex-wrap'>
                {listaFiltrada.map(item => {
                    return (
                        <CardComponent key={item._id} >
                            <div>
                                <label className='fw-bolder'>Modelo: </label> {item.modelo}
                            </div>
                            <div>
                                <label className='fw-bolder'>Tipo de ativo: </label> {item.tipo_ativo_obj.nome}
                            </div>
                            <div>
                                <label className='fw-bolder'>Marca: </label> {item.marca_obj.nome}
                            </div>
                            <div>
                                <label className='fw-bolder'>Número de série: </label> {item.serial}
                            </div>
                            <div>
                                <label className='fw-bolder'>Local: </label> {item.localidade_obj.nome}
                            </div>
                            <div>
                                <label className="fw-bolder">Data Criação:</label>  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                            </div>
                            <div>
                                <label className="fw-bolder">Última Atualização:</label>  {moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}
                            </div>
                            <div>
                                <label className="fw-bolder">Responsável:</label>
                                {(isAnalist() || isAdmin()) ?
                                    <select value={item.responsavel} onChange={e => { updateResponsavel(item, e.target.value) }} className='form-control'>
                                        {listaResponsavel.map(responsavelCurrent => {
                                            return (
                                                <option key={responsavelCurrent._id} value={responsavelCurrent._id}>{responsavelCurrent.nome}</option>
                                            )
                                        })}
                                    </select>
                                    :
                                    item.responsavel_obj.nome
                                }
                            </div>
                            <div>
                                <label className="fw-bolder">Status:</label>
                                {(isAnalist() || isAdmin()) ?
                                    <select value={item.status_obj._id} onChange={e => { updateStatus(item, e.target.value) }} className='form-control'>
                                        {listaStatus.map(statusCurrent => {
                                            return (
                                                <option key={statusCurrent._id} value={statusCurrent._id}>{statusCurrent.nome}</option>
                                            )
                                        })}
                                    </select>
                                    :
                                    item.status_obj.nome
                                }
                            </div>

                            <div className='btn-group col-12 mt-2'>
                                <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#modalComentarios" onClick={() => { setId(item._id); setComentarios(item.comentarios) }} >
                                    {item.comentarios.length}
                                    <FaComment className='ms-1 me-1' />
                                    Comentarios
                                </button>
                                <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#modalHistorico" onClick={() => { setHistorico(item.historico) }} >
                                    {item.historico.length}
                                    <FaHistory className='ms-1 me-1' />
                                    Histórico
                                </button>
                            </div>

                            {isAnalist() || isAdmin() ?

                                <div className='btn-group mt-2 col-12'>
                                    {!item.bloqueado ? null
                                        :
                                        <>
                                            <button className="btn btn-danger" onClick={() => { deleteItem(item._id) }} >
                                                <FaTrash className='me-1' />
                                                Excluir
                                            </button>
                                        </>
                                    }
                                    <button className="btn btn-primary" onClick={() => { router.push('/ativos/formulario?id=' + item._id) }}>
                                        <FaEdit className='me-1' />
                                        Editar
                                    </button>
                                </div>
                                : null}
                        </CardComponent>
                    )
                })}
            </div>

            <div className="modal fade" id="modalHistorico" tabIndex="-1" aria-labelledby="modalHistorico" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-dark" id="modalHistorico">Histórico do ativo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {historico.map(historicoCurrent => {
                                return (
                                    <div className='d-flex flex-wrap border-start pb-2 pt-2' key={historicoCurrent.createdAt}>
                                        <div className='text-muted col-12' style={{ fontSize: '11px' }}>
                                            {moment(historicoCurrent.createdAt).format("DD/MM/YYYY HH:mm")}
                                        </div>
                                        <div className='bg-primary align-self-center me-2' style={{ width: '10px', height: '10px', borderRadius: '100%', marginLeft: '-5px' }}>
                                        </div>
                                        <div className='text-dark col'>
                                            {historicoCurrent.message}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="modalComentarios" tabIndex="-1" aria-labelledby="modalComentarios" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-dark" id="modalComentarios">Comentários do ativo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {usuario !== null && comentarios.map((comentarioCurrent, i) => {
                                return (
                                    <>
                                        {comentarioCurrent.usuario._id === usuario._id ?
                                            <div className='d-flex flex-wrap pb-2 pt-2 text-end' key={i}>
                                                <div className={`text-muted col me-1`} style={{ fontSize: '11px' }}>
                                                    {comentarioCurrent.usuario.nome}
                                                </div>
                                                <div className={`text-muted col-auto`} style={{ fontSize: '11px' }}>
                                                    {moment(comentarioCurrent.createdAt).format("DD/MM/YYYY HH:mm")}
                                                </div>
                                                <div className='text-dark col-12'>
                                                    {comentarioCurrent.message}
                                                </div>
                                            </div>
                                            :
                                            <div className='d-flex flex-wrap pb-2 pt-2' key={comentarioCurrent.createdAt}>
                                                <div className={`text-muted col-auto me-1`} style={{ fontSize: '11px' }}>
                                                    {comentarioCurrent.usuario.nome}
                                                </div>
                                                <div className={`text-muted col`} style={{ fontSize: '11px' }}>
                                                    {moment(comentarioCurrent.createdAt).format("DD/MM/YYYY HH:mm")}
                                                </div>
                                                <div className='text-dark col-12'>
                                                    {comentarioCurrent.message}
                                                </div>
                                            </div>
                                        }
                                    </>
                                )
                            })}
                        </div>
                        {isAnalist() || isAdmin() ?
                            <div className='modal-footer'>
                                <div className='btn-group col-12'>
                                    <input className='form-control' value={comentario} placeholder="Mensagem" onChange={e => setComentario(e.target.value)} />
                                    <button className='btn text-dark' onClick={comentar}>
                                        <FaPaperPlane />
                                    </button>
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </main>
    )
}  