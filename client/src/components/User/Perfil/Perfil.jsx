import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  FormField,
  FormGroup,
  Button,
  IconGroup,
  Icon, // Importamos el ícono de Semantic UI
} from "semantic-ui-react";

import "./Perfil.scss";

export default function Perfil() {
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [editando, setEditando] = useState(false);
  const otroInputRef = useRef(null);

  useEffect(() => {
    if (editando && tipoVehiculo === "Otro" && otroInputRef.current) {
      otroInputRef.current.focus();
    }
  }, [tipoVehiculo, editando]);

  const toggleEdicion = () => {
    if (editando) {
      // Aquí podrías guardar los datos si fuera necesario
    }
    setEditando(!editando);
  };

  return (
    <Form className="register-form">
      {/* Avatar en la parte superior */}
    
      <IconGroup size="huge">
        <Icon loading size="big" name="circle notch" className="Status"/>
        <Icon name="user" />
      </IconGroup>

      <FormField>
        <label>ID de Conductor en Perfil</label>
        <input placeholder="Ej: 291753" disabled={!editando} />
      </FormField>

      <FormField>
        <label>Nombre y apellido</label>
        <input placeholder="Nombre" disabled={!editando} />
      </FormField>

      <FormField>
        <label>Número de teléfono</label>
        <input placeholder="10 Dígitos" disabled={!editando} />
      </FormField>

      <FormField>
        <label>Placas</label>
        <input placeholder="Ej: SJV32Z" disabled={!editando} />
      </FormField>

      <FormField>
        <label>Modelo</label>
        <input placeholder="Ej: Gol 2020" disabled={!editando} />
      </FormField>

      <FormGroup grouped>
        <label>Tipo de vehículo:</label>
        <div className="radio-group">
          <FormField
            label="Sedan"
            control="input"
            type="radio"
            name="tipoVehiculo"
            value="Sedan"
            checked={tipoVehiculo === "Sedan"}
            onChange={() => setTipoVehiculo("Sedan")}
            disabled={!editando}
          />
          <FormField
            label="Camioneta"
            control="input"
            type="radio"
            name="tipoVehiculo"
            value="Camioneta"
            checked={tipoVehiculo === "Camioneta"}
            onChange={() => setTipoVehiculo("Camioneta")}
            disabled={!editando}
          />
          <FormField
            label="Otro"
            control="input"
            type="radio"
            name="tipoVehiculo"
            value="Otro"
            checked={tipoVehiculo === "Otro"}
            onChange={() => setTipoVehiculo("Otro")}
            disabled={!editando}
          />
        </div>
      </FormGroup>

      <FormField className="Otro-auto">
        <label>Especifica el tipo de vehículo</label>
        <input
          placeholder="Ej: Hatchback"
          disabled={!editando || tipoVehiculo !== "Otro"}
          ref={otroInputRef}
        />
      </FormField>

      <Button onClick={toggleEdicion}>{editando ? "Guardar" : "Editar"}</Button>
    </Form>
  );
}

<div>
  <i class="huge icons">
    <i aria-hidden="true" class="red dont big icon"></i>
    <i aria-hidden="true" class="black user icon"></i>
  </i>
  <i class="huge icons">
    <i aria-hidden="true" class="circle notch big loading icon"></i>
    <i aria-hidden="true" class="user icon"></i>
  </i>
</div>;
