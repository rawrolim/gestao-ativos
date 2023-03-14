import { UserContext } from "@/store/userContext";
import { useContext } from 'react'
import { FaList, FaUserCircle } from 'react-icons/fa';

export default function Header(props) {
    const { usuario, setMenuAberto, menuAberto, sair, intoSystem } = useContext(UserContext);

    if (usuario !== null && intoSystem) {
        return (
            <nav className="bg-dark p-3 d-flex shadow">
                <button className='btn text-white' onClick={() => { setMenuAberto(!menuAberto) }}>
                    <FaList />
                </button>
                <div className="col align-self-center">
                    Gestão de ativos
                </div>
                {props.showUser ?
                    <div className="text-end align-self-center dropdown dropstart">
                        <button className='btn text-light dropdown-toggle' type="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                            <label className="text-light d-none d-md-inline">Olá, {usuario.nome}</label>
                            <FaUserCircle size={30} className="ms-2" />
                        </button>
                        <ul class="dropdown-menu " aria-labelledby="dropdownUser">
                            <li><a class="dropdown-item" onClick={sair}>Sair</a></li>
                        </ul>
                    </div>
                    : null}
            </nav>
        )
    }
}
