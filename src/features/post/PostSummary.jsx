import React, { useEffect, useState } from "react";
import { getPostSummary } from "../../services/backendApi";

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

export default function PostSummary({ postId, modalOpen, closeModal }) {
  const [summary, setSummary] = useState("");
  useEffect(() => {
    (async () => {
      const postSummary = await getPostSummary(postId);
      setSummary(postSummary);
    })();
  }, []);
  return (
    <div className="absolute z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="h-auto w-3/4 p-4 rounded-2xl drop-shadow-lg border border-stroke bg-gray shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-center text-lg font-bold dark:text-white">
            Summary of this file
          </h3>
          <div className="mt-5">
            {!summary && <Loader />}
            {summary && <p className="text-md dark:text-gray-200">{summary}</p>}
          </div>
        </div>
        <div className="flex justify-center mt-5 sm:mt-6">
          <button
            className="inline-flex items-center justify-center rounded-md bg-meta-3 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => closeModal()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
