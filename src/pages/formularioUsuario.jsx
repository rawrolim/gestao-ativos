import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';

export default function formularioUsuario() {
    const router = useRouter();
    
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');


    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroTelefone, setErroTelefone] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroSenhaRepetida, setErroSenhaRepetida] = useState('');

    function save() {
        let erro = false;

        if (!nome) {
            erro = true;
            setErroNome('is-invalid');
        }

        if (!email) {
            erro = true;
            setErroEmail('is-invalid');
        }

        if (!telefone) {
            erro = true;
            setErroTelefone('is-invalid');
        }

        if (!senha) {
            erro = true;
            setErroSenha('is-invalid');
        }

        if (!senhaRepetida) {
            erro = true;
            setErroSenhaRepetida('is-invalid');
        }

        if (!erro) {
            toast.promise(
            axios.post("/api/usuario", {
                nome: nome,
                senha: senha,
                email: email,
                telefone: telefone
            }),{
                "pending": "Enviando ..."
            })
            .then(async (r)=>{
                const data = r.data;
                toast.success('Usuário salvo com sucesso');
                await axios.post('/api/email',{
                    id: data._id,
                    nome: data.nome,
                    email: data.email
                });
                router.push('login');
            }).catch(e=>{
                toast.error(e.message);
            });

        } else {
            toast.error("Não foi possivel salvar.");
        }
    }

    return (
        <main className="d-flex flex-wrap">
            <h3 className='col-12 text-center p-3'>Formulário de usuário</h3>
            <div className="form-floating col-12 pe-2 ps-2">
                <input id='nome' type='text' value={nome} onChange={e => setNome(e.target.value)} className={nome ? 'form-control is-valid' : 'form-control ' + erroNome} placeholder="Nome" />
                <label htmlFor="nome">Nome</label>
            </div>

            <div className="form-floating pe-2 ps-2 col-12 col-md-6 mt-3">
                <input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} className={email ? 'form-control is-valid' : 'form-control ' + erroEmail} placeholder="E-mail" />
                <label htmlFor="email">E-mail</label>
            </div>
            <div className="form-floating ps-2 pe-2 col-12 col-md-6 mt-3" >
                <Input tag={InputMask} mask="(99) 99999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} id='tel' type='tel' className={telefone ? 'form-control is-valid' : 'form-control ' + erroTelefone} placeholder="Telefone" />
                <label htmlFor="tel">Telefone</label>
            </div>

            <div className="form-floating ps-2 pe-2 mt-3 col-12 col-md-6">
                <input id='password' type='password' value={senha} onChange={e => setSenha(e.target.value)} className={
                    senha !== senhaRepetida ? 'form-control is-invalid' :
                        senha && erroSenha === '' ? 'form-control is-valid' : 'form-control ' + erroSenha} placeholder="Senha" />
                <label htmlFor="password">Senha</label>
            </div>
            <div className="form-floating ps-2 pe-2 mt-3 col-12 col-md-6">
                <input id='password_2' type='password' value={senhaRepetida} onChange={e => setSenhaRepetida(e.target.value)} className={
                    senha !== senhaRepetida ? 'form-control is-invalid' :
                        senhaRepetida && erroSenhaRepetida === '' ? 'form-control is-valid' : 'form-control ' + erroSenhaRepetida} placeholder="Senha Repetida" />
                <label htmlFor="password_2">Repita a Senha</label>
            </div>

            <div className='col-12 mt-3 text-center btn-group'>
                <button className='btn btn-lg btn-secondary col-6 col-xl-3' onClick={()=>{router.push('/login')}}>Cancelar</button>
                <button className='btn btn-lg btn-primary col-6 col-xl-3' onClick={save}>Salvar</button>
            </div>
        </main>
    )
}
