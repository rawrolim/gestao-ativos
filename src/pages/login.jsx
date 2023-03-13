import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from '../styles/login.module.scss';
import React, { useState, useContext } from 'react';
import { UserContext } from "@/store/userContext";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarioReenvio, setUsuarioReenvio] = useState(null);
  const [reenvioMsg, setSenhasetReenvioMsg] = useState(false);
  const { setUsuario, setToken, setIntoSystem } = useContext(UserContext);

  function logar() {
    axios.post('/api/login', {
      email,
      senha
    })
      .then(res => {
        const data = res.data;
        if (data.usuario.bloqueado) {
          toast.error(data.usuario.motivo_bloqueio);
          setSenhasetReenvioMsg(true);
          setUsuarioReenvio(data.usuario);

        } else {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          localStorage.setItem("token", data.token);
          setUsuario(data.usuario);
          setToken(data.token);
          setIntoSystem(true);
          setSenhasetReenvioMsg(false);
          setUsuarioReenvio(null);
          router.push('/home');
        }
      })
      .catch(err => {
        toast.error('Error ao entrar.')
      })
  }

  async function reenviarMag() {
    await axios.post('/api/email', {
      id: usuarioReenvio._id,
      nome: usuarioReenvio.nome,
      email: usuarioReenvio.email
    }).then(()=>{
      toast.success("E-mail enviado com sucesso.")
    })
  }

  return (
    <main className={"border col-10 col-md-6 col-xl-3 rounded p-3 ms-auto me-auto shadow " + styles.boxLogin} >
      <h3 className='text-center'>Login</h3>

      <div className="form-floating mt-3">
        <input id='email' onChange={e => { setEmail(e.target.value) }} type='email' className='form-control' placeholder="E-mail" />
        <label htmlFor="email">E-mail</label>
      </div>

      <div className="form-floating mt-3">
        <input id='password' onChange={e => { setSenha(e.target.value) }} type='password' className='form-control' placeholder="E-mail" />
        <label htmlFor="password">Senha</label>
      </div>

      <div>
        {reenvioMsg ?
          <div className='text-end pt-2'>
            <button type="button" className='btn btn-light' onClick={reenviarMag}>Reenviar e-mail de confirmação.</button>
          </div>
          : null}

        <div className='text-end pt-2'>
          <a href=''>Esqueci a senha</a>
        </div>
        <div className=' mt-3 d-grid gap-2'>
          <button className='btn btn-primary' onClick={logar}>Entrar</button>
          <button className='btn btn-secondary' onClick={() => { router.push('formularioUsuario') }}>Cadastrar</button>
        </div>
      </div>
    </main>
  )
}
