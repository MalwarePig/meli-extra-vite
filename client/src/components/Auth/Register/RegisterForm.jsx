import React, { useState, useRef, useEffect } from "react"; // Hooks de React
import {
  Form,
  FormField,
  FormGroup,
  Button,
} from "semantic-ui-react"; // Componentes de Semantic UI

import "./Register.scss"; // Estilos personalizados

export default function RegisterForm() {
  // Estado para guardar el tipo de vehículo seleccionado
  const [tipoVehiculo, setTipoVehiculo] = useState("");

  // Referencia al input donde se especifica el tipo de vehículo si se elige "Otro"
  const otroInputRef = useRef(null);

  // Efecto que se ejecuta cada vez que cambia el tipo de vehículo
  useEffect(() => {
    // Si se selecciona "Otro", se enfoca automáticamente el input adicional
    if (tipoVehiculo === "Otro" && otroInputRef.current) {
      otroInputRef.current.focus();
    }
  }, [tipoVehiculo]);

  return (
    <Form className="register-form">
      {/* Campo: ID de Conductor */}
      <FormField>
        <label>ID de Conductor </label>
        <input placeholder="Ej: 291753" />
      </FormField>

      {/* Campo: Nombre y apellido */}
      <FormField>
        <label>Nombre y apellido </label>
        <input placeholder="Nombre" />
      </FormField>

      {/* Campo: Número de teléfono */}
      <FormField>
        <label>Numero de teléfono </label>
        <input placeholder="10 Dígitos" />
      </FormField>

      {/* Campo: Placas del vehículo */}
      <FormField>
        <label>Placas</label>
        <input placeholder="Ej: SJV32Z" />
      </FormField>

      {/* Campo: Modelo del vehículo */}
      <FormField>
        <label>Modelo</label>
        <input placeholder="Ej: Gol 2020" />
      </FormField>

      {/* Grupo de opciones tipo radio para seleccionar tipo de vehículo */}
      <FormGroup grouped>
        <label>Tipo de vehículo:</label>
        <div className="radio-group">
          {/* Opción: Sedan */}
          <FormField
            label="Sedan"
            control="input"
            type="radio"
            name="tipoVehiculo"
            value="Sedan"
            checked={tipoVehiculo === "Sedan"}
            onChange={() => setTipoVehiculo("Sedan")}
          />
          {/* Opción: Camioneta */}
          <FormField
            label="Camioneta"
            control="input"
            type="radio"
            name="tipoVehiculo"
            value="Camioneta"
            checked={tipoVehiculo === "Camioneta"}
            onChange={() => setTipoVehiculo("Camioneta")}
          />
          {/* Opción: Otro */}
          <FormField
            label="Otro"
            control="input"
            type="radio"
            name="tipoVehiculo"
            value="Otro"
            checked={tipoVehiculo === "Otro"}
            onChange={() => setTipoVehiculo("Otro")}
          />
        </div>
      </FormGroup>

      {/* Input de texto adicional que se activa solo si se selecciona "Otro" */}
      <FormField className="Otro-auto">
        <label>Especifica el tipo de vehículo</label>
        <input
          placeholder="Ej: Hatchback"
          disabled={tipoVehiculo !== "Otro"} // Solo se habilita si el valor es "Otro"
          ref={otroInputRef} // Se asigna la referencia para poder hacer focus
        />
      </FormField>

      {/* Botón para enviar el formulario */}
      <Button type="submit">Guardar</Button>
    </Form>
  );
}
