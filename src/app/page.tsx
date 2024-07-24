import classes from "./page.module.css";
import Link from "next/link";

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
    next: { revalidate: 1200 },
  }).then((response) => response.json());

  return result;
};

export default async function Home() {
  const postsData = await fetchPosts();

  const posts = (
    <ul className={classes.container}>
      {postsData.map((post: Posts) => (
        <li key={post.id}>
          <Link href={`/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <main className={classes.main}>
      <h1>Posts</h1>
      {posts}
    </main>
  );
}
