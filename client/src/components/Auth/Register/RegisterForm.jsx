import React, { useState, useRef, useEffect } from "react";
import { Form, FormField, FormGroup, Button } from "semantic-ui-react";
import "./Register.scss";

export default function RegisterForm({ onRegiserSuccess }) {
  const otroInputRef = useRef(null);

  // Estado unificado del formulario
  const [formData, setFormData] = useState({
    idDriver: "",
    name: "",
    phone: "",
    plates: "",
    model: "",
    typeVehiculoR: "", // Aquí guardaremos el valor del radio
    otherType: "",
    password: "",
  });

  // Efecto para enfocar el input "Otro" cuando se selecciona
  useEffect(() => {
    if (formData.typeVehiculoR === "Otro" && otroInputRef.current) {
      otroInputRef.current.focus();
    } else if (formData.typeVehiculoR !== "Otro") {
      formData.otherType = "";
    }
  }, [formData.typeVehiculoR]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos al backend (POST a /register)
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que enviamos JSON
        },
        body: JSON.stringify(formData), // Convierte el objeto a JSON
      });

      if (!response.ok) throw new Error("Error en la petición");

      if (response.ok) {
        setFormData({
          idDriver: "",
          name: "",
          phone: "",
          plates: "",
          model: "",
          typeVehiculoR: "", // Aquí guardaremos el valor del radio
          otherType: "",
          password: "",
        });
        onRegiserSuccess();
        alert("Registro exitoso");
      }
    } catch (error) {
      console.error("Error al registrar usuario: " + error);
    }
  };

  return (
    <>
      <Form className="register-form" onSubmit={handleSubmit}>
        <h2>Nuevo driver</h2>
        <hr />
        {/* Campo: ID de Conductor */}
        <FormField>
          <label>ID de Conductor </label>
          <input
            placeholder="Ej: 291753"
            name="idDriver"
            value={formData.idDriver}
            onChange={handleInputChange}
          />
        </FormField>

        {/* Campo: Nombre y apellido */}
        <FormField>
          <label>Nombre y apellido </label>
          <input
            placeholder="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="false"
          />
        </FormField>

        {/* Campo: Número de teléfono */}
        <FormField>
          <label>Numero de teléfono </label>
          <input
            placeholder="10 Dígitos"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </FormField>

        {/* Campo: Placas del vehículo */}
        <FormField>
          <label>Placas</label>
          <input
            placeholder="Ej: SJV32Z"
            name="plates"
            value={formData.plates}
            onChange={handleInputChange}
          />
        </FormField>

        {/* Campo: Modelo del vehículo */}
        <FormField>
          <label>Modelo</label>
          <input
            placeholder="Ej: Gol 2020"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
          />
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
              name="typeVehiculoR"
              value="Sedan"
              checked={formData.typeVehiculoR === "Sedan"}
              onChange={handleInputChange}
            />
            {/* Opción: Camioneta */}
            <FormField
              label="Camioneta"
              control="input"
              type="radio"
              name="typeVehiculoR"
              value="Camioneta"
              checked={formData.typeVehiculoR === "Camioneta"}
              onChange={handleInputChange}
            />
            {/* Opción: Otro */}
            <FormField
              label="Otro"
              control="input"
              type="radio"
              name="typeVehiculoR"
              value="Otro"
              checked={formData.typeVehiculoR === "Otro"}
              onChange={handleInputChange}
            />
          </div>
        </FormGroup>

        {/* Input de texto adicional que se activa solo si se selecciona "Otro" */}
        <FormField className="Otro-auto">
          <label>Especifica el tipo de vehículo</label>
          <input
            name="otherType"
            placeholder="Ej: Hatchback"
            disabled={formData.typeVehiculoR !== "Otro"}
            ref={otroInputRef}
            value={formData.otherType}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormField>

        {/* Botón para enviar el formulario */}
        <Button type="submit">Guardar</Button>
      </Form>
    </>
  );
}
