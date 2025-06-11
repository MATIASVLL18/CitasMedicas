import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import Reserva from "../pages/Reserva";
import Perfil from "../pages/Perfil";
import Medico from "../pages/Medico";
import PerfilMedico from "../pages/PerfilMedico"
import ProtectedRoute from "../routes/ProtectedRoute";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas para PACIENTE */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["paciente"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reserva"
          element={
            <ProtectedRoute allowedRoles={["paciente"]}>
              <Reserva />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para ambos */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute allowedRoles={["paciente", "doctor"]}>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para MÉDICO */}
        <Route
          path="/medico"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <Medico />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfilmedico"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <PerfilMedico />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
