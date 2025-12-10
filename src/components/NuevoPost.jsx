import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import "./NuevoPost.css";

const NuevoPost = ({ userEmail, uid }) => {
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    setEnviando(true);
    try {
      await addDoc(collection(db, "posts"), {
        contenido: texto,
        autor: userEmail,
        uid: uid,
        fecha: serverTimestamp()
      });
      setTexto("");
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo publicar. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="nuevo-post">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="¿Qué estás pensando?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows="3"
          disabled={enviando}
        />
        <div className="form-footer">
          <span className="contador">
            {texto.length > 0 && `${texto.length} caracteres`}
          </span>
          <button 
            type="submit" 
            disabled={enviando || !texto.trim()}
            className="btn-publicar"
          >
            {enviando ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoPost;