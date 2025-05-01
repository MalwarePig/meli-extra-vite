import { jwtDecode } from "jwt-decode";
import TOKEN from "./token";

export function setTokenLocal(params) {
    TOKEN = params
}

export function decodeToken() {
    const token = localStorage.getItem("jwt");
    try {
        const decoded = jwtDecode(token);
        const data = decoded.data;
        return data
    } catch (error) {
        console.error("Token inválido", error);
    } 
}