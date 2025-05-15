import { backend_url } from "../../../config/env";

export default async function Functions() {
  var dataTable = [];
  try {
    const response = await fetch(backend_url+"/loadUsersStatus/", {
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

    Object.values(data).forEach((conductor) => {
      //Data para la tabla
      dataTable.push({
        id: conductor.idDriver,
        name: conductor.name,
        celphone: conductor.phone,
        plates: conductor.plates,
        model: conductor.typeVehiculoR,
        eta: conductor.ETA.length > 2 ? conductor.ETA : '-',
        state: conductor.OnTime.length > 2 ? conductor.OnTime : '-',
      }); 
    }); 
  
    return dataTable; // Esto es lo que retornará la función
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
}
