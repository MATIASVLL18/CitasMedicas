import '../styles/Registro.style.css';
import { Link } from 'react-router-dom';
import React from "react";


export default function Registro() {
  return (
    <div className="auth-container">
      <h2 className="auth-title">Registro de Paciente</h2>
      <form className="auth-form">
        <input type="text" placeholder="Nombre" required />
        <input type="text" placeholder="Apellido" required />
        <input type="number" placeholder="Edad" required />
        <input type="email" placeholder="Correo electrónico" required />
        <input type="tel" placeholder="Número de teléfono" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </div>
  );
}
