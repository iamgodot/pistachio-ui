import { useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useLoaderData } from "react-router-dom";
import { getFeeds } from "../../services/mockApi";
import PostForm from "./PostForm";
import PostElement from "./PostElement";

export function loader() {
  return getFeeds();
}

export default function Newsfeed() {
  const feeds = useLoaderData();
  return (
    <div className="">
      <PostForm />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-7.5">
        {feeds.map(
          ({ id, author, description, file_size, file_url, created_at }) => (
            <PostElement
              key={id}
              postId={id}
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
      </div>
    </div>
  );
}
