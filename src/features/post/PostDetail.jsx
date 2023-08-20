import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useLoaderData } from "react-router-dom";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { getPost } from "../../services/mockApi";
import { ItemHeader, ItemFooter, Divider } from "./PostElement";
import { useState } from "react";
import PostSummary from "./PostSummary";

export default function PostDetail() {
  const post = useLoaderData();
  const author = post.author;
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      searchPlugin: {
        keyword: ["document"],
        onHighlightKeyword: (props) => {
          props.highlightEle.style.outline = "1px dashed blue";
          props.highlightEle.style.backgroundColor = "rgba(0, 0, 0, .1)";
        },
      },
    },
  });
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <PostSummary
          postId={post.id}
          modalOpen={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div className="flex justify-center">
        <div className="w-2/3 my-4 p-5 rounded-2xl drop-shadow-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ItemHeader
            avatarUrl={author.avatar}
            userName={author.nickname}
            userId={author.id}
          />
          <Divider margin={4} border={1} />
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
            <div className="h-125 my-4">
              <Viewer
                fileUrl={post.file_url}
                defaultScale={SpecialZoomLevel.PageFit}
                theme="light"
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
          <h3 className="text-lg font-bold mb-4">Description:</h3>
          <p className="mt-4">{post.description}</p>
          <Divider margin={4} border={1} />
          <ItemFooter
            fileSize={post.file_size}
            postDate={post.created_at}
            openModal={() => setShowModal(true)}
          />
        </div>
      </div>
    </>
  );
}

export async function loader({ params }) {
  const post = getPost(params.postId);
  return post;
}
