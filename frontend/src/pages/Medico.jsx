// src/pages/Medico.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/medico.css';
import '../styles/animations.css';
import '../styles/Home.css';
import NavBarMedico from '../layouts/NavBarMedico'; 

const Medico = () => {
  const cronograma = [
    { hora: '09:00', paciente: 'Juan Pérez', motivo: 'Control general' },
    { hora: '10:00', paciente: 'Ana López', motivo: 'Consulta de rutina' },
    { hora: '11:00', paciente: 'Carlos Soto', motivo: 'Revisión post-operatoria' },
    { hora: '12:00', paciente: 'María Díaz', motivo: 'Examen preventivo' },
  ];

  return (
    <div className="fondo-animado">
      <NavBarMedico /> 
      <div className="medico-container">
        <h1>Cronograma de Consultas del Día</h1>
        <table className="cronograma-table">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {cronograma.map((item, index) => (
              <tr key={index}>
                <td>{item.hora}</td>
                <td>{item.paciente}</td>
                <td>{item.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medico;
