import { Navigate } from "react-router-dom";
import { useAuth } from "./use-context";
import React, { JSX } from "react";

export function PrivatRoute ({ children, rol }:{ children: JSX.Element, rol: string[] }) {
    const { token, data } = useAuth();
    React.useEffect(() => {
        console.log('Token del usuario: ', token);
        console.log('Datos del usuario: ', data);
    }, [data, token]);
    if (token === "" || !rol.includes(data?.rol?.sigla as string)) {
        return <Navigate to={"/login"} replace />;
    }
    return children;
}