import React, { useState } from 'react'; 
import { useOutletContext } from 'react-router-dom';
import Perfil from '../../components/User/Perfil/Perfil'
import QRS from '../../components/User/QRS/QRS'

const Admin = (props) => {
   // Accede a las props pasadas por el Layout
   const { sharedData, updateSharedData } = useOutletContext();
   const {menuActiv} = sharedData;
 
   const [showScanner, setShowScanner] = useState(false);
 
   const handleScan = (data) => {
     if (data) {
       updateSharedData({
         scanResult: data.text
       });
       setShowScanner(false);
     }
   };
 
   const handleScheduleChange = (e) => {
     updateSharedData({
       schedule: e.target.value
     });
   };
 
  return (
    sharedData == 'Perfil' ? <Perfil/> : <QRS/>
  )
};

export default Admin;