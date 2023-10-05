import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from '../styles/login.module.scss';
import React, { useState, useContext } from 'react';
import { UserContext } from "@/store/userContext";
import {auth} from '../config/firebase';
import {signInWithEmailAndPassword} from "firebase/auth";
import md5 from 'md5';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarioReenvio, setUsuarioReenvio] = useState(null);
  const [reenvioMsg, setSenhasetReenvioMsg] = useState(false);
  const { setUsuario, setToken, setIntoSystem } = useContext(UserContext);

  function logar() {
    toast.promise(
    axios.post('/api/login', {
      email,
      senha
    })
      .then(async (res) => {
        const data = res.data;
        const credential = await signInWithEmailAndPassword(auth, email, md5(senha));
        if(!credential.user.emailVerified){
          data.usuario.bloqueado = true;
          data.usuario.motivo_bloqueio = "Verifique o e-mail para entrar no aplicativo.";
        }else{
          data.usuario.bloqueado = false;
        }
        if (data.usuario.bloqueado) {
          toast.error(data.usuario.motivo_bloqueio);
          //setSenhasetReenvioMsg(true);
          //setUsuarioReenvio(data.usuario);
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
        toast.error('Error ao entrar.');
      })
      ,{
        'pending': 'Enviando dados...'
      }
    )
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
    <main className={"border col-12 col-md-6 col-xl-3 rounded p-3 ms-auto me-auto shadow " + styles.boxLogin} >
      <a onClick={()=>{ router.push('/') }} style={{textDecoration: 'underline'}}>
        Voltar
      </a>
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
          <a onClick={()=>{ router.push('/esqueci_senha') }} style={{textDecoration: 'underline'}}>Esqueci a senha</a>
        </div>
        <div className=' mt-3 btn-group col-12'>
          <button className='btn col-6 btn-outline-light border-0 text-dark' onClick={() => { router.push('formularioUsuario') }}>Cadastrar</button>
          <button className='btn col-6 btn-dark' onClick={logar}>Entrar</button>
        </div>
      </div>
    </main>
  )
}
