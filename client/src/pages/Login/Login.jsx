import React, { useState } from "react";
import LoginForm from "../../components/Auth/Login/LoginForm";
import RegisterForm from "../../components/Auth/Register/RegisterForm";
import './Login.scss'
/* import Logo from "../../components/Logo/Logo";
  */
export default function Auth({onAuthChange}) {
  const [showLogin, setShowLogin] = useState(true);

  //Detecta cambios si se logra crear un registro
  const onRegisterChange = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
   {/*    <div className="container-logos">
        <Logo />
      </div> */}

      <div className="container-form">
       <img src="./Logo.png" alt="Logo" className="Logo"/>
        <div>{showLogin ? <LoginForm onLoginSuccess={() => onAuthChange(true)}/> : <RegisterForm onRegiserSuccess={()=> onRegisterChange(true)}/>}</div>
      
        <div className="change-form">
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span className="Auth-Span" onClick={() => setShowLogin(!showLogin)}> Registrate</span>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?
              <span className="Auth-Span" onClick={() => setShowLogin(!showLogin)}> Inicia sesión</span>
            </>
          )}
        </p>
      </div>
      </div>

      
    </>
  );
}