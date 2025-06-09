import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbarmedico.css';

const NavBarMedico = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="navbar-medico">
      <div className="navbar-left">
        <Link to="/medico" className="navbar-link">Home</Link>
      </div>
      <div className="navbar-right">-
        <Link to="/boton1" className="navbar-link">Botón 1</Link>
        <Link to="/boton2" className="navbar-link">Botón 2</Link>
        <Link to="/boton3" className="navbar-link">Botón 3</Link>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default NavBarMedico;
