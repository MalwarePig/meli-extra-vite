import React, { useState, useEffect } from "react";
import { backend_url } from "../../../config/env";
import "./Dashboard.scss";
import QR from "../QR/QR";
import List from "../List/List";

export default function Dashboard() {
  const [user, setUser] = useState({
    registered: 0,
    paused: 0,
    operational: 0,
    canceled: 0,
  });

  const [listData, setListData] = useState([]); // Estado para los datos de la lista

  async function LoadDashBoard() {
    const response = await fetch(backend_url + "/getAllUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Indica que enviamos JSON
      },
    });
    const data = await response.json();

    let drivers = 0;
    let paused = 0;
    let operational = 0;
    let canceled = 0;
    Object.entries(data.users).forEach(([key, value]) => {
      /*  console.log("Clave:", key); // Clave del objeto*/
      value.level === "user" ? drivers++ : null;
      value.status !== true ? paused++ : null;
      value.OnTime === "Early" ? operational++ : null;
      value.OnTime === "Late" ? canceled++ : null;
      if (value.OnTime === "Late") {
        setListData((prev) => [
          ...prev,
          {
            name: value.name,
            eta: value.ETA,
            register: value.register,
            phone: value.phone,
          },
        ]);
      }
    });

    setUser((prev) => ({
      ...prev,
      registered: drivers,
      paused: paused,
      operational: operational,
      canceled: canceled,
    }));
  }
  // Cargar los datos al montar el componente
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
        <div className="card statistics">
          <h2>QR</h2>
          <QR />
        </div>
        <div className="card performance">
          <h2>Fuera de tiempo</h2>
          {/* Aquí puedes renderizar algo basado en listData */}
          {listData.length > 0 ? (
            <div className="list-cancel">
              {listData.map((item, index) => (
                console.log(item),
                <List key={index} name={item.name} eta={item.eta} register={item.register} phone={item.phone}/>
              ))}
            </div>
          ) : (
            <p>No hay datos fuera de tiempo</p>
          )}
        </div>
      </div>

      {/* <div class="bottom-cards">
      <div class="card activity">Activity</div>
      <div class="card yearly-expense">Yearly Expense</div>
    </div> */}
    </div>
  );
}
