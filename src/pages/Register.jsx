import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        uid: userCredential.user.uid,
        fechaCreacion: new Date()
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setError("Error al crear la cuenta");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Crear cuenta</h1>
          <p>Unete e interactua con otras personas</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-msg">
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="input-group">
              <label>Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                placeholder="Nombre" 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="input-group">
              <label>Apellido</label>
              <input 
                type="text" 
                name="apellido" 
                placeholder="Apellido" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input 
              type="email" 
              name="email" 
              placeholder="username@email.com" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Mínimo 6 caracteres" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn-submit" disabled={cargando}>
            {cargando ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Tienes cuenta? <Link to="/login">Inicia sesion</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;