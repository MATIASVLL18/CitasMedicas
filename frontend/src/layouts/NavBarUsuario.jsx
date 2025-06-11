import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbarmedico.css';

const NavBarUsuario = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Limpiar sesión
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="navbar-medico">
      <div className="navbar-links">
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to="/Reserva" className="navbar-link">Reserva</Link>
        <Link to="/perfil" className="navbar-link">Perfil</Link>
      </div>
      <div className="navbar-logout">
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default NavBarUsuario;
