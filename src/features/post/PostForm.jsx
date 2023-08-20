import { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { createPost } from "../../services/backendApi";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

export default function PostForm() {
  const pond = useRef(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (file == null) {
      alert("File is empty!");
      return;
    }
    if (description === "") {
      alert("Description is empty!");
      return;
    }
    data.append("file", file.file);
    data.append("description", description);
    //data.append("user_id", user.id);
    const response = await createPost(data);
    if (response.status === 201) {
      setFile(null);
      setDescription("");
      if (pond.current && pond.current.getFiles().length > 0)
        pond.current.removeFile(0);
    }
  };
  return (
    <div className="rounded-2xl drop-shadow-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-2">
            <label className="font-bold mb-2.5 block text-black dark:text-white">
              Description <span className="text-meta-1">*</span>
            </label>
            <textarea
              rows={6}
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Describe the file"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="mb-5">
            <label className="font-bold mb-2.5 block text-black dark:text-white">
              File <span className="text-meta-1">*</span>
            </label>
            <FilePond
              ref={pond}
              onupdatefiles={(files) => {
                setFile(files[0]);
              }}
              allowMultiple={false}
              maxFiles={1}
              //server="/api"
              //name="files" /* sets the file input name, it's filepond by default */
              acceptedFileTypes={["application/pdf"]}
              maxFileSize="100MB"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
            Create New Post
          </button>
        </div>
      </form>
    </div>
  );
}
