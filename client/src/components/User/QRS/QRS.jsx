import React, { useState, useRef, useEffect } from "react";
import { Form, FormField, Button, Icon, Message } from "semantic-ui-react";
import { QrReader } from 'react-qr-reader'; // Cambiamos a esta librería más confiable
import setETA from "./Functions";
import "./QRS.scss";

export default function QRS() {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  
  // Detectar cámaras disponibles
  useEffect(() => {
    if (!showScanner) return;

    const getVideoDevices = async () => {
      try {
        // Primero solicitamos permisos
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Luego enumeramos dispositivos
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(device => device.kind === "videoinput");
        
        setDevices(videoDevices);
        
        // Intentar seleccionar cámara trasera por defecto
        const rearCamera = videoDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear')
        );
        
        if (rearCamera) {
          setSelectedDeviceId(rearCamera.deviceId);
        } else if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
        
        // Limpiar stream
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Error al acceder a cámaras:", err);
        setError("No se pudo acceder a la cámara. Asegúrate de haber dado los permisos.");
      }
    };

    getVideoDevices();
  }, [showScanner]);

  const handleScan = (result) => {
    if (result?.text) {
      setScanResult(result.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(`Error de cámara: ${err.message || 'Error desconocido'}`);
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    if (!showScanner) {
      setScanResult("");
      setError(null);
    }
  };

  const switchCamera = () => {
    if (devices.length < 2) return;
    
    const currentIndex = devices.findIndex(d => d.deviceId === selectedDeviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    setSelectedDeviceId(devices[nextIndex].deviceId);
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
            {devices.length > 0 ? (
              <>
                <div className="scanner-frame">
                  <QrReader
                    constraints={{
                      deviceId: selectedDeviceId,
                      facingMode: devices.length < 2 ? 'environment' : undefined
                    }}
                    onResult={handleScan}
                    scanDelay={300}
                    onError={handleError}
                    videoContainerStyle={{
                      width: '100%',
                      height: '300px',
                      position: 'relative'
                    }}
                    videoStyle={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="scanner-overlay">
                    <div className="scanner-border" />
                    <p className="scanner-hint">Enfoca el código QR dentro del marco</p>
                  </div>
                </div>

                {devices.length > 1 && (
                  <Button onClick={switchCamera} className="switch-camera-btn">
                    <Icon name="sync" />
                    Cambiar cámara ({devices.length} disponibles)
                  </Button>
                )}
              </>
            ) : (
              <Message warning>
                <Icon name="warning" />
                No se detectaron cámaras disponibles
              </Message>
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

        {error && (
          <Message error>
            <Icon name="exclamation circle" />
            {error}
            <div style={{marginTop: '10px'}}>
              <p>Consejos:</p>
              <ul>
                <li>Asegúrate de haber dado permisos de cámara</li>
                <li>Prueba con el navegador Chrome</li>
                <li>Verifica que no haya otras apps usando la cámara</li>
              </ul>
            </div>
          </Message>
        )}
      </Form>
    </div>
  );
}