import React, { useState, useEffect, useRef } from "react";
import { Form, FormField, Button, Icon } from "semantic-ui-react";
import { Html5Qrcode } from "html5-qrcode";
import setETA from "./Functions";
import "./QRS.scss";

export default function QRS() {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [availableCameras, setAvailableCameras] = useState([]);
  const [activeCameraId, setActiveCameraId] = useState("");
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const scannerRef = useRef(null);

  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    rememberLastUsedCamera: true,
    aspectRatio: 1.0,
  };

  useEffect(() => {
    if (!showScanner) return;

    const initializeScanner = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras.length === 0) throw new Error("No se encontraron cámaras.");

        setAvailableCameras(cameras);

        const rearCamera = cameras.find(cam =>
          cam.label.toLowerCase().includes("back") ||
          cam.label.toLowerCase().includes("rear") ||
          cam.label.toLowerCase().includes("environment")
        );

        const selectedCameraId = rearCamera?.id || cameras[0].id;
        setActiveCameraId(selectedCameraId);

        scannerRef.current = new Html5Qrcode("qr-scanner-container");

        await scannerRef.current.start(
          selectedCameraId,
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
        console.error("Error al inicializar escáner:", err);
      }
    };

    initializeScanner();

    return () => {
      if (scannerRef.current && isScannerRunning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
          setIsScannerRunning(false);
        }).catch(err => {
          console.warn("El escáner no estaba activo al limpiar:", err.message);
        });
      }
    };
  }, [showScanner]);

  const switchCamera = async () => {
    if (availableCameras.length < 2 || !scannerRef.current) return;

    const currentIndex = availableCameras.findIndex(cam => cam.id === activeCameraId);
    const nextIndex = (currentIndex + 1) % availableCameras.length;
    const nextCamera = availableCameras[nextIndex];

    try {
      if (isScannerRunning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        setIsScannerRunning(false);
      }

      setActiveCameraId(nextCamera.id);

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

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    if (!showScanner) setScanResult("");
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
              <div id="qr-scanner-container" style={{ width: "100%", position: "relative" }} />
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

        <Button type="button" onClick={() => setETA(schedule)}>
          Set ETA
        </Button>
      </Form>
    </div>
  );
}
