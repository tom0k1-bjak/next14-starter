import styles from "./blog.module.css";
import PostCard from "../../components/postCard/postCard";
import { getPosts } from "../../../lib/data";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("something went wrong");
  }

  return res.json();
};

const BlogPage = async () => {
  // const posts = await getPosts();
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
