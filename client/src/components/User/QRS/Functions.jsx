import { decodeToken } from "../../../utils/functions";

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
        const response = await fetch("http://localhost:4000/setETA", {
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