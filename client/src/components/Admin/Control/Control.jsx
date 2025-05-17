import React from 'react'

export default function Control() {
  return (
    <div className="dashboard">
          <div className="top-cards">
            <div className="card balance">
              <p>Usuarios</p>
              <span className="register"></span>
            </div>
            <div className="card balance">
              <p>Pausados</p>
              <span className="pausa"></span>
            </div>
            <div className="card balance">
              <p>Operativo</p>
              <span className="operativo"></span>
            </div>
            <div className="card balance">
              <p>Cancelado</p>
              <span className="cancel"></span>
            </div>
          </div>
    
          <div className="main-charts">
            <div className="card statistics">
              <h2>QR</h2>  
            </div>
            <div className="card performance">
              <h2>Fuera de tiempo</h2>
               
            </div>
          </div>
    
          {/* <div class="bottom-cards">
          <div class="card activity">Activity</div>
          <div class="card yearly-expense">Yearly Expense</div>
        </div> */}
        </div>
  )
}
