import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  ScrollMode,
} from "@react-pdf-viewer/core";
import { Link } from "react-router-dom";

export default function PostElement({ postId, author, description, file }) {
  return (
    <div className="my-4 p-5 rounded-2xl drop-shadow-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <ItemHeader
        avatarUrl={author.avatar}
        userName={author.nickname}
        userId={author.id}
      />
      <Divider margin={4} border={1} />
      <ItemContent
        postId={postId}
        description={description}
        fileUrl={file.url}
      />
    </div>
  );
}
export function ItemHeader({ avatarUrl, userName, userId }) {
  return (
    <Link to={`/users/${userId}`}>
      <div className="flex flex-row items-end">
        <img className="w-8 h-8 rounded-full mr-2" src={avatarUrl} alt="" />
        <span className="font-bold">{userName}</span>
      </div>
    </Link>
  );
}
function ItemContent({ postId, description, fileUrl }) {
  return (
    <Link to={`/posts/${postId}`}>
      <div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
          <div className="h-96 my-4">
            <Viewer
              fileUrl={fileUrl}
              defaultScale={SpecialZoomLevel.PageFit}
              theme="light"
              scrollMode={ScrollMode.Page}
              //initialPage={1}
            />
          </div>
        </Worker>
        {/* <h3 className="text-lg font-bold mb-4">Description:</h3> */}
        <p className="mt-4">{description}</p>
      </div>
    </Link>
  );
}
export function ItemFooter({ fileSize, postDate, openModal }) {
  return (
    <div className="mt-8 mb-3 flex flex-row justify-between">
      <div>
        <h3 className="text-lg font-bold mb-4">Metadata:</h3>
        <p>File size: {fileSize}</p>
        <p>Posted on: {postDate}</p>
      </div>
      <div className="flex flex-col justify-between">
        <Button text="Get summary" handleClick={openModal} />
      </div>
    </div>
  );
}
export function Divider({ margin, border }) {
  return <hr className={`my-${margin} border-${border} border-gray-300`}></hr>;
}
function Button({ text, handleClick }) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-meta-3 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
}
