import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import moment from "moment/moment";
import { FaCheck, FaComment, FaEdit, FaHistory, FaTimes, FaTrash } from 'react-icons/fa';

export default function Ativos() {
    const router = useRouter();
    const [lista, setLista] = useState([]);
    const [busca, setBusca] = useState('');
    const listaFiltrada = lista.filter(item => item.modelo.toLowerCase().includes(busca.toLowerCase()) || item.serial.toLowerCase().includes(busca.toLowerCase()))

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

    return (
        <main className="col" >
            <div className='text-end'>
                <button className='btn btn-primary' onClick={() => { router.push('/ativos/formulario/') }}>Cadastrar</button>
            </div>

            <div className='d-flex justify-content-end mt-3'>
                <div className="col-12 col-md-6 col-xl-4 ">
                    <input className='form-control' id='buscar' placeholder='Buscar' onChange={e => setBusca(e.target.value)} />
                </div>
            </div>

            <div className='d-flex flex-wrap'>
                {listaFiltrada.map(item => {
                    return (
                        <div key={item._id} className="col-12 col-md-6 col-xl-4 col rounded p-2">
                            <div className="border p-2 rounded">
                                <div>
                                    <label className='fw-bolder text-light'>Modelo: </label> {item.modelo}
                                </div>
                                <div>
                                    <label className='fw-bolder text-light'>Número de série: </label> {item.serial}
                                </div>
                                <div>
                                    <label className="fw-bolder text-light">Data Criação:</label>  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                </div>
                                <div>
                                    <label className="fw-bolder text-light">Última Atualização:</label>  {moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}
                                </div>
                                <div className='btn-group mt-2 col-12'>
                                    {!item.bloqueado ?
                                        <>
                                            <button className="btn btn-danger" onClick={() => { updateStatus(item._id, item.bloqueado) }} >
                                                <FaTimes className='me-1' />
                                                Bloquear
                                            </button>
                                            <button className="btn btn-light" onClick={() => { updateStatus(item._id, item.bloqueado) }} >
                                                <FaComment className='me-1' />
                                                { item.comentarios.length } Comentarios 
                                            </button>
                                            <button className="btn btn-light" onClick={() => { updateStatus(item._id, item.bloqueado) }} >
                                                <FaHistory className='me-1' />
                                                Histórico
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button className="btn btn-success" onClick={() => { updateStatus(item._id, item.bloqueado) }} >
                                                <FaCheck className='me-1' />
                                                Ativar
                                            </button>
                                            <button className="btn btn-danger" onClick={() => { deleteItem(item._id) }} >
                                                <FaTrash className='me-1' />
                                                Excluir
                                            </button>
                                        </>
                                    }
                                    <button className="btn btn-primary" onClick={() => { setId(item._id); setNome(item.nome) }}>
                                        <FaEdit className='me-1' />
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}  