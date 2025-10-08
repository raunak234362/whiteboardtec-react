import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Service from "../../../config/service";
import { useForm } from "react-hook-form";
import { IProject, GalleryProjectFrontend } from "../../../config/interface";
// import { Link } from "react-router-dom";

interface ImagePortfolioProps extends IProject {
  onUpdateSuccess: (updatedItem: GalleryProjectFrontend) => void;
  onDeleteSuccess: (deletedId: string) => void;
}

function ImagePortfolio(props: ImagePortfolioProps) {
  const [isOpenJob, setOpenJob] = useState(false);
  const [isImageOpen, setImageOpen] = useState(false); // State to control the image viewer modal
  const [newSelectedFiles, setNewSelectedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  console.log("ImagePortfolio props:", props);
  const { register, setValue, watch, reset } = useForm<GalleryProjectFrontend>({
    defaultValues: {
      id: props.id, // Ensure ID is part of default values for consistency
      title: props.title,
      description: props.description,
      location: props.location,
      type: props.type,
      technologyused: props.technologyused,
      otherType: props.otherType || "",
      designingSoftware: props.designingSoftware || "",
      status: props.status,
      department: props.department, // Add department to default values
      // Note: `images` and `file` are not directly set as default values here
      // as they are handled separately for file inputs and existing images.
    },
  });

  const typeValue = watch("type");

  // Clear otherType if not OTHER
  useEffect(() => {
    if (typeValue !== "OTHER") {
      setValue("otherType", "");
    }
  }, [typeValue, setValue]);

  // Watch for changes in form fields to reflect in state for handleUpdate
  const title = watch("title");
  const description = watch("description");
  const location = watch("location");
  const projectType = watch("type");
  const otherType = watch("otherType");
  const technologyUsed = watch("technologyused");
  const designingSoftware = watch("designingSoftware");
  const projectStatus = watch("status");
  const department = watch("department"); // Watch department too

  // Effect to update form values when props change (e.g., after an update from parent)
  useEffect(() => {
    setValue("title", props.title);
    setValue("description", props.description);
    setValue("location", props.location);
    setValue("type", props.type);
    setValue("otherType", props.otherType ?? "");
    setValue("technologyused", props.technologyused);
    setValue("designingSoftware", props.designingSoftware);
    setValue("status", props.status);
    setValue("department", props.department); // Set department when props change
    setNewSelectedFiles([]); // Clear new selected files on prop change
    setProgress(0);
  }, [props, setValue]);

  const handleUpdate = async () => {
    if (
      !title?.trim() || // Use optional chaining for safety
      !description?.trim() ||
      !location?.trim() ||
      !technologyUsed?.trim()
    ) {
      alert(
        "Please fill in all required fields (Title, Scope, Location, Software/Technologies Used)."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("location", location.trim());
      formData.append("type", projectType);
      formData.append("otherType", otherType);
      formData.append("designingSoftware", designingSoftware || "");
      formData.append("technologyused", technologyUsed.trim());
      formData.append("status", projectStatus);
      formData.append("department", department);

      // If new files are selected, append them. Otherwise, the backend should ideally
      // retain existing images if no 'images' field is present in the FormData.
      // If your backend *requires* sending existing image URLs when no new files are uploaded,
      // you would need to convert existing URLs to blobs or send them in a separate field.
      // For this example, we assume if `images` is not in FormData, existing are kept.
      newSelectedFiles.forEach((file) => formData.append("images", file));

      const updatedProject = await Service.updateGallery(props.id, formData);
      console.log("Updated project response:", updatedProject);
      alert("Gallery project updated successfully");
      setOpenJob(false);
      reset(); // Reset form fields to default (or current props values)
      setNewSelectedFiles([]); // Clear selected files after successful upload
      setProgress(0); // Reset progress
    } catch (error) {
      console.error("Error updating gallery project:", error);
      alert("Something went wrong while updating the gallery project.");
    }
  };

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
        props.onDeleteSuccess(props.id); // Notify parent component of deletion
      } catch (error) {
        console.error("Error deleting gallery project:", error);
        alert("Something went wrong while deleting portfolio");
      }
    }
  };

  const handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewSelectedFiles(files);
      // Simulate progress for visual feedback
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
        }
      }, 100); // Simulate upload progress
    } else {
      setNewSelectedFiles([]);
      setProgress(0);
    }
  };

  return (
    <>
      {/* Edit Modal */}
      <Dialog
        open={isOpenJob}
        onClose={() => {
          setOpenJob(false);
          reset(); // Reset form fields to initial props values
          setNewSelectedFiles([]); // Clear new selected files on close
          setProgress(0); // Reset progress
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
                    reset();
                    setNewSelectedFiles([]);
                    setProgress(0);
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
                      htmlFor="edit-scope"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Scope *
                    </label>
                    <textarea
                      id="edit-Scope"
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
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Project Type
                      </span>
                      <select
                        {...register("type")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="OTHER">Other</option>
                        <option value="INSTITUTE">Institute</option>
                        <option value="COMMERCIAL">Commercial</option>
                        <option value="FACILITY_EXPENSION">
                          Facility Expension
                        </option>
                        <option value="INDUSTRIAL">Industrial</option>
                      </select>
                    </label>

                    {/* Conditional input for otherType */}
                    {typeValue === "OTHER" && (
                      <label>
                        <span className="block mb-1 text-sm font-medium text-gray-700">
                          Specify Other Type *
                        </span>
                        <input
                          {...register("otherType", {
                            required: "Please specify the project type",
                          })}
                          placeholder="Enter project type"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          type="text"
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="edit-department" // Changed ID for uniqueness within form
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <select
                      id="edit-department" // Changed ID
                      {...register("department")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="OTHER">Select project type</option>
                      <option value="PEMB">PEMB</option>
                      <option value="STRUCTURAL">Structural</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-technologyUsed"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Detailing Software
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
                      htmlFor="edit-technologyUsed"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Designing Software
                    </label>
                    <input
                      type="text"
                      id="edit-designingSoftware"
                      {...register("designingSoftware", { required: true })}
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
                      onChange={handleNewFileChange} // Use the new handler
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* Display existing images if no new files are selected AND there are existing images */}
                    {newSelectedFiles.length === 0 &&
                      props.images &&
                      props.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {props.images.map(
                            (
                              imgObj: string | { image: string },
                              index: number
                            ) => (
                              <img
                                key={index}
                                src={
                                  typeof imgObj === "string"
                                    ? imgObj
                                    : imgObj.image
                                }
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
                  onClick={handleUpdate}
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
                    reset();
                    setNewSelectedFiles([]);
                    setProgress(0);
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
                {/* Corrected image source access */}
                {props.images && props.images.length > 0 ? (
                  typeof props.images[0] === "string" ? (
                    <img
                      src={props.images[0] as string}
                      alt={props.title}
                      className="w-full h-auto max-h-[70vh] object-contain rounded"
                    />
                  ) : (
                    <img
                      src={
                        (
                          props.images[0] as {
                            image?: string;
                            secureUrl?: string;
                          }
                        )?.secureUrl ||
                        (props.images[0] as { image?: string })?.image ||
                        ""
                      }
                      alt={props.title}
                      className="w-full h-auto max-h-[70vh] object-contain rounded"
                    />
                  )
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
            {props.type && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                {props.type}
              </span>
            )}
            <div className="text-xs text-gray-500">
              Status:{" "}
              <span
                className={`font-medium ${
                  String(props.status) === "COMPLETED"
                    ? "text-green-600"
                    : String(props.status) === "IN_PROGRESS"
                    ? "text-blue-600"
                    : String(props.status) === "ON_HOLD"
                    ? "text-yellow-600"
                    : String(props.status) === "CANCELLED"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {props.status || "N/A"}
              </span>
            </div>
            {props.technologyused && (
              <div className="mt-1 text-xs text-gray-400">
                Tools: {props.technologyused}
              </div>
            )}
            {props.department && (
              <div className="mt-1 text-xs text-gray-400">
                Dept: {props.department}
              </div>
            )}
          </div>
        </td>

        <td className="px-6 py-4 text-center whitespace-nowrap">
          {props.images && props.images.length > 0 ? (
            <button
              onClick={() => setImageOpen(true)} // Open the image viewer modal
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
