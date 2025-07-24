import { useState } from "react";

import { Dialog } from "@headlessui/react";

import Service from "../../../config/service";

import { GalleryProjectFrontend, IProject } from "../../../config/interface";

import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

function ImagePortfolio(props: IProject) {
  const [isOpenJob, setOpenJob] = useState(false);

  const [isImageOpen, setImageOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<GalleryProjectFrontend>();

  const [title, setTitle] = useState(props.title || "");

  const [description, setDescription] = useState(props.description || "");

  const [location, setLocation] = useState(props.location || "");

  const [projectType, setProjectType] = useState(props.type || "");

  const [technologyUsed, setTechnologyUsed] = useState(
    props.technologyused || ""
  );

  const [projectStatus, setProjectStatus] = useState(
    props.status || "In Progress"
  );

  console.log(props);

  const [selectedFiles, setSelectedFiles] = useState<File[]>(
    props.images[0] || []
  );

  console.log(selectedFiles);

  const [newSelectedFiles, setNewSelectedFiles] = useState<File[]>([]);

  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setNewSelectedFiles(files);

    setProgress(files.length > 0 ? 100 : 0);
  };

  const resetForm = () => {
    setTitle(props.title || "");

    setDescription(props.description || "");

    setLocation(props.location || "");

    setProjectType(props.type || "");

    setTechnologyUsed(props.technologyused || "");

    setProjectStatus(props.status || "In Progress");

    setNewSelectedFiles([]);

    setProgress(0);
  };

  // const handleUpdate = async () => {

  // if (

  // !title.trim() ||

  // !description.trim() ||

  // !location.trim() ||

  // !technologyUsed.trim()

  // ) {

  // alert(

  // "Please fill in all required fields (Title, Description, Location, Software/Technologies Used)."

  // );

  // return;

  // }

  // try {

  // const formData = new FormData();

  // formData.append("title", title.trim());

  // formData.append("description", description.trim());

  // formData.append("location", location.trim());

  // formData.append("type", projectType);

  // formData.append("technologyused", technologyUsed.trim());

  // formData.append("status", projectStatus);

  // if (

  // newSelectedFiles.length === 0 &&

  // props.images &&

  // props.images.length > 0

  // ) {

  // props.images.forEach((imageUrl) =>

  // formData.append("existingImages", imageUrl)

  // );

  // } else {

  // newSelectedFiles.forEach((file) => formData.append("images", file));

  // }

  // const updatedProject = await Service.updateGallery(props.id, formData);

  // alert("Gallery project updated successfully");

  // setOpenJob(false);

  // resetForm();

  // props.onUpdateSuccess({

  // id: props.id,

  // title: updatedProject.title,

  // description: updatedProject.description,

  // location: updatedProject.location,

  // type: updatedProject.type,

  // technologyused: updatedProject.technologyused,

  // status: updatedProject.status,

  // images: updatedProject.images,

  // onUpdateSuccess: props.onUpdateSuccess,

  // onDeleteSuccess: props.onDeleteSuccess,

  // });

  // } catch (error) {

  // console.error("Error updating gallery project:", error);

  // }

  // };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this gallery project? This action cannot be undone."
      )
    ) {
      try {
        await Service.deleteGallery(props.id);

        alert("Gallery project deleted successfully");

        setOpenJob(false);

        props.onDeleteSuccess(props.id);
      } catch (error) {
        console.error("Error deleting gallery project:", error);
      }
    }
  };

  return (
    <>
      {/* Edit Modal */}

      <Dialog
        open={isOpenJob}
        onClose={() => {
          setOpenJob(false);

          resetForm();
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-lg flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold">
                  Edit Gallery: {props.title}
                </Dialog.Title>

                <button
                  onClick={() => {
                    setOpenJob(false);

                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>

                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-title"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Project Title *
                    </label>

                    <input
                      type="text"
                      id="edit-title"
                      {...register("title", { required: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-description"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Description *
                    </label>

                    <textarea
                      id="edit-description"
                      rows={3}
                      {...register("description", { required: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-location"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Location *
                    </label>

                    <input
                      type="text"
                      id="edit-location"
                      {...register("location", { required: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-projectType"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Project Type
                    </label>

                    <select
                      id="edit-projectType"
                      {...register("type", { required: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select project type</option>

                      <option value="Institute">Institute</option>

                      <option value="Commercial">Commercial</option>

                      <option value="Facility Expension">
                        Facility Expension
                      </option>

                      <option value="Industrial">Industrial</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-technologyUsed"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Software/Technologies Used *
                    </label>

                    <input
                      type="text"
                      id="edit-technologyUsed"
                      {...register("technologyused", { required: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Tekla, SDS-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-projectStatus"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Project Status
                    </label>

                    <select
                      id="edit-projectStatus"
                      value={projectStatus}
                      {...register("status", { required: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="PLANNING">Planning</option>

                      <option value="IN_PROGRESS">In Progress</option>

                      <option value="COMPLETED">Completed</option>

                      <option value="ON_HOLD">On Hold</option>

                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="edit-images"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Project Images (Upload new to replace)
                    </label>

                    <input
                      type="file"
                      id="edit-images"
                      accept="image/*"
                      multiple
                      {...register("images")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {newSelectedFiles.length === 0 &&
                      props.images &&
                      props.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {props.images.map(
                            ({ image }: any, { index }: any) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Current Image ${index}`}
                                className="object-cover w-24 h-24 border rounded-md"
                              />
                            )
                          )}
                        </div>
                      )}

                    {/* Show preview of newly selected files */}

                    {newSelectedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newSelectedFiles.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`New Preview ${index}`}
                            className="object-cover w-24 h-24 border rounded-md"
                          />
                        ))}
                      </div>
                    )}

                    {progress > 0 && progress <= 100 && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>

                        <span className="block mt-1 text-sm text-gray-600">
                          {progress.toFixed(0)}% selected
                        </span>
                      </div>
                    )}

                    <p className="mt-1 text-xs text-gray-500">
                      Upload new images to replace existing ones.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}

              <div className="flex justify-center pt-4 mt-6 space-x-4 border-t">
                <button
                  type="button"
                  // onClick={handleUpdate}

                  className="px-6 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Update Project
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Project
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpenJob(false);

                    resetForm();
                  }}
                  className="px-6 py-2 text-white transition-colors bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Image Viewer Modal */}

      <Dialog
        open={isImageOpen}
        onClose={() => setImageOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <Dialog.Title className="text-lg font-semibold">
                  {props.title}
                </Dialog.Title>

                <button
                  onClick={() => setImageOpen(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>

                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                {props.images && props.images.length > 0 ? (
                  // Display the first image or iterate if you want a carousel

                  <img
                    src={props.images[0]}
                    alt={props.title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Table Row */}

      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {props.title}
            </div>

            <div className="max-w-xs text-sm text-gray-500 truncate">
              {props.description}
            </div>

            {props.location && (
              <div className="mt-1 text-xs text-gray-400">
                📍 {props.location}
              </div>
            )}
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {props.type && ( // Changed to props.type
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                {props.type}
              </span>
            )}

            <div className="text-xs text-gray-500">
              Status:{" "}
              <span
                className={`font-medium ${
                  props.status === "Completed" // Changed to props.status
                    ? "text-green-600"
                    : props.status === "In Progress"
                    ? "text-blue-600"
                    : props.status === "On Hold"
                    ? "text-yellow-600"
                    : props.status === "Cancelled"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {props.status || "N/A"}
              </span>
            </div>

            {props.technologyused && ( // Changed to props.technologyused
              <div className="mt-1 text-xs text-gray-400">
                Tools: {props.technologyused}
              </div>
            )}
          </div>
        </td>

        {/* <td className="px-6 py-4 text-center whitespace-nowrap">

{props.images && props.images.length > 0 ? ( // Changed to props.images

<button

onClick={() => setImageOpen(true)}

className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors border border-transparent rounded-lg gap-x-2 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"

>

<svg

className="w-4 h-4"

fill="none"

stroke="currentColor"

viewBox="0 0 24 24"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

strokeWidth={2}

d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"

/>

</svg>

View Image

</button>

) : (

<span className="text-sm text-gray-400">No image</span>

)}

</td> */}

        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
          {props.title || "No Title"}
        </td>

        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
          <Link
            to={selectedFiles?.secureUrl || "#"}
            target="_blank"
            className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            View Image
          </Link>
        </td>

        <td className="px-6 py-4 text-center whitespace-nowrap">
          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => setOpenJob(true)}
              className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors border border-transparent rounded-lg gap-x-1 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ImagePortfolio;
