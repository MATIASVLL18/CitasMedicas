import React, { useEffect, useState } from 'react';
import '../styles/medico.css';
import '../styles/animations.css';
import NavBarMedico from '../layouts/NavBarMedico'; 
import { db } from '../backend/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

function formatearFecha(fechaStr) {
  // Convierte el string a Date, admite tanto string como Date
  if (fechaStr instanceof Date) return fechaStr;
  return new Date(fechaStr);
}

const Medico = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarProximos, setMostrarProximos] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerReservas = async () => {
      setLoading(true);
      try {
        const ref = collection(db, "reservas");
        const res = await getDocs(ref);
        // Estructura: { hora, nombre, motivo, fecha (ISO string o timestamp) }
        const datos = res.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReservas(datos);
      } catch (error) {
        console.error("Error obteniendo reservas:", error);
      }
      setLoading(false);
    };
    obtenerReservas();
  }, []);

  // Filtrar las reservas del día actual o los próximos días
  const today = new Date();
  today.setHours(0,0,0,0);

  let reservasFiltradas = reservas.filter(r => r.fecha);
  if (!mostrarProximos) {
    // Solo las del día actual
    reservasFiltradas = reservasFiltradas.filter(r => {
      const fecha = formatearFecha(r.fecha);
      return fecha.toDateString() === today.toDateString();
    });
  } else {
    // Los próximos 7 días (incluye hoy)
    const ultimoDia = new Date(today);
    ultimoDia.setDate(today.getDate() + 7);
    reservasFiltradas = reservasFiltradas.filter(r => {
      const fecha = formatearFecha(r.fecha);
      return fecha >= today && fecha <= ultimoDia;
    });
  }

  // Ordena por fecha y hora
  reservasFiltradas.sort((a, b) => {
    const fechaA = formatearFecha(a.fecha);
    const fechaB = formatearFecha(b.fecha);
    if (fechaA.getTime() !== fechaB.getTime()) {
      return fechaA - fechaB;
    }
    // Por hora (asume formato "HH:mm")
    return (a.hora || "").localeCompare(b.hora || "");
  });

  return (
    <div className="fondo-animado">
      <NavBarMedico />
      <div className="medico-container">
        <h1>
          {mostrarProximos
            ? 'Próximas reservas (7 días)'
            : 'Cronograma de Consultas del Día'}
        </h1>
        <button
          className="cronograma-switch-btn"
          onClick={() => setMostrarProximos(!mostrarProximos)}
          style={{
            marginBottom: 18,
            borderRadius: 7,
            padding: "8px 20px",
            border: "none",
            background: "#2e86de",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
            fontSize: "1em"
          }}
        >
          {mostrarProximos ? "Ver solo HOY" : "Ver Próximos Días"}
        </button>

        {loading ? (
          <div style={{textAlign: "center", marginTop: 40, fontSize: "1.2em"}}>Cargando reservas...</div>
        ) : (
          <table className="cronograma-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{textAlign: "center", fontSize: "1em", color: "#888"}}>
                    No hay reservas {mostrarProximos ? "en los próximos días" : "para hoy"}.
                  </td>
                </tr>
              ) : (
                reservasFiltradas.map((item, index) => {
                  const fecha = formatearFecha(item.fecha);
                  return (
                    <tr key={item.id || index}>
                      <td>{fecha.toLocaleDateString()}</td>
                      <td>{item.hora}</td>
                      <td>{item.nombre || item.paciente}</td>
                      <td>{item.motivo}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Medico;
