import axios from 'axios';
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import moment from "moment/moment";
import { FaCheck, FaComment, FaEdit, FaHistory, FaPaperPlane, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { UserContext } from '@/store/userContext';

export default function Ativos() {
    const router = useRouter();
    const { usuario } = useContext(UserContext);
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState('');
    const [historico, setHistorico] = useState([]);
    const [lista, setLista] = useState([]);
    const [busca, setBusca] = useState('');
    const [_id, setId] = useState('');
    const listaFiltrada = lista.filter(item => item.modelo.toLowerCase().includes(busca.toLowerCase()) || item.serial.toLowerCase().includes(busca.toLowerCase()) || item.responsavel_obj.nome.toLowerCase().includes(busca.toLowerCase()) || item.localidade_obj.nome.toLowerCase().includes(busca.toLowerCase()) || item.marca_obj.nome.toLowerCase().includes(busca.toLowerCase()) || item.tipo_ativo_obj.nome.toLowerCase().includes(busca.toLowerCase()))

    useEffect(() => {
        getLista();
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

    async function updateStatus(item) {
        let acao = ""
        if (item.bloqueado) {
            acao = "Liberado"
        } else {
            acao = 'Bloqueado'
        }
        item.historico.push({ message: `Ativo ${acao}`, createdAt: new Date() });
        await axios.put('/api/ativo', {
            _id: item._id,
            bloqueado: !item.bloqueado,
            historico: item.historico
        }).then(r => {
            toast.success("Status atualizado com sucesso.")
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

    return (
        <main className="col" >
            <div className='text-end'>
                <button className='btn btn-primary' onClick={() => { router.push('/ativos/formulario/') }}>Cadastrar</button>
            </div>

            <div className='d-flex justify-content-end mt-3 pe-2 ps-2'>
                <div className="col-12 col-md-6 col-xl-4 ">
                    <input className='form-control' id='buscar' placeholder='Buscar' onChange={e => setBusca(e.target.value)} />
                </div>
            </div>

            <div className='d-flex flex-wrap'>
                {listaFiltrada.map(item => {
                    return (
                        <div key={item._id} className="col-12 col-md-6 col-xl-4 col rounded p-2">
                            <div className="border p-2 rounded" style={{ backgroundColor: '#6969d7' }}>
                                <div>
                                    <label className='fw-bolder text-light'>Modelo: </label> {item.modelo}
                                </div>
                                <div>
                                    <label className='fw-bolder text-light'>Tipo de ativo: </label> {item.tipo_ativo_obj.nome}
                                </div>
                                <div>
                                    <label className='fw-bolder text-light'>marca: </label> {item.marca_obj.nome}
                                </div>
                                <div>
                                    <label className='fw-bolder text-light'>Número de série: </label> {item.serial}
                                </div>
                                <div>
                                    <label className='fw-bolder text-light'>Responsável: </label> {item.responsavel_obj.nome}
                                </div>
                                <div>
                                    <label className='fw-bolder text-light'>Local: </label> {item.localidade_obj.nome}
                                </div>
                                <div>
                                    <label className="fw-bolder text-light">Data Criação:</label>  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                </div>
                                <div>
                                    <label className="fw-bolder text-light">Última Atualização:</label>  {moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}
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

                                <div className='btn-group mt-2 col-12'>
                                    {!item.bloqueado ?
                                        <>
                                            <button className="btn btn-danger" onClick={() => { updateStatus(item) }} >
                                                <FaTimes className='me-1' />
                                                Bloquear
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button className="btn btn-success" onClick={() => { updateStatus(item) }} >
                                                <FaCheck className='me-1' />
                                                Ativar
                                            </button>
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
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="modal fade" id="modalHistorico" tabindex="-1" aria-labelledby="modalHistorico" aria-hidden="true">
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


            <div className="modal fade" id="modalComentarios" tabindex="-1" aria-labelledby="modalComentarios" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-dark" id="modalComentarios">Comentários do ativo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {usuario!==null && comentarios.map(comentarioCurrent => {
                                return (
                                    <>
                                        {comentarioCurrent.usuario._id === usuario._id ?
                                            <div className='d-flex flex-wrap pb-2 pt-2 text-end' key={comentarioCurrent.createdAt}>
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
                                        }
                                    </>
                                )
                            })}
                        </div>
                        <div className='modal-footer'>
                            <div className='btn-group col-12'>
                                <input className='form-control' value={comentario} placeholder="Mensagem" onChange={e => setComentario(e.target.value)} />
                                <button className='btn text-dark' onClick={comentar}>
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}  