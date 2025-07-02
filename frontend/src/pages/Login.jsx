import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "../styles/Home.css"; // Fondo animado
import { loginWithEmailAndRole } from "../backend/authUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginWithEmailAndRole(email, password);
    if (res.success) {
      toast.success("Inicio de sesión exitoso");
      setTimeout(() => {
        if (res.role === "doctor") {
          navigate("/medico");
        } else {
          navigate("/home");
        }
      }, 1500);
    } else {
      setError("Correo o contraseña incorrectos");
      toast.error("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          ¿No tienes cuenta?{" "}
          <span onClick={() => navigate("/registro")}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
