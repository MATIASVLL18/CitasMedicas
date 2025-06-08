import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import Reserva from "../pages/Reserva"; // 👈 Asegúrate de importar el componente
import React from "react";
import Perfil from "../pages/Perfil";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reserva" element={<Reserva />} /> 
        <Route path="/perfil" element={<Perfil />} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;
