import { useEffect, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useLoaderData } from "react-router-dom";
import { getFeeds } from "../../services/mockApi";
import { getPosts } from "../../services/backendApi";
import PostForm from "./PostForm";
import PostElement from "./PostElement";

export async function loader() {
  // const posts = await getPosts();
  const posts = getFeeds();
  return posts;
}

export default function Newsfeed() {
  const feeds = useLoaderData();
  // const [feeds, setFeeds] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const posts = await getPosts();
  //     setFeeds(posts);
  //   })();
  // }, []);
  return (
    <div className="">
      <PostForm />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-7.5">
        {feeds.map(({ id, author, description, file_url, created_at }) => (
          <PostElement
            key={id}
            postId={id}
            author={author}
            description={description}
            file={{
              url: file_url,
              date: created_at,
            }}
          />
        ))}
      </div>
    </div>
  );
}
