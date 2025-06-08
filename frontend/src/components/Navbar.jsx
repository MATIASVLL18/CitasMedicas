import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#0077cc", color: "white" }}>
      <Link to="/home" style={{ marginRight: "15px", color: "white" }}>Inicio</Link>
      <Link to="/perfil" style={{ marginRight: "15px", color: "white" }}>Perfil</Link>
      <Link to="/reservar" style={{ marginRight: "15px", color: "white" }}>Reservar</Link>
      <Link to="/login" style={{ color: "white" }}>Cerrar sesión</Link>
    </nav>
  );
}

export default Navbar;
