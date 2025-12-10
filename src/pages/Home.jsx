import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUser } from "../context/UserContext";
import NuevoPost from "../components/NuevoPost";
import ListaPosts from "../components/ListaPosts";
import "./Home.css";

const Home = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("fecha", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsLeidos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsLeidos);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="home">
      {user ? (
        <NuevoPost userEmail={user.email} uid={user.uid} />
      ) : (
        <div className="aviso-login">
          <p>Inicia sesión para publicar</p>
        </div>
      )}

      <div className="separador">
        <span>Publicaciones recientes</span>
      </div>

      {cargando ? (
        <div className="cargando">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      ) : (
        <ListaPosts posts={posts} />
      )}
    </div>
  );
};

export default Home;