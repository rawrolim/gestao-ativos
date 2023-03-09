import { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);

    return (
        <UserContext.Provider value={{
            usuario, setUsuario,
            token, setToken
        }}>
            {children}
        </UserContext.Provider>
    );
}
