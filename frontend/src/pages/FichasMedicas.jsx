import React, { useEffect, useState } from 'react';
import '../styles/FichasMedicas.css';
import '../styles/animations.css';
import NavBarMedico from '../layouts/NavBarMedico'; 
import { db } from '../backend/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const FichasMedicas = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [abierto, setAbierto] = useState(null); // ID del paciente expandido

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const ref = collection(db, "reservas"); 
        const res = await getDocs(ref);
        const datos = res.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPacientes(datos);
      } catch (error) {
        console.error("Error obteniendo pacientes:", error);
      }
    };
    obtenerPacientes();
  }, []);

  // Filtrado por nombre o RUT
  const pacientesFiltrados = pacientes.filter(p => 
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.rut?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleToggle = (id) => {
    setAbierto(abierto === id ? null : id);
  };

  return (
    <div className="fondo-animado">
      <NavBarMedico />
      <div className="fichasmedicas-container">
        <h1>Fichas Clínicas de Pacientes</h1>
        <input
          className="fichasmedicas-buscador"
          type="text"
          placeholder="Buscar por nombre o RUT"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />

        <div className="fichasmedicas-lista">
          {pacientesFiltrados.length === 0 ? (
            <div className="fichasmedicas-vacio">
              No se encontraron pacientes.
            </div>
          ) : (
            pacientesFiltrados.map((p, idx) => (
              <div
                key={p.id || idx}
                className={`fichasmedicas-acordeon ${abierto === (p.id || idx) ? "abierto" : ""}`}
              >
                <div className="acordeon-cabecera" onClick={() => handleToggle(p.id || idx)}>
                  <span className="acordeon-nombre">{p.nombre}</span>
                  <span className="acordeon-rut">{p.rut}</span>
                  <button
                    className="acordeon-boton"
                    aria-label={abierto === (p.id || idx) ? "Cerrar ficha" : "Ver ficha"}
                  >
                    {abierto === (p.id || idx) ? "▲" : "▼"}
                  </button>
                </div>
                {abierto === (p.id || idx) && (
                  <div className="acordeon-detalle">
                    <div><strong>Correo:</strong> {p.correo}</div>
                    <div><strong>Teléfono:</strong> {p.telefono}</div>
                    <div><strong>Sexo:</strong> {p.sexo}</div>
                    <div><strong>Fonasa:</strong> {p.fonasa}</div>
                    <div><strong>Motivo:</strong> {p.motivo}</div>
                    <div><strong>Antecedentes:</strong> {p.antecedentes || "-"}</div>
                    <div><strong>Alergias:</strong> {p.alergias || "-"}</div>
                    <div><strong>Dirección:</strong> {p.direccion}</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FichasMedicas;
