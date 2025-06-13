import React from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { auth, db } from "../backend/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
//obtiene datos de firebase..


const Perfil = () => {
  const usuario = {
    nombre: "Juan Pérez",
    telefono: "+56 9 1234 5678",
    correo: "juan.perez@example.com",
  };

  return (
    <div className="fondo-animado">
      <NavBarUsuario /> 

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