import React, { useState, useEffect, useRef } from "react";
import { Form, FormField, Button, Icon } from "semantic-ui-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import setETA from "./Functions";
import "./QRS.scss";

export default function QRS() {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [availableCameras, setAvailableCameras] = useState([]);
  const [activeCameraId, setActiveCameraId] = useState("");
  const scannerRef = useRef(null);

  // Configuración del scanner
  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    rememberLastUsedCamera: true,
    supportedScanTypes: [1] // Solo escaneo por cámara
  };

  // Inicializar y limpiar el scanner
  useEffect(() => {
    if (!showScanner) return;

    const initializeScanner = async () => {
      try {
        // Obtener cámaras disponibles
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0) {
          setAvailableCameras(cameras);
          
          // Buscar cámara trasera por defecto
          const rearCamera = cameras.find(cam => 
            cam.label.toLowerCase().includes('back') || 
            cam.label.toLowerCase().includes('rear') ||
            cam.label.toLowerCase().includes('environment')
          );
          
          const defaultCameraId = rearCamera?.id || cameras[0].id;
          setActiveCameraId(defaultCameraId);

          // Inicializar scanner
          scannerRef.current = new Html5QrcodeScanner("qr-scanner-container", {
            ...config,
            videoConstraints: { deviceId: defaultCameraId }
          }, false);

          scannerRef.current.render(
            (decodedText) => {
              setScanResult(decodedText);
              setShowScanner(false);
            },
            (error) => console.error("Error al escanear:", error)
          );
        }
      } catch (err) {
        console.error("Error al inicializar scanner:", err);
      }
    };

    initializeScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Error al limpiar scanner:", error);
        });
      }
    };
  }, [showScanner]);

  // Cambiar de cámara
  const switchCamera = async () => {
    if (availableCameras.length < 2) return;

    try {
      const currentIndex = availableCameras.findIndex(cam => cam.id === activeCameraId);
      const nextIndex = (currentIndex + 1) % availableCameras.length;
      const nextCamera = availableCameras[nextIndex];

      await scannerRef.current.clear();
      
      scannerRef.current = new Html5QrcodeScanner("qr-scanner-container", {
        ...config,
        videoConstraints: { deviceId: nextCamera.id }
      }, false);

      scannerRef.current.render(
        (decodedText) => {
          setScanResult(decodedText);
          setShowScanner(false);
        },
        (error) => console.error("Error al escanear:", error)
      );

      setActiveCameraId(nextCamera.id);
    } catch (err) {
      console.error("Error al cambiar cámara:", err);
    }
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    if (!showScanner) {
      setScanResult("");
    }
  };

  return (
    <div className="qr-mobile-container">
      <Form className="QR-form">
        <h2>QR's</h2>
        <FormField>
          <label>Horario de recorrido</label>
          <input
            type="time"
            placeholder="Ej: 14:40"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </FormField>
        
        {showScanner && (
          <div className="scanner-panel">
            <div className="scanner-frame">
              <div id="qr-scanner-container" style={{ width: "100%", position: "relative" }}>
                {/* Scanner se renderiza aquí */}
              </div>
              <div className="scanner-overlay">
                <div className="scanner-border" />
                <p className="scanner-hint">
                  Enfoca el código QR dentro del marco
                </p>
              </div>
            </div>
            
            {availableCameras.length > 1 && (
              <Button onClick={switchCamera} className="switch-camera-btn">
                <Icon name="sync" />
                Cambiar cámara
              </Button>
            )}
          </div>
        )}
        
        <FormField>
          <input
            value={scanResult}
            readOnly
            placeholder="Resultado del escaneo:"
            className="scan-result-input"
          />
        </FormField>
        
        <Button
          className={`qr-button ${showScanner ? "active" : ""}`}
          type="button"
          size="huge"
          color={showScanner ? "red" : "blue"}
          onClick={toggleScanner}
        >
          <Icon name={showScanner ? "close" : "camera"} />
          {showScanner ? "Cerrar escáner" : "Escanear QR"}
        </Button>
        
        <Button type="" onClick={() => setETA(schedule)}>
          Set ETA
        </Button>
      </Form>
    </div>
  );
}