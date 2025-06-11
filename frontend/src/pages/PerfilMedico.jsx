import React from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import "../styles/Perfil.css";
import "../styles/animations.css";
import NavBarMedico from "../layouts/NavBarMedico"; 

const Perfil = () => {
  const usuario = {
    nombre: "Juan Pérez",
    telefono: "+56 9 1234 5678",
    correo: "juan.perez@example.com",
  };

  return (
    <div className="fondo-animado">
      <NavBarMedico /> 

      <div className="perfil-container">
        <div className="perfil-card">
          <FaUser className="perfil-icono" />
          <h2>{usuario.nombre}</h2>
          <p><FaPhone className="perfil-dato-icono" /> {usuario.telefono}</p>
          <p><FaEnvelope className="perfil-dato-icono" /> {usuario.correo}</p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;