import { useRouter } from 'next/router';
import { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);
    const [intoSystem, setIntoSystem] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        setUsuario(JSON.parse(localStorage.getItem('usuario')));
        setIntoSystem(true);
    },[]);

    function sair(){
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
