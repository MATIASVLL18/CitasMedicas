import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Perfil from '../pages/Perfil';
import Reserva from '../pages/Reserva';
import Medico from './pages/Medico';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="reserva" element={<Reserva />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="/medico" element={<Medico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
