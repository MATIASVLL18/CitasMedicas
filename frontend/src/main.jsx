import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Medico from "./pages/Medico";
import Reserva from "./pages/Reserva";
import Perfil from "./pages/Perfil";
import PerfilMedico from "./pages/PerfilMedico";
import FichasMedicas from "./pages/FichasMedicas";
import Historial from "./pages/Historial"; // ✅ Importación añadida

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/medico" element={<Medico />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfilmedico" element={<PerfilMedico />} />
        <Route path="/fichasmedicas" element={<FichasMedicas />} />
        <Route path="/historial" element={<Historial />} /> {/*   */}
      </Routes>
    </Router>
  </React.StrictMode>
);
