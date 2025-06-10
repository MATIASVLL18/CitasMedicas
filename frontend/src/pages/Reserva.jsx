import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../styles/Reserva.css";
import "../styles/animations.css";  

const especialidades = [
  { nombre: "Odontología", color: "#4caf50" },
  { nombre: "Medicina General", color: "#2196f3" },
  { nombre: "Pediatría", color: "#ff9800" },
  { nombre: "Ginecología", color: "#e91e63" },
  { nombre: "Traumatología", color: "#9c27b0" },
];

const diasOcupados = [
  new Date(2025, 5, 9),  // 9 de junio
  new Date(2025, 5, 12), // 12 de junio
  new Date(2025, 5, 15), // 15 de junio
];

const Reserva = () => {
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  const tileClassName = ({ date, view }) => {
    if (view === "month" && diasOcupados.some(d => d.toDateString() === date.toDateString())) {
      return "dia-ocupado";
    }
    return null;
  };

  return (
    <div className="fondo-animado">  {/* Clase del fondo animado */}
      <div className="reserva-container">
        <nav className="navbar">
          <ul>
            <li onClick={() => navigate("/home")}>Home</li>
            <li onClick={() => navigate("/reserva")}>Reserva</li>
            <li onClick={() => navigate("/perfil")}>Perfil</li>
            <li onClick={() => navigate("/login")}>Login</li>
          </ul>
        </nav>

        <div className="reserva-content">
          <h1 className="reserva-titulo">¿Qué doctor necesitas?</h1>

          <div className="botones-especialidades">
            {especialidades.map((esp, index) => (
              <button
                key={index}
                className="boton-especialidad"
                style={{ backgroundColor: esp.color }}
                onClick={() => setSeleccion(esp)}
              >
                {esp.nombre}
              </button>
            ))}
          </div>

          {seleccion && (
            <div className="formulario-contenedor">
              <h2 className="formulario-titulo">{seleccion.nombre}</h2>

              <div className="calendario-simulacion">
                <h4>Calendario de disponibilidad</h4>
                <Calendar
                  onChange={setFechaSeleccionada}
                  value={fechaSeleccionada}
                  tileClassName={tileClassName}
                />
                <p style={{ marginTop: "0.5rem", color: "#888" }}>
                  Días en rojo están ocupados.
                </p>
              </div>

              <form className="formulario-reserva">
                <label>Nombre</label>
                <input type="text" placeholder="Tu nombre completo" />

                <label>Correo electrónico</label>
                <input type="email" placeholder="correo@ejemplo.com" />

                <label>Teléfono</label>
                <input type="tel" placeholder="Ej: +56 9 1234 5678" />

                <label>Dirección</label>
                <input type="text" placeholder="Tu dirección" />

                <label>Motivo de la consulta</label>
                <textarea rows="3" placeholder="Describe tu molestia o inquietud" />

                <button type="submit">Reservar cita</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reserva;
