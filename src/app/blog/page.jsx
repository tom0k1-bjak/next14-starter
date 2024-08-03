import styles from "./blog.module.css";
import PostCard from "../../components/postCard/postCard";

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("something went wrong");
  }

  return res.json();
};

const BlogPage = async () => {
  const posts = await getData();

  return (
    <div className={styles.container}>
      {posts.map((p) => (
        <div className={styles.post} key={p.id}>
          <PostCard post={p} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
