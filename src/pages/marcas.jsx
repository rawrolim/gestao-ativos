import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react"
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Marcas() {
    const [nome, setNome] = useState('');
    const [_id, setId] = useState('');
    const [busca, setBusca] = useState('');
    const [lista, setLista] = useState([]);
    const listaFiltrada = lista.filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {
        getLista();
    }, [])

    async function getLista() {
        const res = await axios.get('/api/marca');
        setLista(res.data);
    }

    async function salvar() {
        if (_id === '') {
            await axios.post('/api/marca', {
                nome
            });
        } else {
            await axios.put('/api/marca', {
                _id,
                nome
            });
        }
        toast.success('Marca cadastrada com sucesso.');
        setNome('');
        setId('');
        getLista();
    }

    async function updateStatus(_id, status) {
        await axios.put('/api/marca', {
            _id,
            bloqueado: !status
        });
        toast.success(`Marca ${!status? 'bloqueada': 'ativada'} com sucesso.`)
        getLista();
    }

    async function deleteItem(_id){
        await axios.delete('/api/marca', {
            data: {
                _id
            }
        })
        .then(()=>{
            toast.success("Marca deletada com sucesso.");
            getLista();
        })
    }

    return (
        <main className="p-3 col" >
            <div className="mb-4 fs-4">
                Marcas
            </div>
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

            <div className='mt-5'>
                {lista.length > 0 && lista ?
                    <>
                        <div className='d-flex justify-content-end'>
                            <div className="col-xs-12 col-md-6 col-xl-4 ">
                                <input className='form-control' id='buscar' placeholder='Buscar' onChange={e => setBusca(e.target.value)} />
                            </div>
                        </div>

                        <div className='d-flex flex-wrap'>
                            {listaFiltrada.map(item => {
                                return (
                                    <div key={item._id} className="col-12 col-md-4 col-xl-3 rounded p-2">
                                        <div className="border p-2 rounded">
                                            <div>
                                                <label className="fw-bolder text-light">Nome:</label> {item.nome}
                                            </div>
                                            <div>
                                                <label className="fw-bolder text-light">Bloqueado:</label>  {item.bloqueado ? "Sim" : "Não"}
                                            </div>
                                            <div>
                                                <label className="fw-bolder text-light">Data Criação:</label>  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                            </div>
                                            <div>
                                                <label className="fw-bolder text-light">Última Atualização:</label>  {moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}
                                            </div>
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
                                        </div>
                                    </div>
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
