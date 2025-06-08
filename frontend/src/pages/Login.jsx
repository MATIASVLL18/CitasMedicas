import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí lógica de Firebase u otra validación
    navigate("/home");
  };

  return (
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
          ¿No tienes cuenta? <span onClick={() => navigate("/registro")}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
