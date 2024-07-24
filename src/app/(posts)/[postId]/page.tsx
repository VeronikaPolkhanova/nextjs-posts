import classes from "./post.module.css";

interface PageProps {
  params: {
    postId: number;
  };
}

const fetchPost = async (postId: number) => {
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      next: { revalidate: 1200 },
    }
  ).then((response) => response.json());

  return result;
};

const page = async ({ params }: PageProps) => {
  const post = await fetchPost(params.postId);
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{`#${post.id} ${post.title}`}</h1>
      <p>{`User id: ${post.userId}`}</p>
      <p>{post.body}</p>
    </div>
  );
};

export default page;
