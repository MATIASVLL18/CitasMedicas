import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const contenido = [
  {
    titulo: "¿Cómo se creó?",
    texto: "Esta página web fue creada utilizando React con Vite y Firebase para la autenticación y almacenamiento de datos, facilitando la gestión de citas médicas de manera rápida y eficiente.",
  },
  {
    titulo: "¿Quiénes somos?",
    texto: "Somos Matías Valenzuela y Ricardo Garcés, estudiantes comprometidos con la innovación en sistemas de reserva digital para optimizar la experiencia médica.",
  },
  {
    titulo: "¿Cuál es el propósito?",
    texto: "Reducir el tiempo de espera presencial y evitar filas, permitiendo a los pacientes reservar desde cualquier lugar y a cualquier hora de forma sencilla y rápida.",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const cambiarContenido = (direccion) => {
    if (direccion === "izquierda") {
      setIndex((prev) => (prev === 0 ? contenido.length - 1 : prev - 1));
    } else {
      setIndex((prev) => (prev === contenido.length - 1 ? 0 : prev + 1));
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Elimina los datos de sesión
    navigate("/login");   // Redirige al login
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/reserva")}>Reserva</li>
          <li onClick={() => navigate("/perfil")}>Perfil</li>
          <li onClick={() => navigate("/login")}>Login</li>
          <li onClick={handleLogout} style={{ color: "red", cursor: "pointer" }}>
            Cerrar sesión
          </li>
        </ul>
      </nav>

      <div className="home-content">
        <img src="/home.png" alt="Icono central" className="home-icon" />

        <div className="arrow-controls">
          <button
            className="arrow-button"
            onClick={() => cambiarContenido("izquierda")}
          >
            ⬅️
          </button>

          <div className="info-section">
            <h2>{contenido[index].titulo}</h2>
            <p>{contenido[index].texto}</p>
          </div>

          <button
            className="arrow-button"
            onClick={() => cambiarContenido("derecha")}
          >
            ➡️
          </button>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/reserva")}>Reserva tu hora</button>
          <button onClick={() => navigate("/perfil")}>Ver perfil</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
