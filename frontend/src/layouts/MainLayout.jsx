import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/">Home</Link>
        <Link to="/reserva">Reserva</Link>
        <Link to="/perfil">Perfil</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
