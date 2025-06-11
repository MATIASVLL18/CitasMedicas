import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { auth, db } from "../backend/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const usuarioActual = auth.currentUser;

      if (usuarioActual) {
        const uid = usuarioActual.uid;
        const correo = usuarioActual.email;

        try {
          const docRef = doc(db, "usuarios", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUsuario({
              nombre: data.nombre || "",
              telefono: data.telefono || "",
              correo: correo || "",
            });
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      }
    };

    obtenerDatosUsuario();
  }, []);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    const usuarioActual = auth.currentUser;

    if (usuarioActual) {
      const uid = usuarioActual.uid;

      try {
        // Solo actualizamos nombre y teléfono, no correo
        const docRef = doc(db, "usuarios", uid);
        await updateDoc(docRef, {
          nombre: usuario.nombre,
          telefono: usuario.telefono,
        });

        setEditando(false);
        alert("Datos actualizados correctamente.");
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Ocurrió un error al guardar los cambios.");
      }
    }
  };

  return (
    <div className="perfil-container">
      <nav className="navbar">
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/reserva")}>Reserva</li>
          <li onClick={() => navigate("/perfil")}>Perfil</li>
          <li onClick={() => navigate("/login")}>Login</li>
        </ul>
      </nav>

      <div className="perfil-card">
        <FaUser className="perfil-icono" />
        {editando ? (
          <>
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="telefono"
              value={usuario.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
            />
            <input
              type="email"
              name="correo"
              value={usuario.correo}
              readOnly
              placeholder="Correo"
              style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={() => setEditando(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <h2>{usuario.nombre}</h2>
            <p><FaPhone className="perfil-dato-icono" /> {usuario.telefono}</p>
            <p><FaEnvelope className="perfil-dato-icono" /> {usuario.correo}</p>
            <button onClick={() => setEditando(true)}>Editar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Perfil;
