import { UserContext } from "@/store/userContext";
import { useContext } from 'react'
import { FaList, FaUserCircle } from 'react-icons/fa';

export default function Header(props) {
    const { usuario, setMenuAberto, menuAberto } = useContext(UserContext);

    if (usuario !== null) {
        return (
            <nav className="bg-dark p-3 d-flex shadow">
                <button className='btn text-white' onClick={()=>{setMenuAberto(!menuAberto)}}>
                    <FaList />
                </button>
                <div className="col align-self-center">
                    Gestão de ativos
                </div>
                {props.showUser?
                    <div className="text-end align-self-center">
                        Olá, {usuario.nome}
                        <FaUserCircle size={30} className="ms-2" />
                    </div>
                :null}
            </nav>
        )
    }
}
