import { useLoaderData } from "react-router-dom";
import PostElement from "./PostElement";
import { getUserPosts } from "../../services/mockApi";

export default function CreatedPost() {
  const feeds = useLoaderData();
  return (
    <>
      {feeds.map(
        ({ id, author, description, file_size, file_url, created_at }) => (
          <PostElement
            key={id}
            author={author}
            description={description}
            file={{
              size: file_size,
              url: file_url,
              date: created_at,
            }}
          />
        )
      )}
    </>
  );
}

export async function loader() {
  const feeds = getUserPosts();
  return feeds;
}
