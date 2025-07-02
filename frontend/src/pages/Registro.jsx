import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { registerUserWithRole as registerWithEmailAndRole } from "../backend/authUtils";
import { db } from "../backend/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Verifica si el nombre ya está registrado en la colección usuarios
  const verificarNombreDuplicado = async (nombre) => {
    const ref = collection(db, "usuarios");
    const q = query(ref, where("nombre", "==", nombre));
    const res = await getDocs(q);
    return !res.empty;
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);

    // Detectar rol según el email
    let role = null;
    if (email.endsWith("@gmail.com")) {
      role = "paciente";
    } else if (email.endsWith("@doctor.com")) {
      role = "doctor";
    } else {
      toast.error("El correo debe ser @gmail.com para pacientes o @doctor.com para doctores.");
      return;
    }

    try {
      const nombreDuplicado = await verificarNombreDuplicado(nombre);
      if (nombreDuplicado) {
        toast.warning("Este nombre ya está registrado. Usa otro distinto.");
        return;
      }

      const res = await registerWithEmailAndRole(nombre, email, telefono, password, role);

      if (res.success) {
        toast.success("Registro exitoso ✅");
        setTimeout(() => {
          if (res.role === "doctor") {
            navigate("/medico");
          } else {
            navigate("/home");
          }
        }, 2000);
      } else {
        toast.error(res.message || "Error al registrar la cuenta.");
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      toast.error("Error inesperado. Intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-card">
        <img src="/login.jpg" alt="Registro" className="login-icon" />
        <h2>Registro</h2>
        <form onSubmit={handleRegistro}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">📞</span>
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/")}>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
};

export default Registro;
