import { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        setUsuario(JSON.parse(localStorage.getItem('usuario')));
    },[])

    return (
        <UserContext.Provider value={{
            usuario, setUsuario,
            token, setToken,
            menuAberto, setMenuAberto
        }}>
            {children}
        </UserContext.Provider>
    );
}
