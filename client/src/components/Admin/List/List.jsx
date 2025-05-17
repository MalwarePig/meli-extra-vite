import React from "react";
import "./List.scss";
export default function List(props) {
  const {name,eta,register,phone} = props;

  return (
    <div className="div-list">
      <div class="ui list">
        {/* item */}
        <div class="item">
          <div class="content">
            <a class="header" href={`https://wa.me/${phone}`} target="_blank"> {name} <i className="whatsapp icon"></i></a>
            <div class="description">
              Horario ETA{" "} 
                <b className="hora-eta">{eta}</b>
              {" "}
              registrado a las{" "}
              <b className="hora-registro">{register}</b>
            </div>
          </div>
        </div>
        {/* fin item */}
      </div>
    </div>
  );
}
