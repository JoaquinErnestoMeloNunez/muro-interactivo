import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Correo o contraseña incorrectos");
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Bienvenido de vuelta</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div className="error-msg">
              {error}
            </div>
          )}

          <div className="input-group">
            <label>Correo electrónico</label>
            <input 
              type="email" 
              placeholder="usuario@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={cargando}>
            {cargando ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes cuenta? <Link to="/register">Registrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;