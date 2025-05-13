import { decodeToken } from "../../../utils/functions";
import { backend_url } from "../../../config/env";

export default async function setETA (params) {
  const {user, idUser} = decodeToken()
  console.log(params)
    const Driver = {
      'user': user,
      'idUser': idUser,
      'ETA': params
    }
    
    decodeToken()
 
    console.log(Driver) 
    try {
        // Envía los datos al backend (POST a /register)
        const response = await fetch(backend_url+"/setETA", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indica que enviamos JSON
          },
          body: JSON.stringify(Driver), // Convierte el objeto a JSON
        });
  
        if (!response.ok) throw new Error("Error en la petición");
      } catch (error) {
        console.error("Error al registrar usuario: " + error);
      }
}