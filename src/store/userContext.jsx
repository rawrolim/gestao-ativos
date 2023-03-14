import { useRouter } from 'next/router';
import { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);
    const [intoSystem, setIntoSystem] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        let usuarioTemp = JSON.parse(localStorage.getItem('usuario'));
        setUsuario(usuarioTemp);
        
        if (usuarioTemp !== null && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== "/formularioUsuario") {
            setIntoSystem(true);
        } else {
            setIntoSystem(false);
        }
    }, []);

    

    function sair() {
        localStorage.clear();
        setUsuario(null);
        setIntoSystem(false);
        router.push('/');
    }

    return (
        <UserContext.Provider value={{
            usuario, setUsuario,
            token, setToken,
            menuAberto, setMenuAberto,
            intoSystem, setIntoSystem,
            sair
        }}>
            {children}
        </UserContext.Provider>
    );
}
