import ErrorComponent from '@/components/errorComponent';
import axios from 'axios';
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

        if (usuarioTemp !== null && router.pathname !== '/' && router.pathname !== '/login' && router.pathname !== "/formularioUsuario") {
            getUser(usuarioTemp._id);
            setIntoSystem(true);
        } else {
            setIntoSystem(false);
        }
    }, [router.pathname]);

    function isAdmin() {
        if (usuario !== null) {
            if (usuario.tipo_acesso === 'ADMINISTRADOR') {
                return true;
            }
        }
        return false;
    }

    function isAnalist() {
        if (usuario !== null) {
            if (usuario.tipo_acesso === 'ANALISTA') {
                return true;
            }
        }
        return false;
    }

    function sair() {
        localStorage.clear();
        setUsuario(null);
        setIntoSystem(false);
        router.push('/');
    }

    async function getUser(_id) {
        await axios.get('/api/usuario', {
            params: {
                _id
            }
        }).then(r => r.data)
            .then(data => {
                setUsuario(data);
            })
    }

    return (
        <UserContext.Provider value={{
            usuario, setUsuario,
            token, setToken,
            menuAberto, setMenuAberto,
            intoSystem, setIntoSystem,
            sair, isAdmin, isAnalist
        }}>
            {(router.pathname == '/' || router.pathname == '/login' || router.pathname == "/formularioUsuario") ?
                <>
                    {children}
                </>
                :
                <>
                    {!intoSystem ? 
                        <ErrorComponent />
                        :
                        <>
                            {children}
                        </>
                    }
                </>
            }
        </UserContext.Provider>
    );
}
