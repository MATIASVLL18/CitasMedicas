import React, { useEffect, useState } from 'react';
import '../styles/FichasMedicas.css';
import '../styles/animations.css';
import NavBarMedico from '../layouts/NavBarMedico'; 
import { db } from '../backend/firebase'; 
import { collection, getDocs, updateDoc, query, where, doc } from 'firebase/firestore';

const FichasMedicas = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [abierto, setAbierto] = useState(null); // ID del paciente expandido
  const [editando, setEditando] = useState(null); // RUT del paciente en edición
  const [editData, setEditData] = useState({ alergias: '', antecedentes: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const ref = collection(db, "reservas"); 
        const res = await getDocs(ref);
        const datos = res.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Agrupa por RUT (solo el primer registro de cada RUT)
        const vistos = {};
        const pacientesUnicos = [];
        datos.forEach(p => {
          if (!p.rut) return;
          if (!vistos[p.rut]) {
            vistos[p.rut] = true;
            pacientesUnicos.push(p);
          }
        });
        setPacientes(pacientesUnicos);
      } catch (error) {
        console.error("Error obteniendo pacientes:", error);
      }
    };
    obtenerPacientes();
  }, []);

  // Filtrado por nombre o RUT
  const pacientesFiltrados = pacientes.filter(p => 
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.rut?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Mostrar máximo 5 solo si NO hay búsqueda
  const mostrarPacientes = busqueda
    ? pacientesFiltrados
    : pacientes.slice(0, 5);

  const handleToggle = (id) => {
    setAbierto(abierto === id ? null : id);
    setEditando(null); // Si cambias de ficha, cierras edición
  };

  // Manejo de edición
  const handleEdit = (p) => {
    setEditando(p.rut);
    setEditData({
      antecedentes: p.antecedentes || '',
      alergias: p.alergias || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = async (p) => {
    setSaving(true);
    try {
      // Actualiza TODOS los docs con el mismo RUT
      const ref = collection(db, "reservas");
      const q = query(ref, where("rut", "==", p.rut));
      const res = await getDocs(q);
      const batch = [];
      for (const docSnap of res.docs) {
        batch.push(
          updateDoc(doc(db, "reservas", docSnap.id), {
            antecedentes: editData.antecedentes,
            alergias: editData.alergias,
          })
        );
      }
      await Promise.all(batch);

      // Actualiza en pantalla
      setPacientes(prev =>
        prev.map(pac =>
          pac.rut === p.rut
            ? { ...pac, antecedentes: editData.antecedentes, alergias: editData.alergias }
            : pac
        )
      );
      setEditando(null);
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
    setSaving(false);
  };

  return (
    <div className="fondo-animado">
      <NavBarMedico />
      <div className="fichasmedicas-container">
        <h1>Fichas Clínicas de Pacientes</h1>
        <input
          className="fichasmedicas-buscador"
          type="text"
          placeholder="Buscar por nombre o RUT"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />

        <div className="fichasmedicas-lista">
          {mostrarPacientes.length === 0 ? (
            <div className="fichasmedicas-vacio">
              No se encontraron pacientes.
            </div>
          ) : (
            mostrarPacientes.map((p, idx) => (
              <div
                key={p.rut || idx}
                className={`fichasmedicas-acordeon ${abierto === (p.rut || idx) ? "abierto" : ""}`}
              >
                <div className="acordeon-cabecera" onClick={() => handleToggle(p.rut || idx)}>
                  <div className="acordeon-identidad">
                    <span className="acordeon-nombre">{p.nombre}</span>
                    <span className="acordeon-rut">{p.rut}</span>
                  </div>
                  <div className="acordeon-boton-contenedor">
                    <button
                      className="acordeon-boton"
                      aria-label={abierto === (p.rut || idx) ? "Cerrar ficha" : "Ver ficha"}
                    >
                      {abierto === (p.rut || idx) ? "▲" : "▼"}
                    </button>
                  </div>
                </div>
                {abierto === (p.rut || idx) && (
                  <div className="acordeon-detalle">
                    <div><strong>Correo:</strong> {p.correo}</div>
                    <div><strong>Teléfono:</strong> {p.telefono}</div>
                    <div><strong>Sexo:</strong> {p.sexo}</div>
                    <div><strong>Fonasa:</strong> {p.fonasa}</div>
                    <div><strong>Dirección:</strong> {p.direccion}</div>
                    
                    {/* Editable: Antecedentes y Alergias */}
                    {editando === p.rut ? (
                      <>
                        <div>
                          <strong>Antecedentes:</strong>
                          <textarea
                            name="antecedentes"
                            value={editData.antecedentes}
                            onChange={handleEditChange}
                            rows={2}
                            style={{width:"100%", marginTop:4}}
                          />
                        </div>
                        <div>
                          <strong>Alergias:</strong>
                          <textarea
                            name="alergias"
                            value={editData.alergias}
                            onChange={handleEditChange}
                            rows={2}
                            style={{width:"100%", marginTop:4}}
                          />
                        </div>
                        <button
                          onClick={() => handleGuardar(p)}
                          disabled={saving}
                          style={{
                            marginTop:12, background:"#2576d2", color:"#fff",
                            border:"none", borderRadius:6, padding:"7px 22px", cursor:"pointer"
                          }}
                        >
                          {saving ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                          onClick={() => setEditando(null)}
                          style={{
                            marginLeft:10, marginTop:12, background:"#eee", color:"#222",
                            border:"none", borderRadius:6, padding:"7px 22px", cursor:"pointer"
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <div>
                          <strong>Antecedentes:</strong> {p.antecedentes || "-"}
                          <button
                            className="editar-btn"
                            onClick={e => { e.stopPropagation(); handleEdit(p); }}
                            style={{marginLeft:14, fontSize:13, background:"none", color:"#2576d2", border:"none", cursor:"pointer"}}
                          >
                            Editar
                          </button>
                        </div>
                        <div>
                          <strong>Alergias:</strong> {p.alergias || "-"}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FichasMedicas;
