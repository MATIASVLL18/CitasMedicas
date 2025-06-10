import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "../styles/Home.css"; // Fondo animado

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí lógica de autenticación
    navigate("/home");
  };

  return (
    <div className="home-container"> {/* Fondo animado */}
      <div className="login-container">
        <div className="login-card">
          <img src="/login.jpg" alt="Login" className="login-icon" />
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
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
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Ingresar</button>
          </form>
          <p>
            ¿No tienes cuenta?{" "}
            <span
              onClick={() => navigate("/registro")}
              style={{ cursor: "pointer", color: "#0077b6" }}
            >
              Regístrate
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
