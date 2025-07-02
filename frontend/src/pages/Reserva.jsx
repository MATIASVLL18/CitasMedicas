import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Reserva.css";
import "../styles/animations.css";
import NavBarUsuario from "../layouts/NavBarUsuario";
import { db, auth } from "../backend/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const especialidades = [
  { nombre: "Odontología", color: "#4caf50" },
  { nombre: "Medicina General", color: "#2196f3" },
  { nombre: "Pediatría", color: "#ff9800" },
  { nombre: "Ginecología", color: "#e91e63" },
  { nombre: "Traumatología", color: "#9c27b0" },
];

const horasDisponibles = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00"
];

const Reserva = () => {
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [reservasUsuario, setReservasUsuario] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    motivo: "",
    documento: "",
    rut: "",
    sexo: "",
    fonasa: "",
    hora: ""
  });

  const usuarioActual = auth.currentUser;

  useEffect(() => {
    if (usuarioActual) {
      obtenerReservas();
    }
  }, [usuarioActual]);

  const obtenerReservas = async () => {
    const ref = collection(db, "reservas");
    const q = query(ref, where("correo", "==", usuarioActual.email));
    const res = await getDocs(q);
    const datos = res.docs.map(doc => doc.data());
    setReservasUsuario(datos.map(r => ({
      fecha: new Date(r.fecha),
      hora: r.hora
    })));
  };

  const tileClassName = ({ date, view }) => {
    if (
      view === "month" &&
      reservasUsuario.some(d => d.fecha.toDateString() === date.toDateString())
    ) {
      return "dia-reservado";
    }
    return null;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReserva = async (e) => {
    e.preventDefault();
    const campos = Object.values(formData);
    if (campos.some(c => !c)) {
      toast.error("Por favor completa todos los campos.");
      return;
    }

    const existe = reservasUsuario.some(
      d =>
        d.fecha.toDateString() === fechaSeleccionada.toDateString() &&
        d.hora === formData.hora
    );
    if (existe) {
      toast.error("Ya tienes una reserva para este día y hora.");
      return;
    }

    try {
      await addDoc(collection(db, "reservas"), {
        ...formData,
        fecha: fechaSeleccionada.toISOString(),
        especialidad: seleccion.nombre,
        correo: usuarioActual.email,
      });

      toast.success("Reserva realizada con éxito!");
      obtenerReservas();

      // Limpiar formulario
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        motivo: "",
        documento: "",
        rut: "",
        sexo: "",
        fonasa: "",
        hora: ""
      });

    } catch (err) {
      toast.error("Error al guardar la reserva.");
      console.error(err);
    }
  };

  return (
    <div className="fondo-animado">
      <div className="reserva-container">
        <ToastContainer />
        <NavBarUsuario />

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
                  Días en color indican reservas realizadas.
                </p>
              </div>

              <form className="formulario-reserva" onSubmit={handleReserva}>
                <label>Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                />

                <label>Correo electrónico</label>
                <input
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                />

                <label>Teléfono</label>
                <input
                  name="telefono"
                  type="tel"
                  placeholder="Ej: +56 9 1234 5678"
                  value={formData.telefono}
                  onChange={handleChange}
                />

                <label>Dirección</label>
                <input
                  name="direccion"
                  type="text"
                  placeholder="Tu dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                />

                <label>Motivo de la consulta</label>
                <textarea
                  name="motivo"
                  rows="3"
                  placeholder="Describe tu molestia o inquietud"
                  value={formData.motivo}
                  onChange={handleChange}
                />

                <label>Número de Documento</label>
                <input
                  name="documento"
                  type="text"
                  placeholder="Ej: 12345678"
                  value={formData.documento}
                  onChange={handleChange}
                />

                <label>RUT</label>
                <input
                  name="rut"
                  type="text"
                  placeholder="Ej: 12.345.678-9"
                  value={formData.rut}
                  onChange={handleChange}
                />

                <label>Sexo</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>

                <label>Fonasa</label>
                <select name="fonasa" value={formData.fonasa} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="A">Tramo A</option>
                  <option value="B">Tramo B</option>
                  <option value="C">Tramo C</option>
                  <option value="D">Tramo D</option>
                  <option value="Isapre">Isapre</option>
                </select>

                <label>Hora</label>
                <select name="hora" value={formData.hora} onChange={handleChange}>
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map((h, idx) => (
                    <option key={idx} value={h}>
                      {h}
                    </option>
                  ))}
                </select>

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
