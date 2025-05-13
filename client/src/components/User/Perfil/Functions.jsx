import { decodeToken } from "../../../utils/functions";
import { backend_url } from "../../../config/env";

export default async function loadPerfil() { 
  const idDriver = decodeToken()
    try {
        const response = await fetch(backend_url+"/loadUserById/" + idDriver.user, {
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
