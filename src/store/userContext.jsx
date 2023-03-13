import { useRouter } from 'next/router';
import { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        setUsuario(JSON.parse(localStorage.getItem('usuario')));
    },[]);

    function sair(){
        localStorage.clear();
        setUsuario(null);
        router.push('/');
    }

    return (
        <UserContext.Provider value={{
            usuario, setUsuario,
            token, setToken,
            menuAberto, setMenuAberto,
            sair
        }}>
            {children}
        </UserContext.Provider>
    );
}
