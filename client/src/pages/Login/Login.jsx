import React, { useState } from "react";
import LoginForm from "../../components/Auth/Login/LoginForm";
import RegisterForm from "../../components/Auth/Register/RegisterForm";
/* import Logo from "../../components/Logo/Logo";
  */
export default function Auth() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="auth">
   {/*    <div className="container-logos">
        <Logo />
      </div> */}

      <div className="container-form">
        <div>{showLogin ? <LoginForm /> : <RegisterForm />}</div>
      </div>

      <div className="change-form">
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}> Registrate</span>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}> Inicia sesión</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}