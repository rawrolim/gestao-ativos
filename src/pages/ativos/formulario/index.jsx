import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Formulario() {
    const router = useRouter();

    const { id } = router.query;
    const [tipo_ativos, setTipoAtivos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [usuarios, setUsuario] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [historico, setHistorico] = useState([]);

    const [modelo, setModelo] = useState('');
    const [tipo_ativo, setTipoAtivo] = useState('');
    const [marca, setMarca] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [serial, setSerial] = useState('');

    useEffect(() => {
        getAllLists();
        if (id)
            getItem();
    }, []);

    async function getItem() {
        await axios.get('/api/ativo', {
            params: {
                "_id": id
            }
        })
            .then(r => r.data)
            .then(data => {
                setModelo(data.modelo);
                setTipoAtivo(data.tipo_ativo);
                setMarca(data.marca);
                setResponsavel(data.responsavel);
                setLocalidade(data.localidade);
                setSerial(data.serial);
                setHistorico(data.historico);
            });
    }

    async function getAllLists() {
        await axios.get('/api/tipo_ativo', {
            data: {
                bloqueado: false
            }
        }).then(r => {
            setTipoAtivos(r.data);
        });

        await axios.get('/api/marca', {
            data: {
                bloqueado: false
            }
        }).then(r => {
            setMarcas(r.data)
        });

        await axios.get("/api/usuario", {
            data: {
                bloqueado: false
            }
        }).then(r => {
            setUsuario(r.data);
        });

        await axios.get("/api/localidade", {
            data: {
                bloqueado: false
            }
        }).then(r => {
            setLocalidades(r.data);
        })
    }

    function salvar() {
        let erro = "";
        if (modelo === '') {
            erro += "Insira o numero de série. ";
        }
        if (serial === '') {
            erro += "Insira o modelo. ";
        }
        if (tipo_ativo === '') {
            erro += "Insira o tipo de ativo. ";
        }
        if (marca === '') {
            erro += "Insira a marca. ";
        }
        if (responsavel === '') {
            erro += "Insira o responsável. ";
        }
        if (localidade === '') {
            erro += "Insira a localidade. ";
        }

        if (erro === "") {
            if (id) {
                historico.push({ message: 'Ativo editado.', createdAt: new Date() });

                axios.put('/api/ativo', {
                    _id: id,
                    modelo,
                    serial,
                    tipo_ativo: tipo_ativo,
                    marca: marca,
                    responsavel: responsavel,
                    localidade: localidade,
                    historico
                }).then(() => {
                    toast.success("Ativo editado com sucesso.");
                    router.push("/ativos");
                });
            } else {
                axios.post('/api/ativo', {
                    modelo,
                    serial,
                    tipo_ativo: tipo_ativo,
                    marca: marca,
                    responsavel: responsavel,
                    localidade: localidade
                }).then(() => {
                    toast.success("Ativo criado com sucesso.");
                    router.push("/ativos");
                });
            }
        } else {
            toast.error(erro)
        }
    }

    return (
        <main className="col d-flex flex-wrap" >
            <h3 className='col-12'>
                {!id ?
                    <>Cadastro de ativo</>
                    :
                    <>Editar ativo</>
                }
            </h3>

            <div className='col-12 col-md-6 p-2'>
                <label className='text-light'>Modelo</label>
                <input value={modelo} type="text" className="form-control" onChange={e => { setModelo(e.target.value) }} />
            </div>
            <div className='col-12 col-md-6 p-2'>
                <label className='text-light'>Número de série</label>
                <input value={serial} type="text" className="form-control" onChange={e => { setSerial(e.target.value) }} />
            </div>

            <div className='col-12 col-md-6 p-2'>
                <label className='text-light'>Tipo de Ativo</label>
                <select value={tipo_ativo} className='form-control' onChange={e => setTipoAtivo(e.target.value)} >
                    <option value=''>Selecione</option>
                    {tipo_ativos.map(item => {
                        return (
                            <option value={item._id} key={item._id}>{item.nome}</option>
                        )
                    })}
                </select>
            </div>
            <div className='col-12 col-md-6 p-2'>
                <label className='text-light'>Marca</label>
                <select value={marca} className='form-control' onChange={e => setMarca(e.target.value)}>
                    <option value=''>Selecione</option>
                    {marcas.map(item => {
                        return (
                            <option value={item._id} key={item._id}>{item.nome}</option>
                        )
                    })}
                </select>
            </div>

            <div className='col-12 col-md-6 p-2'>
                <label className='text-light'>Localidade</label>
                <select value={localidade} className='form-control' onChange={e => setLocalidade(e.target.value)}>
                    <option value=''>Selecione</option>
                    {localidades.map(item => {
                        return (
                            <option value={item._id} key={item._id}>{item.nome}</option>
                        )
                    })}
                </select>
            </div>
            <div className='col-12 col-md-6 p-2'>
                <label className='text-light'>Responsável</label>
                <select value={responsavel} className='form-control' onChange={e => setResponsavel(e.target.value)} >
                    <option value=''>Selecione</option>
                    {usuarios.map(item => {
                        return (
                            <option value={item._id} key={item._id}>{item.nome}</option>
                        )
                    })}
                </select>
            </div>

            <div className='btn-group col-12 mt-3'>
                <button className='btn btn-secondary' onClick={() => { router.push("/ativos") }}>
                    Cancelar
                </button>
                <button className='btn btn-primary' onClick={salvar}>
                    Salvar
                </button>
            </div>

        </main>
    )
}  