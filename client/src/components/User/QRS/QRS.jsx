import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

export default function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeCamera, setActiveCamera] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const scannerRef = useRef(null);
  const qrBoxSize = 250;

  // Configuración del scanner
  const config = {
    fps: 10,
    qrbox: qrBoxSize,
    formatsToSupport: [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
    ],
    rememberLastUsedCamera: true,
    supportedScanTypes: [1, 2] // Both camera and file scan
  };

  // Inicializar el scanner
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', config, false);
    scannerRef.current = scanner;

    // Obtener lista de cámaras disponibles
    Html5Qrcode.getCameras()
      .then(devices => {
        if (devices && devices.length) {
          setAvailableCameras(devices);
          setActiveCamera(devices[0].id);
        }
      })
      .catch(err => {
        setError('No se pudo acceder a las cámaras. Asegúrate de haber dado los permisos.');
        console.error('Error al obtener cámaras:', err);
      });

    // Función de éxito al escanear
    const onScanSuccess = (decodedText, decodedResult) => {
      setScanResult(decodedText);
      scanner.pause();
    };

    // Función de error
    const onScanError = (errorMessage) => {
      setError(errorMessage);
    };

    scanner.render(onScanSuccess, onScanError);

    // Limpieza al desmontar
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error('Error al limpiar scanner:', error);
        });
      }
    };
  }, []);

  // Cambiar de cámara
  const switchCamera = async () => {
    if (availableCameras.length < 2) return;

    try {
      const currentIndex = availableCameras.findIndex(cam => cam.id === activeCamera);
      const nextIndex = (currentIndex + 1) % availableCameras.length;
      const nextCamera = availableCameras[nextIndex];
      
      // Detener cámara actual
      await scannerRef.current.clear();
      
      // Iniciar nueva cámara
      await scannerRef.current.start(
        nextCamera.id,
        { fps: config.fps, qrbox: config.qrbox },
        (decodedText) => setScanResult(decodedText),
        (errorMessage) => setError(errorMessage)
      );
      
      setActiveCamera(nextCamera.id);
      setError(null);
    } catch (err) {
      setError('Error al cambiar de cámara');
      console.error('Error al cambiar cámara:', err);
    }
  };

  // Reiniciar scanner
  const restartScanner = async () => {
    try {
      await scannerRef.current.clear();
      await scannerRef.current.start(
        activeCamera,
        { fps: config.fps, qrbox: config.qrbox },
        (decodedText) => setScanResult(decodedText),
        (errorMessage) => setError(errorMessage)
      );
      setScanResult(null);
      setError(null);
    } catch (err) {
      setError('Error al reiniciar el escáner');
      console.error('Error al reiniciar:', err);
    }
  };

  return (
    <div className="qr-scanner-container">
      <h2>Lector QR</h2>
      
      {/* Contenedor del scanner */}
      <div id="qr-reader" style={{ 
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        position: 'relative'
      }}></div>
      
      {/* Controles */}
      <div className="scanner-controls">
        {availableCameras.length > 1 && (
          <button 
            onClick={switchCamera}
            className="camera-button"
          >
            Cambiar cámara ({activeCamera?.includes('back') ? 'Trasera' : 'Delantera'})
          </button>
        )}
        
        {scanResult && (
          <button 
            onClick={restartScanner}
            className="restart-button"
          >
            Escanear otro código
          </button>
        )}
      </div>
      
      {/* Resultados */}
      {scanResult && (
        <div className="scan-result">
          <h3>Resultado:</h3>
          <p>{scanResult}</p>
        </div>
      )}
      
      {/* Errores */}
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      
      {/* Estilos */}
      <style jsx>{`
        .qr-scanner-container {
          padding: 20px;
          text-align: center;
        }
        .scanner-controls {
          margin: 20px 0;
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        .camera-button, .restart-button {
          padding: 10px 15px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .camera-button:hover, .restart-button:hover {
          background: #0056b3;
        }
        .scan-result {
          margin-top: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
          max-width: 500px;
          margin: 20px auto;
          word-break: break-all;
        }
        .error-message {
          color: #dc3545;
          margin-top: 15px;
        }
      `}</style>
    </div>
  );
}