import React, { useState, useEffect } from "react";
import { Form, FormField, Button, Icon, Message } from "semantic-ui-react";
const QrScanner = React.lazy(() => import('@yudiel/react-qr-scanner'));
/* alternativa:
import { QrScanner } from '@yudiel/react-qr-scanner/dist/esm'; */
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
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(device => device.kind === "videoinput");
        
        setDevices(videoDevices);
        
        const rearCamera = videoDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear')
        );
        
        setSelectedDeviceId(rearCamera?.deviceId || videoDevices[0]?.deviceId || "");
        
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        setError("Error al acceder a la cámara. Asegúrate de haber dado los permisos.");
      }
    };

    getVideoDevices();
  }, [showScanner]);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
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
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </FormField>

        {showScanner && (
          <div className="scanner-panel">
            {devices.length > 0 ? (
              <>
                <div className="scanner-frame">
                  <QrScanner
                    onDecode={handleScan}
                    onError={handleError}
                    constraints={{
                      deviceId: selectedDeviceId,
                      facingMode: 'environment'
                    }}
                    containerStyle={{
                      width: '100%',
                      height: '300px',
                      position: 'relative'
                    }}
                  />
                  <div className="scanner-overlay">
                    <div className="scanner-border" />
                    <p>Enfoca el código QR dentro del marco</p>
                  </div>
                </div>

                {devices.length > 1 && (
                  <Button onClick={switchCamera}>
                    <Icon name="sync" />
                    Cambiar cámara
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
            placeholder="Resultado del escaneo"
          />
        </FormField>
        
        <Button 
          color={showScanner ? "red" : "blue"}
          onClick={toggleScanner}
        >
          <Icon name={showScanner ? "close" : "camera"} />
          {showScanner ? "Cerrar escáner" : "Escanear QR"}
        </Button>

        {error && (
          <Message error>
            <Icon name="exclamation circle" />
            {error}
          </Message>
        )}
      </Form>
    </div>
  );
}