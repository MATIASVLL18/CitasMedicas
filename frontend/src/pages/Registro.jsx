import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { registerUserWithRole as registerWithEmailAndRole } from "../backend/authUtils";


const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    const res = await registerWithEmailAndRole(nombre, email, telefono, password);
    if (res.success) {
      if (res.role === "doctor") {
        navigate("/medico");
      } else {
        navigate("/home");
      }
    } else {
      setError(res.message || "Error al registrar.");
    }
  };

  return (
    <div className="login-container">
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
