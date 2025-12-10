import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: "",
    apellido: ""
  });
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const obtenerDatos = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDatos(docSnap.data());
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [user, navigate]);

  const handleGuardar = async (e) => {
    e.preventDefault();
    setMensaje("");
    
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nombre: datos.nombre,
        apellido: datos.apellido
      });
      setMensaje("¡Perfil actualizado correctamente!");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al actualizar perfil");
    }
  };

  if (cargando) return <div className="cargando">Cargando perfil...</div>;

  if (!user) return null; 

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        {}
        <div className="profile-header">
          <div className="profile-avatar-large">
            {datos.nombre ? datos.nombre.charAt(0).toUpperCase() : "?"}
          </div>
          <span className="profile-email">{user.email}</span>
        </div>

        {mensaje && <div className="success-msg">{mensaje}</div>}

        {/* Formulario de Edición */}
        <form onSubmit={handleGuardar} className="form-section">
          <div>
            <h3 className="section-title">Información Personal</h3>
            <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem'}}>
              Estos datos son visibles por otros usuarios.
            </p>
          </div>

          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              value={datos.nombre || ""}
              onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Apellido</label>
            <input
              type="text"
              value={datos.apellido || ""}
              onChange={(e) => setDatos({ ...datos, apellido: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-save">
            Guardar Cambios
          </button>
        </form>

      </div>
    </div>
  );
};

export default Profile;