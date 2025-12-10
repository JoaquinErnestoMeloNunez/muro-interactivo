import PostCard from "./PostCard";
import "./ListaPosts.css";

const ListaPosts = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="sin-posts">
        <span className="emoji">📭</span>
        <p>Aún no hay publicaciones</p>
      </div>
    );
  }

  return (
    <div className="lista-posts">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ListaPosts;