import React, { useState, useEffect, useRef } from "react";
import { Form, FormField, Button, Icon } from "semantic-ui-react";
import { Html5Qrcode } from "html5-qrcode"; // Librería para escanear códigos QR
import setETA from "./Functions"; // Función externa para establecer la hora estimada de llegada
import "./QRS.scss"; // Estilos del componente

export default function QRS() {
  // Estados para guardar datos relevantes del escáner y del formulario
  const [scanResult, setScanResult] = useState(""); // Resultado del código QR escaneado
  const [showScanner, setShowScanner] = useState(false); // Muestra u oculta el escáner
  const [schedule, setSchedule] = useState(""); // Horario introducido por el usuario
  const [availableCameras, setAvailableCameras] = useState([]); // Lista de cámaras disponibles
  const [activeCameraId, setActiveCameraId] = useState(""); // ID de la cámara actualmente activa
  const [isScannerRunning, setIsScannerRunning] = useState(false); // Estado del escáner
  const scannerRef = useRef(null); // Referencia al objeto Html5Qrcode para acceder fuera del `useEffect`
  const [isDisabled, setIsDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón de escaneo

  // Verificar si el escáner detecto texto y mostrar una alerta con el resultado
  useEffect(() => {
    let isMounted = true;

    if (scanResult !== "") {
      setETA(schedule); // Llamar a la función externa para establecer la hora estimada de llegada
      alert(scanResult);
    } 
    return () => {
      isMounted = false;
    };
  }, [scanResult]);

  useEffect(() =>{
    if (schedule !== "") {
      setIsDisabled(false); // Habilitar el botón si hay un horario introducido
    } else {
      setIsDisabled(true); // Deshabilitar el botón si no hay horario
    }
  },[schedule])
  

  // Configuración del escáner
  const config = {
    fps: 10, // Frames por segundo
    qrbox: { width: 250, height: 250 }, // Área visible de escaneo
    rememberLastUsedCamera: true, // Recuerda la última cámara usada
    aspectRatio: 1.0, // Relación de aspecto del video
  };

  // Efecto que se ejecuta cuando se muestra o se oculta el escáner
  useEffect(() => {
    // Si el escáner no debe mostrarse, no hacer nada
    if (!showScanner) return;

    const initializeScanner = async () => {
      try {
        // Obtener cámaras disponibles
        const cameras = await Html5Qrcode.getCameras();
        if (cameras.length === 0) throw new Error("No se encontraron cámaras.");

        setAvailableCameras(cameras); // Guardar cámaras disponibles

        // Buscar una cámara trasera si es posible
        const rearCamera = cameras.find(
          (cam) =>
            cam.label.toLowerCase().includes("back") ||
            cam.label.toLowerCase().includes("rear") ||
            cam.label.toLowerCase().includes("environment")
        );

        // Elegir la cámara trasera o la primera disponible
        const selectedCameraId = rearCamera?.id || cameras[0].id;
        setActiveCameraId(selectedCameraId); // Guardar cámara activa

        // Crear nueva instancia del escáner
        scannerRef.current = new Html5Qrcode("qr-scanner-container");

        // Iniciar escaneo
        await scannerRef.current.start(
          selectedCameraId,
          config,
          (decodedText) => {
            // Cuando se escanea un código exitosamente
            setScanResult(decodedText); // Guardar resultado
            setShowScanner(false); // Ocultar escáner
            setIsScannerRunning(false); // Marcar como no corriendo
            scannerRef.current.stop().then(() => scannerRef.current.clear()); // Detener escáner
          },
          (errorMessage) => {
            // Si falla el escaneo (se puede ignorar mientras escanea continuamente)
            console.warn("Escaneo fallido:", errorMessage);
          }
        );

        setIsScannerRunning(true); // Escáner está corriendo
      } catch (err) {
        console.error("Error al inicializar escáner:", err);
      }
    };

    initializeScanner();

    // Cleanup: detener el escáner cuando el componente se desmonte o se oculte
    return () => {
      if (scannerRef.current && isScannerRunning) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current.clear(); // Limpia el contenedor del escáner
            setIsScannerRunning(false);
          })
          .catch((err) => {
            console.warn(
              "El escáner no estaba activo al limpiar:",
              err.message
            );
          });
      }
    };
  }, [showScanner]); // Se ejecuta cada vez que `showScanner` cambia

  // Cambiar entre cámaras si hay más de una
  const switchCamera = async () => {
    if (availableCameras.length < 2 || !scannerRef.current) return;

    // Encontrar la siguiente cámara en la lista
    const currentIndex = availableCameras.findIndex(
      (cam) => cam.id === activeCameraId
    );
    const nextIndex = (currentIndex + 1) % availableCameras.length;
    const nextCamera = availableCameras[nextIndex];

    try {
      // Detener el escáner antes de cambiar de cámara
      if (isScannerRunning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        setIsScannerRunning(false);
      }

      setActiveCameraId(nextCamera.id); // Actualizar ID de cámara

      // Re-iniciar escaneo con la nueva cámara
      await scannerRef.current.start(
        nextCamera.id,
        config,
        (decodedText) => {
          setScanResult(decodedText);
          setShowScanner(false);
          setIsScannerRunning(false);
          scannerRef.current.stop().then(() => scannerRef.current.clear());
        },
        (errorMessage) => {
          console.warn("Escaneo fallido:", errorMessage);
        }
      );

      setIsScannerRunning(true);
    } catch (err) {
      console.error("Error al cambiar cámara:", err);
    }
  };

  // Mostrar u ocultar el escáner
  const toggleScanner = () => {
    setShowScanner(!showScanner);
    if (!showScanner) setScanResult(""); // Limpiar resultado anterior si se activa de nuevo
  };

  // Interfaz del componente
  return (
    <div className="qr-mobile-container">
      <Form className="QR-form">
        <h2>QR's</h2>

        {/* Campo para seleccionar horario */}
        <FormField>
          <label>Horario de recorrido</label>
          <input
            type="time"
            placeholder="Ej: 14:40"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </FormField>

        {/* Si el escáner está activo, se muestra el visor */}
        {showScanner && (
          <div className="scanner-panel">
            <div className="scanner-frame">
              <div
                id="qr-scanner-container"
                style={{ width: "100%", position: "relative" }}
              />
              <div className="scanner-overlay">
                <div className="scanner-border" />
                <p className="scanner-hint">
                  Enfoca el código QR dentro del marco
                </p>
              </div>
            </div>

            {/* Botón para cambiar cámara si hay más de una */}
            {availableCameras.length > 1 && (
              <Button onClick={switchCamera} className="switch-camera-btn">
                <Icon name="sync" />
                Cambiar cámara
              </Button>
            )}
          </div>
        )}

        {/* Campo que muestra el resultado del escaneo */}
        <FormField>
          <input
            value={scanResult}
            readOnly
            placeholder="Resultado del escaneo:"
            className="scan-result-input"
          />
        </FormField>

        {/* Botón para activar/desactivar escáner */}
        <Button
          className={`qr-button ${showScanner ? "active" : ""}`}
          type="button"
          size="huge"
          color={showScanner ? "red" : "blue"}
          onClick={toggleScanner}
          disabled={isDisabled} // Deshabilitar el botón si es necesario
        >
          <Icon name={showScanner ? "close" : "camera"} />
          {showScanner ? "Cerrar escáner" : "Escanear QR"}
        </Button>

        {/* Botón para usar el horario introducido */}
        <Button type="button" onClick={() => setETA(schedule)}>
          Set ETA
        </Button>
      </Form>
    </div>
  );
}
