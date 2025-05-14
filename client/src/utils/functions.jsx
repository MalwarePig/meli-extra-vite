import { jwtDecode } from "jwt-decode";
import TOKEN from "./token";

export function setTokenLocal(params) {
    TOKEN = params
}

export function decodeToken() {
    const token = localStorage.getItem("jwt");
    if (!token) {
        console.warn("No se encontró un token en localStorage");
        return null; // Devuelve null si no hay token
    }

    try {
        const decoded = jwtDecode(token); // Decodifica el token
        const data = decoded.data; // Extrae los datos del token
        return data; // Devuelve los datos decodificados
    } catch (error) {
        console.error("Token inválido", error);
        return null; // Devuelve null si el token es inválido
    }
}