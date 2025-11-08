import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface Area {
    nombre: string,
    sigla:  string,
}

export interface Rol {
    nombre: string,
    sigla: string,
}

export interface UserData {
    data: any,
    rol: Rol,
    areas: Area[],
    menu: any,
};

interface AuthContextType {
    token: string | null,
    data: UserData | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>,
    setData: React.Dispatch<React.SetStateAction<UserData | null>>,
    logout: () => void,
};

export const AuthContext = createContext<AuthContextType | null>(null);

const MAX_TIME_LOGIN = 60;

export const AuthProvider = ({ children }:{ children: React.ReactNode}) => {
    const [token, setToken] = React.useState<string | null>(localStorage.getItem('token'));
    const [data, setData] = React.useState<UserData | null>(() => {
        const dataStored = localStorage.getItem('user');
        return dataStored ? JSON.parse(dataStored) : null
    });
    const navigate = useNavigate();

    React.useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            const expireAt = Date.now() + MAX_TIME_LOGIN * 60  * 1000;
            localStorage.setItem('expireAt', expireAt.toString());
        } else {
            localStorage.removeItem('token');
        }

        if (data) {
            localStorage.setItem('user', JSON.stringify(data));
        } else {
            localStorage.removeItem('user');
        }
    }, [token, data]);

    React.useEffect(() => {
        const expireAt = localStorage.getItem('expireAt');
        if (expireAt && Date.now() > Number(expireAt)) {
            logout();
        }
    }, []);

    React.useEffect(() => {
        const expireAt = localStorage.getItem('expireAt');
        if (!expireAt) return;

        const remaing = Number(expireAt) - Date.now();
        if (remaing <= 0) {
            logout();
            return;
        }

        const timeOut = setTimeout(() => {
            logout();
        }, remaing);

        return () => clearTimeout(timeOut);
    }, [token]);

    const logout = () => {
        setToken("");
        setData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        localStorage.removeItem('expireAt');
        
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, data, setToken, setData, logout }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error al obtener el autentificador.");
    }
    return context;
};