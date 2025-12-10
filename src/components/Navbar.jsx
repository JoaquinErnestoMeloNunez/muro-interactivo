import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          <span className="brand-icon"></span>
          <span>Muro Interactivo</span>
        </Link>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-greeting">
                {user.email.split('@')[0]}
              </span>
              <Link to="/profile" className="user-greeting" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                Mi Perfil
              </Link>
              <button onClick={logout} className="btn-logout">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-link">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn-primary">
                Crear Cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;