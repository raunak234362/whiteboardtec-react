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
          reset();
          setNewSelectedFiles([]);
          setProgress(0);
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <div className="w-full max-w-6xl mx-auto">
          <Dialog.Panel className="relative w-full bg-white rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-150 pb-4 mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                Edit Gallery: {props.title}
              </Dialog.Title>
              <button
                type="button"
                onClick={() => {
                  setOpenJob(false);
                  reset();
                  setNewSelectedFiles([]);
                  setProgress(0);
                }}
                className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
              >
                Close
              </button>
            </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-title"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Project Title *
                    </label>
                    <input
                      type="text"
                      id="edit-title"
                      {...register("title", { required: true })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-scope"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Scope *
                    </label>
                    <textarea
                      id="edit-Scope"
                      rows={3}
                      {...register("description", { required: true })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-location"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      id="edit-location"
                      {...register("location", { required: true })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Project Type
                    </label>
                    <select
                      {...register("type")}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                    >
                      <option value="OTHER">Other</option>
                      <option value="INSTITUTE">Institute</option>
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="FACILITY_EXPENSION">
                        Facility Expension
                      </option>
                      <option value="INDUSTRIAL">Industrial</option>
                    </select>

                    {/* Conditional input for otherType */}
                    {typeValue === "OTHER" && (
                      <label className="block mt-4">
                        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                          Specify Other Type *
                        </span>
                        <input
                          {...register("otherType", {
                            required: "Please specify the project type",
                          })}
                          placeholder="Enter project type"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                          type="text"
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="edit-department"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Department
                    </label>
                    <select
                      id="edit-department"
                      {...register("department")}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
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
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Detailing Software
                    </label>
                    <input
                      type="text"
                      id="edit-technologyUsed"
                      {...register("technologyused", { required: true })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                      placeholder="e.g., Tekla, SDS-2"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-designingSoftware"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Designing Software
                    </label>
                    <input
                      type="text"
                      id="edit-designingSoftware"
                      {...register("designingSoftware", { required: true })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                      placeholder="e.g., AutoCAD, Revit"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-projectStatus"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Project Status
                    </label>
                    <select
                      id="edit-projectStatus"
                      {...register("status", { required: true })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
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
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
                    >
                      Project Images (Upload new to replace)
                    </label>
                    <input
                      type="file"
                      id="edit-images"
                      accept="image/*"
                      multiple
                      onChange={handleNewFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-250 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 file:cursor-pointer transition-colors"
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
              <div className="flex gap-4 pt-4 mt-6 border-t border-gray-150">
                <button
                  type="button"
                  onClick={handleUpdate}
                  style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
                  className="flex-1 py-2.5 hover:!bg-[#5baf38] rounded-lg font-bold uppercase transition-all duration-150 shadow-md text-sm tracking-wide"
                >
                  Update Project
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 py-2.5 bg-red-650 hover:bg-red-700 text-red-600 border border-red-650 rounded-lg font-bold uppercase transition-all duration-150 shadow-md text-sm tracking-wide"
                >
                  Delete Project
                </button>
              </div>
            </Dialog.Panel>
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
              onClick={() => setImageOpen(true)}
              className="px-2.5 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors font-semibold"
            >
              View Image
            </button>
          ) : (
            <span className="text-sm text-gray-400">No image</span>
          )}
        </td>

        <td className="px-6 py-4 text-center whitespace-nowrap">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setOpenJob(true)}
              className="px-2.5 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors font-semibold"
            >
              Edit
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ImagePortfolio;
