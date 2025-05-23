import React from "react";
import { useOutletContext } from "react-router-dom"; 
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import Active from "../../components/Admin/Active/Active";
import Control from "../../components/Admin/Control/Control";
import Pruebas from "../../components/Pruebas/Pruebas/";
import QR from "../../components/Admin/QR/QR";
import './Admin.scss'

const Admin = (params) => {
  // Accede a las props pasadas por el Layout
  const { sharedData, updateSharedData } = useOutletContext();

  const handleScan = (data) => {
    if (data) {
      updateSharedData({
        scanResult: data.text,
      });
      setShowScanner(false);
    }
  };

  const handleScheduleChange = (e) => {
    updateSharedData({
      schedule: e.target.value,
    });
  }; 

  switch (sharedData) {
    case "Home":
      return <Dashboard />;
      break;
    case "Activos":
      return <Active />;
      break;
    case "Pruebas":
      return <Pruebas />;
      break;
    case "Control":
      return <Control />;
      break;
    case "QR":
      return <QR />;
      break;
    default:
      return <Dashboard />;
      break;
  }

  /*   return(
      sharedData == 'Activos' ? <Active/> : <Extras/>
    )   */
};

export default Admin;
