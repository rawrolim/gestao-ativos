import { UserContext } from "@/store/userContext";
import { useRouter } from "next/router";
import { useContext } from 'react'
import styles from '../styles/menu.module.scss'
import Header from "./header";

export default function Menu() {
    const { usuario, menuAberto } = useContext(UserContext);
    const router = useRouter();

    if (usuario !== null && menuAberto) {
        return (
            <>
                <div className="col-12 col-md-3 col-xl-2 d-none d-md-inline ">
                    .
                </div>
                <aside className="d-none d-md-inline  bg-dark text-light col-12 col-md-3 col-xl-2 position-absolute left-0 bottom-0 top-0 shadow" style={{ zIndex: '1' }}>
                    <Header />
                    <ul className={"list-group " + styles.list}>
                        <li className="list-group-item" onClick={() => { router.push('/home') }}>Home</li>
                        <li className="list-group-item" onClick={() => { router.push('/ativos') }}>Ativos</li>
                        <li className="list-group-item" onClick={() => { router.push('/marcas') }}>Marcas</li>
                        <li className="list-group-item" onClick={() => { router.push('/tipo_ativos') }}>Tipo Ativo</li>
                        <li className="list-group-item" onClick={() => { router.push('/localidades') }}>Local</li>
                        <li className="list-group-item" onClick={() => { router.push('/insumos') }}>Insumos</li>
                        {usuario.tipo_acesso !== 'USUARIO' && <li className="list-group-item" onClick={() => { router.push('/usuarios') }}>Usuários</li> }
                    </ul>
                </aside>
            </>
        )
    }
}
