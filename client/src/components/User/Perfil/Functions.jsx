import { decodeToken } from "../../../utils/functions";

export default async function loadPerfil() { 
  const idDriver = decodeToken()
    try {
        const response = await fetch("http://localhost:4000/loadUserById/" + idDriver.user, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Verificar si la respuesta es OK
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      // 4. Obtener y retornar los datos
      const data = await response.json(); 
      return data; // Esto es lo que retornará la función

    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    } 
}
