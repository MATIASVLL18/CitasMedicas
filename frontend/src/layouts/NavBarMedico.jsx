import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbarmedico.css';

const NavBarMedico = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Limpiar sesión
    navigate('/login'); // Redirigir al login
  };

  return (
    <div className="navbar-medico">
      <div className="navbar-links">
        <Link to="/medico" className="navbar-link">Home</Link>
        <Link to="/perfilmedico" className="navbar-link">Perfil</Link>
        <Link to="/fichasmedicas" className="navbar-link">Fichas Médicas</Link>
      </div>
      <div className="navbar-logout">
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default NavBarMedico;
