import React, { createContext, useContext } from "react";

interface UserData {
    data: any,
    rol: any,
    areas: string[],
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

export const AuthProvider = ({ children }:{ children: React.ReactNode}) => {
    const [token, setToken] = React.useState<string | null>(localStorage.getItem('token'));
    const [data, setData] = React.useState<UserData | null>(() => {
        const dataStored = localStorage.getItem('user');
        return dataStored ? JSON.parse(dataStored) : null
    });

    React.useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }

        if (data) {
            localStorage.setItem('user', JSON.stringify(data));
        } else {
            localStorage.removeItem('user');
        }
    }, [token, data]);

    const logout = () => {
        setToken("");

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