import { decodeToken } from "../../../utils/functions";
import { backend_url } from "../../../config/env";
import Swal from "sweetalert2";

export default async function setETA(schedule, scanResult) {
  const { user, idUser } = decodeToken(); 
  
  const Driver = {
    user: user,
    idUser: idUser,
    ETA: schedule,
    qr: scanResult,
  };

  console.log(Driver);
  try {
    // Envía los datos al backend (POST a /register)
    const response = await fetch(backend_url + "/setETA", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que enviamos JSON
      },
      body: JSON.stringify(Driver), // Convierte el objeto a JSON
    });
 
    if (response.status === 400) {
      Swal.fire({
        title: "Error",
        text: "QR actual no esta actualizado",
        icon: "error",
      });
    }

    if (response.ok) {
      const data = await response.json();  
      if (data.OnTime === "Late") {
         Swal.fire({
        title: "Error",
        text: "Llegada fuera de tiempo",
        icon: "error",
      });
      } else {
       Swal.fire({
        title: "OK",
        text: "Llegada a tiempo",
        icon: "success", 
      });
      }
    }
  } catch (error) {
    console.error("Error al registrar usuario: " + error);
  }
}
