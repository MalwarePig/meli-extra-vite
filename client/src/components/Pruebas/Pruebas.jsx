import React from "react";  
import './pruebas.scss'
export default function Pruebas() {
    return (
        <div className="dashboard">
        <div className="top-cards">
          <div className="card balance">
            <p>Registrados</p> 
            <span className="register">502</span>
          </div>
          <div className="card balance">
            <p>Pausados</p> 
            <span className="pausa">22</span>
          </div>
          <div className="card balance">
            <p>Operativo</p> 
            <span className="operativo">140</span>
          </div>
          <div className="card balance">
            <p>Cancelado</p> 
            <span className="cancel">15</span>
          </div> 
        </div>
      
        <div className="main-charts">
          <div className="card statistics">Statistics</div>
          <div className="card performance">Performance</div>
        </div>
      
        {/* <div class="bottom-cards">
          <div class="card activity">Activity</div>
          <div class="card yearly-expense">Yearly Expense</div>
        </div> */}
      </div> 
      );
}
