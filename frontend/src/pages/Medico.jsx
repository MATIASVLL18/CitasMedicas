// src/pages/Medico.jsx
import React from 'react';
import '../styles/medico.css'; // 

const Medico = () => {
  const cronograma = [
    { hora: '09:00', paciente: 'Juan Pérez', motivo: 'Control general' },
    { hora: '10:00', paciente: 'Ana López', motivo: 'Consulta de rutina' },
    { hora: '11:00', paciente: 'Carlos Soto', motivo: 'Revisión post-operatoria' },
    { hora: '12:00', paciente: 'María Díaz', motivo: 'Examen preventivo' },
  ];

  return (
    <div className="medico-container">
      <h1>Cronograma de Consultas del Día</h1>
      <table className="cronograma-table">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Motivo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cronograma.map((item, index) => (
            <tr key={index}>
              <td>{item.hora}</td>
              <td>{item.paciente}</td>
              <td>{item.motivo}</td>
              <td>
                <button>Marcar como realizada</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medico;
