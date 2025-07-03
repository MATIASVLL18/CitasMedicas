import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBarUsuario from "../layouts/NavBarUsuario";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../backend/firebase";
import "../styles/Historial.css";

const Historial = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

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

  return (
    <div className="historial-container">
      <NavBarUsuario />
      <h2>Historial de Reservas</h2>
      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length === 0 ? (
        <p>No tienes reservas registradas.</p>
      ) : (
        <ul className="historial-lista">
          {reservas.map((reserva, index) => (
            <li key={index} className="historial-item">
              <strong>Fecha:</strong> {reserva.fecha} <br />
              <strong>Hora:</strong> {reserva.hora} <br />
              <strong>Especialidad:</strong> {reserva.especialidad} <br />
              <strong>Motivo:</strong> {reserva.motivo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Historial;
