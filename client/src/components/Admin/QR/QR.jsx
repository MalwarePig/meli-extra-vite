import React, { useState, useRef, useEffect } from "react";
import { Form, FormField, Button, Icon } from "semantic-ui-react";
import Swal from "sweetalert2";
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
    const response = await fetch(backend_url + "/SetQR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que enviamos JSON
      },
      body: JSON.stringify(formData), // Datos en el cuerpo (más seguro)
    });

    const responseData = await response.json(); // Parseamos la respuesta una sola vez

    if (!response.ok) {
      Swal.fire({
        title: "Error",
        text: "Error al actualizar QR",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "OK",
        text: "QR actualizado correctamente",
        icon: "success",
      });
      setDisabled(false); // Habilita el botón de descarga
    }
  }

  // Función para descargar el código QR como imagen PNG
  const handleDownload = async () => {
    alert("Descargando QR..."); // Mensaje de alerta al iniciar la descarga
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
      Swal.fire({
    title: "Error",
    text: "'Error al descargar la imagen. Intenta nuevamente.",
    icon: "error",
  });
    }
  };

  //Cargar QR al cargar el componente
  async function LoadQR() {
    try {
      const response = await fetch(backend_url + "/GetQR", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Indica que enviamos JSON
        },
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Error al cargar QR" + response.status,
          icon: "error",
        });
      }
      const data = await response.json();
      setFormData({
        ...formData, // Copia el estado anterior
        ["Clave"]: data.qr, // Actualiza solo el campo modificado
      });
    } catch (error) { 
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar el QR. Intenta nuevamente.",
        icon: "error",
      });
    }
  }
  useEffect(() => {
    LoadQR();
  }, []); // Se ejecuta solo una vez al montar el componente

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
      <Button
        type="button"
        onClick={handleDownload}
        disabled={isDisabled}
        className="QR-Button"
      >
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
