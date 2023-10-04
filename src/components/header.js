import { UserContext } from "@/store/userContext";
import { useRouter } from "next/router";
import { useContext } from 'react'
import { FaList, FaUserCircle } from 'react-icons/fa';
import styles from '../styles/menu.module.scss'

export default function Header(props) {
    const { usuario, setMenuAberto, menuAberto, sair, intoSystem } = useContext(UserContext);
    const router = useRouter();

    if (usuario !== null && intoSystem) {
        return (
            <>
                <nav className="bg-dark p-3 d-flex shadow">
                    <button className='btn text-white d-none d-md-inline' onClick={() => { setMenuAberto(!menuAberto) }}>
                        <FaList />
                    </button>
                    <div className="col align-self-center">
                        Gestão de ativos
                    </div>
                    {props.showUser ?
                        <div className="text-end align-self-center dropdown d-none d-md-inline">
                            <button className='btn text-light dropdown-toggle' type="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                                <label className="text-light">Olá, {usuario.nome}</label>
                                <FaUserCircle size={30} className="ms-2" />
                            </button>
                            <ul className="dropdown-menu " aria-labelledby="dropdownUser">
                                <li><a className="dropdown-item" onClick={sair}>Sair</a></li>
                            </ul>
                        </div>
                        : null}
                    <button className='btn text-white d-inline d-md-none' onClick={() => { setMenuAberto(!menuAberto) }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <FaList />
                    </button>
                </nav>
                <div className="collapse" id="collapseExample">
                    <ul className={"list-group rounded-0 " + styles.list} style={{backgroundColor: '#212529'}} >
                        <li className="list-group-item" onClick={() => { router.push('/home') }}>Home</li>
                        <li className="list-group-item" onClick={() => { router.push('/ativos') }}>Ativos</li>
                        <li className="list-group-item" onClick={() => { router.push('/marcas') }}>Marcas</li>
                        <li className="list-group-item" onClick={() => { router.push('/tipo_ativos') }}>Tipo Ativo</li>
                        <li className="list-group-item" onClick={() => { router.push('/localidades') }}>Local</li>
                        <li className="list-group-item" onClick={() => { router.push('/usuarios') }}>Usuários</li>
                        <li className="list-group-item" onClick={sair}>Sair</li>
                    </ul>
                </div>
            </>
        )
    }
}
