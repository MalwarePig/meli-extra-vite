import React, { useState, useRef } from "react";
import { Form, FormField, Button, Icon} from "semantic-ui-react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image"; // ✅ Librería que convierte elementos del DOM en imagen PNG

import "./QR.scss";
import { backend_url } from "../../../config/env";

export default function QR() {
  // Estado para almacenar el valor ingresado en el input
  const [formData, setFormData] = useState({
    Clave: "",
  });
  
  //Estado de boton de descarga desactivado
  const [isDisabled, setDisabled] = useState(true);

  // Referencia al contenedor del código QR para capturarlo como imagen
  const qrRef = useRef();

  // Maneja cambios en el input del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Copia el estado anterior
      [name]: value, // Actualiza solo el campo modificado
    });
  };

  //Actualizar valor de qr
  async function Actualizar() {
    const response = await fetch(backend_url + "/SetQR",{
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que enviamos JSON
      },
      body: JSON.stringify(formData), // Datos en el cuerpo (más seguro)
    })
    const responseData = await response.json(); // Parseamos la respuesta una sola vez

    if (!response.ok){
      alert(responseData.error) 
    }else{ 
      alert("QR actualizado");
      setDisabled(false); // Habilita el botón de descarga
    }
  }

  // Función para descargar el código QR como imagen PNG
  const handleDownload = async () => {
    if (!qrRef.current) return; // Asegura que el contenedor esté presente

    try {
      // Captura el contenido del contenedor y lo convierte a imagen PNG
      const dataUrl = await toPng(qrRef.current, {
        cacheBust: true, // Evita usar una imagen en caché
        skipFonts: true, // Evita errores relacionados con fuentes no definidas
      });

      // Crea un enlace temporal y lo dispara para descargar la imagen
      const link = document.createElement("a");
      link.download = `qr_${formData.Clave || "codigo"}.png`; // Nombre del archivo descargado
      link.href = dataUrl;
      link.click(); // Simula el clic para iniciar la descarga
    } catch (err) {
      console.error("Error al generar imagen:", err); // Captura errores
    }
  };

  return (
    <Form className="QR-form">
      <h2>QR</h2>

      {/* Contenedor del código QR, que será capturado como imagen */}
      <FormField className="QR-Field">
        <div ref={qrRef}>
          <QRCode value={formData.Clave || "Texto predeterminado"} size={200} />
        </div>
      </FormField>

      {/* Botón que permite descargar el QR como imagen */}
      <Button type="button" onClick={handleDownload} disabled={isDisabled} className="QR-Button">
       <i class="cloud download icon"></i>
      </Button>

      {/* Campo de entrada para escribir la clave que se convertirá en QR */}
      <FormField>
        <input
          placeholder="Clave del dia..."
          name="Clave"
          value={formData.Clave}
          onChange={handleInputChange}
        />
      </FormField>

      {/* Botón que permite descargar el QR como imagen */}
      <Button type="button" onClick={Actualizar}>
       Aplicar 
      </Button>
    </Form>
  );
}
