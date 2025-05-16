import React, {useState, useEffect } from "react";
import { backend_url } from "../../../config/env";
import "./Dashboard.scss";
import QR from '../QR/QR'
 

export default function Dashboard() {

  const [user, setUser] = useState(
    {
      registered: 0,
      paused: 0,
      operational: 0,
      canceled: 0,
    }
  );

  async function LoadDashBoard() {
    const response = await fetch(backend_url + "/getAllUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Indica que enviamos JSON
      },
    });
    const data = await response.json();
    console.clear();
 
    let drivers = 0
    let paused = 0
    let operational = 0
    let canceled = 0
    Object.entries(data.users).forEach(([key, value]) => {  
     /*  console.log("Clave:", key); // Clave del objeto*/ 
      value.level === "user" ? drivers++ : null; 
      value.status !== true ? paused++ : null; 
      value.OnTime === 'Early' ? operational++ : null; 
      value.OnTime === 'Late' ? canceled++ : null; 
    }) 

    setUser(prev =>({
      ...prev,
      registered: drivers,
      paused: paused,
      operational: operational,
      canceled: canceled,
    }))
  }

  useEffect(() => {
    LoadDashBoard();
  }, []);

  return (
    <div className="dashboard">
      <div className="top-cards">
        <div className="card balance">
          <p>Registrados</p>
          <span className="register">{user.registered}</span>
        </div>
        <div className="card balance">
          <p>Pausados</p>
          <span className="pausa">{user.paused}</span>
        </div>
        <div className="card balance">
          <p>Operativo</p>
          <span className="operativo">{user.operational}</span>
        </div>
        <div className="card balance">
          <p>Cancelado</p>
          <span className="cancel">{user.canceled}</span>
        </div>
      </div>

      <div className="main-charts">
        <div className="card statistics"><QR/></div>
        <div className="card performance">Performance</div>
      </div>

      {/* <div class="bottom-cards">
      <div class="card activity">Activity</div>
      <div class="card yearly-expense">Yearly Expense</div>
    </div> */}
    </div>
  );
}
