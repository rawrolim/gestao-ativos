import axios from "axios";
import { useRouter } from "next/router"
import React, { useState, useContext, useEffect } from 'react';
import { toast } from "react-toastify";
import styles from '../styles/login.module.scss';

export default function Login() {
    const router = useRouter();
    const { _id } = router.query
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha_repetida, setSenhaRepetida] = useState('');
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        getUsuario(_id);
    }, [_id]);

    async function enviar() {
        const res = await axios.get('/api/usuario', {
            params: {
                email: email
            }
        });
        const data = res.data;
        if (data.length > 0) {
            const _id = data[0]._id;
            if (_id) {
                toast.promise(
                    axios.post('/api/esqueci_senha', {
                        _id,
                        email
                    }).then(() => {
                        toast.success("Foi enviado um link para seu e-mail.");
                    })
                    ,
                    {
                        'pending': "Enviando ..."
                    }
                )

            } else {
                toast.error('Usuário não encontrado.')
            }
        } else {
            toast.error('Usuário não encontrado.')
        }
    }

    function alterarSenha() {
        let erro = '';

        if (senha === '') {
            erro += 'Insira a senha. ';
        }
        if (senha_repetida === '') {
            erro += 'Insira a senha repetida. ';
        }
        if (senha !== senha_repetida) {
            erro += 'As duas senha devem ser iguais.';
        }

        if (erro === "") {
            toast.promise(
            axios.put('/api/usuario', {
                _id,
                senha
            }).then(()=>{
                toast.success('Senha atualizado com sucesso.');
                router.push("/login")
            })
            ,
            {
                'pending': 'Enviando ...'
            }
            )
        } else {
            toast.error(erro);
        }
    }

    async function getUsuario(_id) {
        await axios.get('/api/usuario', {
            params: {
                _id
            }
        }).then(res => res.data)
            .then(data => {
                setUsuario(data)
            });
    }

    return (

        <main className={"border col-12 col-md-6 col-xl-3 rounded p-3 ms-auto me-auto shadow " + styles.boxLogin} >
            <h3 className='text-center'>Esqueci a senha</h3>

            {_id ?
                <>
                    <div>
                        Olá, {usuario.nome}
                    </div>
                    <div className="form-floating mt-3">
                        <input id='senha' value={senha} onChange={e => { setSenha(e.target.value) }} type='password' className='form-control' placeholder="Senha" />
                        <label htmlFor="senha">Senha</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input id='senha_repetida' value={senha_repetida} onChange={e => { setSenhaRepetida(e.target.value) }} type='password' className='form-control' placeholder="Senha repetida" />
                        <label htmlFor="senha">Senha repetida</label>
                    </div>
                    <div className='mt-3 d-grid gap-2'>
                        <button className='btn btn-primary' onClick={alterarSenha}>Alterar senha</button>
                        <button className='btn btn-secondary' onClick={() => { router.push('login') }}>Cancelar</button>
                    </div>
                </>
                :
                <>
                    <div className="form-floating mt-3">
                        <input id='email' value={email} onChange={e => { setEmail(e.target.value) }} type='email' className='form-control' placeholder="E-mail" />
                        <label htmlFor="email">E-mail</label>
                    </div>
                    <div className=' mt-3 d-grid gap-2'>
                        <button className='btn btn-primary' onClick={enviar}>Enviar</button>
                        <button className='btn btn-secondary' onClick={() => { router.push('login') }}>Cancelar</button>
                    </div>
                </>
            }
        </main>

    )
}
