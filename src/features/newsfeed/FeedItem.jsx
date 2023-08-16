import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { Link } from "react-router-dom";

export default function FeedItem({ author, description, file }) {
  return (
    <div className="my-4 p-5 rounded-2xl drop-shadow-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <ItemHeader
        avatarUrl={author.avatar}
        userName={author.nickname}
        userId={author.id}
      />
      <Divider margin={4} border={1} />
      <ItemContent description={description} fileUrl={file.url} />
      <ItemFooter
        fileSize={file.size}
        postDate={file.date}
        fileUrl={file.url}
      />
    </div>
  );
}
function ItemHeader({ avatarUrl, userName, userId }) {
  return (
    <Link to={`users/${userId}`}>
      <div className="flex flex-row items-end">
        <img className="w-8 h-8 rounded-full mr-2" src={avatarUrl} alt="" />
        <span className="font-bold">{userName}</span>
      </div>
    </Link>
  );
}
function ItemContent({ description, fileUrl }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Description:</h3>
      <p>{description}</p>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <div className="h-screen my-4">
          <Viewer
            fileUrl={fileUrl}
            defaultScale={SpecialZoomLevel.PageFit}
            //initialPage={1}
          />
        </div>
      </Worker>
    </div>
  );
}
function ItemFooter({ fileSize, postDate, fileUrl }) {
  return (
    <div className="mt-8 mb-3 flex flex-row justify-between">
      <div>
        <h3 className="text-lg font-bold mb-4">Metadata:</h3>
        <p>File size: {fileSize}</p>
        <p>Posted on: {postDate}</p>
      </div>
      <div className="flex flex-col justify-between">
        <Button text="View" />
        <a href={fileUrl} download>
          <Button text="Download" />
        </a>
      </div>
    </div>
  );
}
function Divider({ margin, border }) {
  return <hr className={`my-${margin} border-${border} border-gray-300`}></hr>;
}
function Button({ text }) {
  return (
    <button className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">
      {text}
    </button>
  );
}
