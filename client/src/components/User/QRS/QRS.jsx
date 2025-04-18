import React, { useState, useRef } from 'react';
import { Form, FormField, Button, Icon } from 'semantic-ui-react';
import QrScanner from 'react-qr-scanner';
import './QRS.scss';

export default function QRS() {
  const [scanResult, setScanResult] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [schedule, setSchedule] = useState('');
  const scannerRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    if (!showScanner) {
      setScanResult(''); // Limpiar resultado al abrir el scanner
    }
  };

  return (
    <div className="qr-mobile-container">
      <Form className="QR-form">
        <h2>QR's</h2>
        
        <FormField>
          <label>Horario de recorrido</label>
          <input 
            placeholder='Ej: 4:40' 
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </FormField>

        {showScanner && (
        <div className="scanner-panel">
          <div className="scanner-frame">
            <QrScanner
              ref={scannerRef}
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover'
              }}
            />
            <div className="scanner-overlay">
              <div className="scanner-border" />
              <p className="scanner-hint">Enfoca el código QR dentro del marco</p>
            </div>
          </div>
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
          className={`qr-button ${showScanner ? 'active' : ''}`}
          type='button'
          size='huge'
          color={showScanner ? 'red' : 'blue'}
          onClick={toggleScanner}
        >
          <Icon name={showScanner ? 'close' : 'camera'} />
          {showScanner ? 'Cerrar escáner' : 'Escanear QR'}
        </Button>
      </Form>

      
    </div>
  );
}