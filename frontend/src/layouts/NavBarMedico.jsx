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
    <nav className="navbar-medico">
      <div className="navbar-left">
        <Link to="/medico" className="navbar-link">Home</Link>
        <Link to="/perfil" className="navbar-link">Perfil</Link>
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default NavBarMedico;
