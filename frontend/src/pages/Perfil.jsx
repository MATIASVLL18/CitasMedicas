// src/pages/Perfil.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const Perfil = () => {
  const navigate = useNavigate();

  // Datos simulados del usuario
  const usuario = {
    nombre: "Juan Pérez",
    telefono: "+56 9 1234 5678",
    correo: "juan.perez@example.com",
  };

  return (
    <div className="perfil-container">
      <nav className="navbar">
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/reserva")}>Reserva</li>
          <li onClick={() => navigate("/perfil")}>Perfil</li>
          <li onClick={() => navigate("/login")}>Login</li>
        </ul>
      </nav>

      <div className="perfil-card">
        <FaUser className="perfil-icono" />
        <h2>{usuario.nombre}</h2>
        <p><FaPhone className="perfil-dato-icono" /> {usuario.telefono}</p>
        <p><FaEnvelope className="perfil-dato-icono" /> {usuario.correo}</p>
      </div>
    </div>
  );
};

export default Perfil;
