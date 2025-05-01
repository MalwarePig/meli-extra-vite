import React, { useState } from "react";
import { Form, FormField, Button } from "semantic-ui-react";
import { backend_url } from "../../../config/env";
import "./Login.scss";

export default function LoginForm({ onLoginSuccess }) {
  //Inicializar valores por defecto
  const [formData, setFormData] = useState({
    idDriver: "",
    password: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extrae 'name' y 'value' del input
    setFormData({
      ...formData, // Copia los valores existentes del estado
      [name]: value, // Actualiza SOLO el campo modificado
    });
  };

  // Maneja el envío del formulario
  /* const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto (recargar página)

    try {
      // Envía los datos al backend (POST a /login)
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que enviamos JSON
        },
        body: JSON.stringify(formData), // Convierte el objeto a JSON
      });

      if (!response.ok) throw new Error("Error en la petición");

      // Extrae el token de la respuesta
      const { token } = await response.json();

      // Guarda el token en localStorage (para usarlo en futuras peticiones)
      localStorage.setItem("jwt", token);
      // Llama a la función para actualizar el estado en App
      onLoginSuccess();
 
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }; */

  async function Validar() {
    // Envía los datos al backend (POST a /login)
    const response = await fetch(backend_url+'/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que enviamos JSON
      },
      body: JSON.stringify(formData), // Datos en el cuerpo (más seguro)
    }); 

    const responseData = await response.json(); // Parseamos la respuesta una sola vez

    if (!response.ok){
      alert(responseData.error) 
    }else{
      // Extrae el token de la respuesta
      const { token } = responseData; 
      // Guarda el token en localStorage (para usarlo en futuras peticiones)
      localStorage.setItem("jwt", token);
      // Llama a la función para actualizar el estado en App
      onLoginSuccess();
    }
    /* console.log(await response.json()); */
  }

  return (
    <Form className="login-form"/*  onSubmit={handleSubmit} */>
      <h2>id-Driver</h2>
      <FormField>
        <input
          placeholder="1702065"
          name="idDriver"
          value={formData.idDriver}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <input
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </FormField> 
      <Button type="button" onClick={Validar}>Iniciar</Button>
    </Form>
  );
}

/* 
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    console.log("User:", formData.user);
    console.log("Password:", formData.password);

    const payload = {
      user: formData.user,
      password: formData.password,
      iat: Math.floor(Date.now() / 1000),
    };

    // ¡OJO! Esto no es seguro para producción.
    const token = jwtEncode(payload, "clave-ficticia");
    console.log("Token generado (inseguro):", token);
  }; */
