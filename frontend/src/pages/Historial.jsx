import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBarUsuario from "../layouts/NavBarUsuario";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../backend/firebase";
import "../styles/Historial.css";

const Historial = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarReservas, setMostrarReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas");
  const [orden, setOrden] = useState("desc");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, "reservas"),
            where("correo", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          const datos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setReservas(datos);
        } catch (error) {
          console.error("Error al obtener historial:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtradas = [...reservas];

    if (filtro === "pendientes") {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // eliminar horas para comparar solo la fecha
      filtradas = filtradas.filter(reserva => {
        const [year, month, day] = reserva.fecha.split("-").map(Number);
        const fechaReserva = new Date(year, month - 1, day);
        return fechaReserva > hoy;
      });
    }

    filtradas.sort((a, b) => {
      const fechaA = new Date(a.fecha + " " + a.hora);
      const fechaB = new Date(b.fecha + " " + b.hora);
      return orden === "asc" ? fechaA - fechaB : fechaB - fechaA;
    });

    setMostrarReservas(filtradas);
  }, [reservas, filtro, orden]);

  return (
    <div className="historial-container">
      <NavBarUsuario />
      <div className="historial-content">
        <h2>Historial de Reservas</h2>

        <div className="filtros">
          <button onClick={() => setFiltro("todas")}>Todas las reservas</button>
          <button onClick={() => setFiltro("pendientes")}>Reservas pendientes</button>
          <select onChange={(e) => setOrden(e.target.value)} value={orden}>
            <option value="desc">Recientes primero</option>
            <option value="asc">Antiguas primero</option>
          </select>
        </div>

        {loading ? (
          <p>Cargando reservas...</p>
        ) : mostrarReservas.length === 0 ? (
          <p>No se encontraron reservas.</p>
        ) : (
          <ul className="historial-lista">
            {mostrarReservas.map((reserva, index) => (
              <li key={index} className="historial-item">
                <p><strong>Fecha:</strong> {reserva.fecha}</p>
                <p><strong>Hora:</strong> {reserva.hora}</p>
                <p><strong>Especialidad:</strong> {reserva.especialidad}</p>
                <p><strong>Motivo:</strong> {reserva.motivo}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Historial;
