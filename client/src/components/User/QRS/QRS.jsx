import React, { useState, useEffect, Suspense } from "react";
import { Form, FormField, Button, Icon, Message } from "semantic-ui-react";
const QrScanner = React.lazy(() => import('@yudiel/react-qr-scanner'));
import "./QRS.scss";

export default function QRS() {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Detectar cámaras disponibles
  useEffect(() => {
    if (!showScanner) return;

    const getVideoDevices = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Primero solicitamos permisos
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        // Enumeramos dispositivos
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(device => device.kind === "videoinput");
        
        setDevices(videoDevices);
        
        // Intentamos seleccionar la cámara trasera por defecto
        const rearCamera = videoDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear') ||
          device.label.toLowerCase().includes('environment')
        );
        
        // Si no encontramos trasera, usamos la primera disponible
        setSelectedDeviceId(rearCamera?.deviceId || videoDevices[0]?.deviceId || "");
        
        // Detenemos el stream temporal usado para detectar dispositivos
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Error de cámara:", err);
        setError(`Error al acceder a la cámara: ${err.message || 'Verifica los permisos'}`);
        setShowScanner(false);
      } finally {
        setIsLoading(false);
      }
    };

    getVideoDevices();
  }, [showScanner]);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      setShowScanner(false);
      setError(null);
    }
  };

  const handleError = (err) => {
    console.error("Error del escáner:", err);
    setError(`Error de escaneo: ${err.message || 'Problema con la cámara'}`);
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
    const nextDevice = devices[nextIndex];
    
    setSelectedDeviceId(nextDevice.deviceId);
    
    // Feedback para el usuario sobre qué cámara está activa
    const cameraType = nextDevice.label.toLowerCase().includes('front') ? 
      "delantera" : "trasera";
    setError(`Cámara ${cameraType} activada`);
    setTimeout(() => setError(null), 2000);
  };

  return (
    <div className="qr-mobile-container">
      <Form className="QR-form">
        <h2>Escanear QR</h2>
        
        <FormField>
          <label>Horario de recorrido</label>
          <input
            type="time"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
        </FormField>

        {isLoading && (
          <Message info>
            <Icon name="circle notched" loading />
            Cargando cámara...
          </Message>
        )}

        {showScanner && !isLoading && (
          <div className="scanner-panel">
            <Suspense fallback={<div>Cargando escáner...</div>}>
              {devices.length > 0 ? (
                <>
                  <div className="scanner-frame">
                    <QrScanner
                      key={selectedDeviceId} // Forzar re-render al cambiar cámara
                      onDecode={handleScan}
                      onError={handleError}
                      constraints={{
                        deviceId: selectedDeviceId,
                        facingMode: devices.length === 0 ? 'environment' : undefined
                      }}
                      containerStyle={{
                        width: '100%',
                        height: '300px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      videoStyle={{
                        objectFit: 'cover'
                      }}
                    />
                    <div className="scanner-overlay">
                      <div className="scanner-border" />
                      <p>Enfoca el código QR dentro del marco</p>
                    </div>
                  </div>

                  {devices.length > 1 && (
                    <Button 
                      onClick={switchCamera}
                      basic
                      color="blue"
                      className="camera-switch-btn"
                    >
                      <Icon name="sync" />
                      Cambiar a cámara {devices.length > 1 ? 
                        (devices.find(d => d.deviceId !== selectedDeviceId)?.label.toLowerCase().includes('front') ? 
                        "delantera" : "trasera") : ''}
                    </Button>
                  )}
                </>
              ) : (
                <Message warning>
                  <Icon name="warning" />
                  No se detectaron cámaras disponibles. Asegúrate de haber dado los permisos.
                </Message>
              )}
            </Suspense>
          </div>
        )}

        <FormField> 
          <input 
            value={scanResult} 
            readOnly 
            placeholder="Resultado del escaneo aparecerá aquí"
            className="scan-result-input"
          />
        </FormField>
        
        <Button 
          color={showScanner ? "red" : "blue"}
          onClick={toggleScanner}
          loading={isLoading}
          disabled={isLoading}
        >
          <Icon name={showScanner ? "close" : "camera"} />
          {showScanner ? "Cerrar escáner" : "Abrir escáner QR"}
        </Button>

        {error && (
          <Message error onDismiss={() => setError(null)}>
            <Icon name="exclamation circle" />
            {error}
          </Message>
        )}
      </Form>
    </div>
  );
}