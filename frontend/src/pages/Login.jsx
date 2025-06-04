import '../styles/Login.style.css';
import { Link } from 'react-router-dom';
import React from "react";


export default function Login() {
  return (
    <div className="auth-container">
      <h2 className="auth-title">Iniciar Sesión</h2>
      <form className="auth-form">
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
        <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </div>
  );
}
