import React, { useState, useRef, useEffect } from "react";

import {
  Form,
  FormField,
  FormGroup,
  Button,
  IconGroup,
  Icon, // Importamos el ícono de Semantic UI
} from "semantic-ui-react"; 
import loadPerfil from './Functions'
import "./Perfil.scss";

export default function Perfil() {
 const otroInputRef = useRef(null);
 const [loading, setLoading] = useState(true);
 
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

   // Cargar datos del perfil al montar el componente
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        setLoading(true);
        const data = await loadPerfil();
        console.log(data)
        
        // Actualizar el estado del formulario con los datos recibidos
        setFormData(prev => ({
          ...prev,
          idDriver: data.idDriver || "",
          name: data.name || "",
          phone: data.phone || "",
          plates: data.plates || "",
          model: data.model || "", 
          typeVehiculoR: data.typeVehiculoR || "",
          otherType: data.otherType || ""
        })); 
        
      } catch (err) {
        setError(err.message);
        console.error("Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    
    cargarPerfil();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

   // Efecto para enfocar el input "Otro" cuando se selecciona
   useEffect(() => {
     if (formData.tipoVehiculoR === "Otro" && otroInputRef.current) {
       otroInputRef.current.focus();
     }
   }, [formData.tipoVehiculoR]);
 
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
     console.log(JSON.stringify(formData));
 
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
     } catch (error) {
       console.error("Error al registrar usuario: " + error);
     }
   };

  const [editando, setEditando] = useState(false);
  const toggleEdicion = () => {
    if (editando) {
      // Aquí podrías guardar los datos si fuera necesario
    }
    setEditando(!editando);
  };

  return (
    <Form className="perfil-form">
      {/* Avatar en la parte superior */}
      <IconGroup size="huge">
        <Icon loading size="big" name="circle notch" className="Status"/>
        <Icon name="user" />
      </IconGroup>
      {/* Campo: ID de Conductor */}
            <FormField>
              <label>ID de Conductor </label>
              <input
                placeholder="Ej: 291753"
                name="idDriver"
                value={formData.idDriver}
                onChange={handleInputChange}
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
