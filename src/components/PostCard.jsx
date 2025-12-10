import "./PostCard.css";

/*const PostCard = ({ post }) => {
  const formatearFecha = (fecha) => {
    if (!fecha?.seconds) return "Hace un momento";
    
    const date = new Date(fecha.seconds * 1000);
    const ahora = new Date();
    const diferencia = Math.floor((ahora - date) / 1000);

    if (diferencia < 60) return "Hace un momento";
    if (diferencia < 3600) return `Hace ${Math.floor(diferencia / 60)} min`;
    if (diferencia < 86400) return `Hace ${Math.floor(diferencia / 3600)} h`;
    
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIniciales = (email) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <article className="post">
      <div className="post-header">
        <div className="avatar">{getIniciales(post.autor)}</div>
        <div className="post-info">
          <h3 className="autor">{post.autor.split('@')[0]}</h3>
          <time className="fecha">{formatearFecha(post.fecha)}</time>
        </div>
      </div>
      <p className="post-texto">{post.contenido}</p>
    </article>
  );
};

export default PostCard; */

import "./PostCard.css";

const PostCard = ({ post }) => {
  const formatearFecha = (fecha) => {
    if (!fecha?.seconds) return "Hace un momento";
    
    const date = new Date(fecha.seconds * 1000);
    const ahora = new Date();
    const diferencia = Math.floor((ahora - date) / 1000);

    if (diferencia < 60) return "Hace un momento";
    if (diferencia < 3600) return `Hace ${Math.floor(diferencia / 60)} min`;
    if (diferencia < 86400) return `Hace ${Math.floor(diferencia / 3600)} h`;
    
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  const getIniciales = (email) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <article className="post">
      {/* 1. Columna Izquierda: Avatar */}
      <div className="post-left">
        <div className="avatar">{getIniciales(post.autor)}</div>
      </div>

      {/* 2. Columna Derecha: Contenido */}
      <div className="post-right">
        <div className="post-header">
          <h3 className="autor">{post.autor.split('@')[0]}</h3>
          <span className="dot">·</span>
          <time className="fecha">{formatearFecha(post.fecha)}</time>
        </div>
        <p className="post-texto">{post.contenido}</p>
      </div>
    </article>
  );
};

export default PostCard;