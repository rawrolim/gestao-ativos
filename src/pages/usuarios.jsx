import axios from "@/config/axios";
import { useContext, useEffect, useState } from "react";
import moment from "moment/moment";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserContext } from "@/store/userContext";
import CardComponent from "@/components/cardComponent";

export default function Usuarios() {
    const { usuario, isAdmin } = useContext(UserContext);
    const [motivo_bloqueio_txt, setMotivoBloqueioTxt] = useState("");
    const [_id, setId] = useState("");
    const [busca, setBusca] = useState("");
    const [lista, setLista] = useState([]);
    const listaFiltrada = lista.filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()) || item.email.toLowerCase().includes(busca.toLowerCase()));
    const acessos = ["ADMINISTRADOR", "USUARIO", "ANALISTA"];

    useEffect(() => {
        getLista();
    }, [])

    function getLista() {
        axios.get('/api/usuario')
            .then(r => setLista(r.data))
    }

    async function ativarStatus(_id) {
        await axios.put('/api/usuario', {
            _id,
            motivo_bloqueio: '',
            bloqueado: false
        });
        toast.success('Usuário ativado com sucesso.');
        getLista();
    }

    async function bloquearStatus() {
        if (usuario._id === _id) {
            toast.error('Não é possível bloquear o próprio usuário.');
        } else {
            await axios.put('/api/usuario', {
                _id,
                motivo_bloqueio: motivo_bloqueio_txt,
                bloqueado: true
            });
            setMotivoBloqueioTxt("");
            setId('');
            toast.success('Usuário bloqueado com sucesso.');
            getLista();
        }
    }

    async function deleteItem(_id) {
        await axios.delete('/api/usuario', {
            "data": {
                _id
            }
        });
        toast.success('Usuário deletado com sucesso.');
        getLista();
    }

    async function updateTipoAcesso(tipo_acesso, _id) {
        toast.promise(
            axios.put('/api/usuario', {
                tipo_acesso,
                _id
            }).then(r => {
                toast.success('Permissões de acesso do usuário alterado.')
            }),
            { 'pending': 'Enviando dados...' }
        );
        getLista()
    }

    return (
        <main className="col" >
            <div className="mb-4 fs-4">
                Usuários
            </div>
            <div className='d-flex flex-wrap justify-content-end'>
                <div className="col-12 col-md-6 col-xl-4 pe-2 ps-2">
                    <input className='form-control' id='buscar' placeholder='Buscar' onChange={e => setBusca(e.target.value)} />
                </div>
                <div className=' col-12 d-flex flex-wrap'>
                    {listaFiltrada.map(item => {
                        return (
                            <CardComponent key={item._id} >
                                <div>
                                    <label className="fw-bolder">Nome:</label> {item.nome}
                                </div>
                                <div>
                                    <label className="fw-bolder">E-mail:</label> {item.email}
                                </div>
                                <div>
                                    <label className="fw-bolder">Telefone:</label> {item.telefone}
                                </div>
                                {item.bloqueado ?
                                    <div>
                                        <label className="fw-bolder">Bloqueado:</label> {item.motivo_bloqueio}
                                    </div>
                                    : null}
                                <div>
                                    <label className="fw-bolder">Data Criação:</label>  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                </div>
                                <div>
                                    <label className="fw-bolder">Última Atualização:</label>  {moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}
                                </div>
                                {isAdmin() ?
                                    <>
                                        <div>
                                            <label className="fw-bolder">Tipo de Acesso:</label>
                                            <select value={item.tipo_acesso} onChange={e => updateTipoAcesso(e.target.value, item._id)} className='form-control'>
                                                <option value=''>Selecione</option>
                                                {acessos.map(acessoCurrent => {
                                                    return <option key={acessoCurrent} value={acessoCurrent}>{acessoCurrent}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className='btn-group mt-2 col-12'>
                                            {!item.bloqueado ?
                                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalUser" onClick={() => { setId(item._id) }} >
                                                    <FaTimes />
                                                    Bloquear
                                                </button>
                                                :
                                                <>
                                                    <button className="btn btn-success" onClick={() => { ativarStatus(item._id, item.bloqueado) }} >
                                                        <FaCheck />
                                                        Ativar
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => { deleteItem(item._id) }} >
                                                        <FaTrash />
                                                        Excluir
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <label className="fw-bolder text-light">Tipo de Acesso:</label>  {item.tipo_acesso}
                                        </div>
                                    </>
                                }
                            </CardComponent>
                        )
                    })}
                </div>
            </div>

            <div className="modal fade" id="modalUser" tabIndex="-1" aria-labelledby="modalUserLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-dark">Bloquear usuário</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea className='form-control' value={motivo_bloqueio_txt} onChange={e => setMotivoBloqueioTxt(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={bloquearStatus}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
