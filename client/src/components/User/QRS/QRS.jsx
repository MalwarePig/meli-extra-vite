import React, { useState, useEffect } from 'react';
import { Form, FormField, Button, Icon, Message, Segment } from 'semantic-ui-react';
import { QrReader } from 'react-qr-reader';
import './QRS.scss';

const QRS = () => {
  const [scanResult, setScanResult] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [error, setError] = useState(null);
  const [hasCameraSupport, setHasCameraSupport] = useState(true);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  // Detectar dispositivos de cámara disponibles
  useEffect(() => {
    const getCameras = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(device => device.kind === 'videoinput');
        
        setDevices(videoDevices);
        if (videoDevices.length > 1) {
          // Intentar seleccionar la cámara trasera por defecto
          const rearCamera = videoDevices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('rear')
          );
          setSelectedDevice(rearCamera?.deviceId || videoDevices[0].deviceId);
        }
        
        // Detener el stream temporal
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Error al acceder a cámaras:", err);
        setHasCameraSupport(false);
        setError("No se pudo acceder a la cámara. Asegúrate de haber dado los permisos.");
      }
    };

    if (showScanner) {
      getCameras();
    }
  }, [showScanner]);

  const handleScan = (result) => {
    if (result?.text) {
      setScanResult(result.text);
      setShowScanner(false);
      setError(null);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(`Error de cámara: ${err.message || 'Error desconocido'}`);
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    if (!showScanner) {
      setScanResult('');
      setError(null);
    }
  };

  const switchCamera = () => {
    if (devices.length < 2) return;
    
    const currentIndex = devices.findIndex(d => d.deviceId === selectedDevice);
    const nextIndex = (currentIndex + 1) % devices.length;
    setSelectedDevice(devices[nextIndex].deviceId);
  };

  return (
    <div className="qr-mobile-container">
      <Segment raised className="qr-segment">
        <Form className="QR-form">
          <h2 className="qr-title">Lector QR Móvil</h2>

          {showScanner ? (
            <div className="scanner-panel">
              {hasCameraSupport ? (
                <>
                  <div className="scanner-frame">
                    <QrReader
                      constraints={{
                        deviceId: selectedDevice,
                        facingMode: devices.length < 2 ? facingMode : undefined,
                      }}
                      onResult={handleScan}
                      scanDelay={500}
                      onError={handleError}
                      videoContainerStyle={{
                        width: '100%',
                        height: '300px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      videoStyle={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div className="scanner-overlay">
                      <div className="scanner-border" />
                      <p className="scanner-hint">Enfoca el código QR</p>
                    </div>
                  </div>

                  {devices.length > 1 && (
                    <Button 
                      basic 
                      color="blue" 
                      onClick={switchCamera}
                      className="switch-camera-btn"
                    >
                      <Icon name='sync' /> Cambiar cámara
                    </Button>
                  )}
                </>
              ) : (
                <Message warning>
                  <Icon name='warning' />
                  Cámara no disponible. Prueba con otro navegador o dispositivo.
                </Message>
              )}
            </div>
          ) : (
            <div className="result-panel">
              <FormField>
                <label>Contenido del QR:</label>
                <div className="qr-result">
                  {scanResult || <span className="placeholder">Escanea un código para ver el contenido</span>}
                </div>
              </FormField>
            </div>
          )}

          <Button 
            primary
            fluid
            size='large'
            onClick={toggleScanner}
            className="scan-button"
          >
            <Icon name={showScanner ? 'close' : 'qrcode'} />
            {showScanner ? 'Cerrar escáner' : 'Escanear QR'}
          </Button>

          {error && (
            <Message error className="error-message">
              <Icon name='exclamation circle' />
              {error}
              <div className="error-tips">
                <p>Consejos para solucionarlo:</p>
                <ul>
                  <li>Asegúrate de haber dado permisos de cámara</li>
                  <li>Prueba con el navegador Chrome</li>
                  <li>Verifica que la cámara no esté siendo usada por otra aplicación</li>
                </ul>
              </div>
            </Message>
          )}
        </Form>
      </Segment>
    </div>
  );
};

export default QRS;