import { useState } from "react";
import { PortfolioPropType } from "../../ourWork";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";

function WorkPortfolio(props: PortfolioPropType) {
  const [isOpenJob, setOpenJob] = useState(false);
  const [id] = useState(props.id);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [pdf, setPdf] = useState(props.pdf);
  const [images, setImages] = useState(props.images);
  const [status, setStatus] = useState(props.status);

  const handleUpdate = () => {
    console.log(id, title, description, pdf, images, status);
  };

  const handleDelete = () => {
    console.log(id);
  };

  return (
    <>
      <Dialog
        open={isOpenJob}
        onClose={() => setOpenJob(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-1 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col">
              <div className="flex justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  Edit Portfolio for {props.title}
                </Dialog.Title>
                <button
                  onClick={() => setOpenJob(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <table className="mt-4 mx-10 border-separate border-spacing-y-4">
                <tr>
                  <td>
                    <label htmlFor="Role" className="text-sm text-gray-800">
                      Title
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Role"
                      id="Role"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Location" className="text-sm text-gray-800">
                      Description
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Description"
                      id="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="image" className="text-sm text-gray-800">
                      Images
                    </label>
                  </td>
                  <td >
                    {images?.map((_image, index) => (
                      <div key={index} className="my-1 ml-3">
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={(e) => {
                            const newImages = [...images];
                            newImages[index] = {
                              ...newImages[index],
                              url: e.target.value,
                            };
                            setImages(newImages);
                          }}
                          className="border-2 border-gray-200 rounded-md mx-2 w-fit"
                        />
                        <button
                          type="button"
                          className="text-red-500 ml-1"
                          onClick={() => {
                            const filteredImages = images.filter(
                              (img, i) => i !== index
                            );
                            setImages(filteredImages);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-2 py-0.5 rounded-lg ml-10 mt-2"
                      onClick={() => {
                        const newImage = { url: "" };
                        setImages((prevImages) => [
                          ...(prevImages || []),
                          newImage,
                        ]);
                      }}
                    >
                      { (images?.length == 0)? "Add Images":"Add More Images" }
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="pdf" className="text-sm text-gray-800">
                      PDF
                    </label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="PDF"
                      id="PDF"
                      onChange={(e) => {
                        setPdf(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Active" className="text-sm text-gray-800">
                      Status
                    </label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Active"
                      id="Active"
                      checked={status}
                      onChange={() => setStatus(!status)}
                      className="border-2 border-gray-200 rounded-md mx-4 custom-checkbox"
                    />
                    {status ? (
                      <label className="text-[#6abd45]" htmlFor="Active">
                        Active
                      </label>
                    ) : (
                      <label className="text-red-600" htmlFor="Active">
                        Inactive
                      </label>
                    )}
                  </td>
                </tr>
              </table>
              <div className="flex flex-wrap justify-center flex-row">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                  className=" px-4 border-2 rounded-md bg-[#6abd45] text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                >
                  Update
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  className=" px-4 border-2 rounded-md bg-red-600 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-red-600 hover:text-red-600 hover:bg-white"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setOpenJob(false);
                  }}
                  className=" px-4 border-2 rounded-md bg-slate-600 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-slate-600 hover:text-slate-600 hover:bg-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
          {props.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 ">
          <Link
            to={props.pdf}
            target="_blank"
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            View PDF
          </Link>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpenJob(true);
            }}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            More
          </button>
        </td>
      </tr>
    </>
  );
}

export default WorkPortfolio;
