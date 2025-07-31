import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
import { Dialog } from "@headlessui/react";
import ImagePortfolio from "./components/ImagePortfolio";
import Service from "../../config/service";
import { useForm, SubmitHandler } from "react-hook-form";

import { IProject, GalleryProjectFrontend } from "../../config/interface"; // Ensure IProject and GalleryProjectFrontend are correctly imported

// Define a type for form input fields only (exclude id, images, etc.)
type IProjectFormInput = {
  title: string;
  description: string;
  location: string;
  type: string;
  technologyused: string;
  status: string;
  department: string;
};

const AdminGallery = () => {
  // State variables
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [gallery, setGallery] = useState<GalleryProjectFrontend[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProjectFormInput>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      type: "OTHER", // Use uppercase enum values for consistency
      technologyused: "",
      status: "IN_PROGRESS", // Use uppercase enum values
      department: "OTHER", // Default department
    },
  });

  const fetchGalleryProjects = useCallback(async () => {
    try {
      const response: IProject[] = await Service.getGallery();
      const mappedData: GalleryProjectFrontend[] = response.map((item) => ({
        id: item.id,
        title: item.title,
        department: item.department,
        description: item.description,
        location: item.location,
        type: item.type,
        technologyused: item.technologyused,
        status: item.status,
        images: item.images,
        file: [], // Provide an empty array to satisfy the required 'file' property, as it's for new uploads
        onUpdateSuccess: handleUpdateGalleryItem,
        onDeleteSuccess: handleDeleteGalleryItem,
      }));
      setGallery(mappedData);
    } catch (error) {
      console.error("Error fetching gallery projects:", error);
      alert("Failed to fetch gallery data. Please try again later.");
      setGallery([]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setUploadProgress(new Array(files.length).fill(0)); // Initialize progress for new files
    } else {
      setSelectedFiles([]);
      setUploadProgress([]);
    }
  };

  const onSubmit: SubmitHandler<IProjectFormInput> = async (data) => {
    if (selectedFiles.length === 0) {
      alert("Please upload at least one image file");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("type", data.type);
      formData.append("department", data.department); // Ensure department is appended
      formData.append("technologyused", data.technologyused);
      formData.append("status", data.status);

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      await Service.createGallery(formData);

      fetchGalleryProjects(); // Re-fetch all projects to update the list
      setOpen(false); // Close the modal
      reset(); // Reset form fields to default values
      setSelectedFiles([]); // Manually clear selected files state
      alert("Gallery project added successfully!");
    } catch (error) {
      console.error("Error adding gallery project:", error);
      alert("Something went wrong while adding the gallery project.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateGalleryItem = useCallback(
    (updatedItem: GalleryProjectFrontend) => {
      setGallery((prevGallery) =>
        prevGallery.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    },
    []
  );

  const handleDeleteGalleryItem = useCallback((deletedId: string) => {
    setGallery((prevGallery) =>
      prevGallery.filter((item) => item.id !== deletedId)
    );
  }, []);

  useEffect(() => {
    document.title = "Admin | Gallery - Whiteboard";
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchGalleryProjects();
    } else {
      setIsAuthenticated(false);
    }
    setIsLoadingAuth(false);
  }, [fetchGalleryProjects]);

  const header: HeaderProp = {
    head: "Gallery Management",
  };

  if (isLoadingAuth) {
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  function removeFile(index: number): void {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadProgress((prevProgress) => prevProgress.filter((_, i) => i !== index));
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setOpen(false);
          reset();
          setSelectedFiles([]);
          setUploadProgress([]);
          setIsUploading(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-lg flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold">
                  Add New Gallery Project
                </Dialog.Title>
                <button
                  onClick={() => {
                    setOpen(false);
                    reset();
                    setSelectedFiles([]);
                    setUploadProgress([]);
                    setIsUploading(false);
                  }}
                  className="text-gray-400 hover:text-gray-800"
                  disabled={isUploading}
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Project Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        {...register("title", {
                          required: "Project Title is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter project title"
                        disabled={isUploading}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Description *
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        {...register("description", {
                          required: "Description is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter project description"
                        disabled={isUploading}
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        {...register("location", {
                          required: "Location is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Project location"
                        disabled={isUploading}
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        {...register("type")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isUploading}
                      >
                        <option value="OTHER">Select project type</option>{" "}
                        {/* Set a default value */}
                        <option value="INSTITUTE">Institute</option>
                        <option value="COMMERCIAL">Commercial</option>
                        <option value="FACILITY_EXPENSION">
                          Facility Expension
                        </option>
                        <option value="INDUSTRIAL">Industrial</option>
                        <option value="OTHER">Other</option>
                      </select>

                      {errors.type && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.type.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="department"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Department
                      </label>
                      <select
                        id="department"
                        {...register("department")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isUploading}
                      >
                        <option value="OTHER">Select department</option>{" "}
                        {/* Set a default value */}
                        <option value="PEMB">PEMB</option>
                        <option value="STRUCTURAL">Structural</option>
                        <option value="OTHER">Other</option>
                      </select>

                      {errors.department && ( // Check for department errors
                        <p className="mt-1 text-sm text-red-500">
                          {errors.department.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {" "}
                    <div>
                      <label
                        htmlFor="technologyUsed"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Software/Technologies Used *
                      </label>
                      <input
                        type="text"
                        id="technologyUsed"
                        {...register("technologyused", {
                          required: "Technologies Used is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Tekla, SDS-2"
                        disabled={isUploading}
                      />
                      {errors.technologyused && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.technologyused.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="projectStatus"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Project Status
                      </label>
                      <select
                        id="projectStatus"
                        {...register("status")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isUploading}
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
                        htmlFor="images"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Project Images * (Multiple files supported)
                      </label>
                      <input
                        type="file"
                        name="images"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isUploading}
                      />
                      {selectedFiles.length === 0 && (
                        <p className="mt-1 text-sm text-red-500">
                          At least one image is required.
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Select multiple images to upload for this project
                      </p>
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-700">
                          Selected Files ({selectedFiles.length})
                        </h4>
                        <div className="space-y-2 overflow-y-auto max-h-32">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 rounded bg-gray-50"
                            >
                              <div className="flex-1">
                                <span className="block text-sm text-gray-800 truncate">
                                  {file.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                                {isUploading && (
                                  <div className="mt-1">
                                    <div className="bg-gray-200 rounded-full h-1.5">
                                      <div
                                        className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                                        style={{
                                          width: `${
                                            uploadProgress[index] || 0
                                          }%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              {!isUploading && (
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="ml-2 text-red-500 hover:text-red-700"
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
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Overall Upload Progress */}
                    {isUploading && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            Uploading images...
                          </span>
                          <span className="text-sm text-gray-600">
                            {uploadProgress.filter((p) => p === 100).length} /{" "}
                            {selectedFiles.length} completed
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 transition-all duration-300 bg-green-600 rounded-full"
                            style={{
                              width: `${
                                (uploadProgress.filter((p) => p === 100)
                                  .length /
                                  selectedFiles.length) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center pt-4 mt-6 space-x-4 border-t">
                  <button
                    type="submit"
                    disabled={isUploading || selectedFiles.length === 0}
                    className="px-6 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isUploading ? "Uploading..." : "Add Gallery Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      reset();
                      setSelectedFiles([]);
                      setUploadProgress([]);
                      setIsUploading(false);
                    }}
                    disabled={isUploading}
                    className="px-6 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Main Gallery Section */}
      <section className="w-full grid grid-cols-[20%_80%]">
        <div style={{ minHeight: "95.2vh" }}>
          <Sidebar />
        </div>
        <div className="flex flex-col flex-wrap">
          <Header {...header} />
          <div className="flex flex-row flex-wrap items-center justify-between m-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Gallery Management
            </h1>{" "}
            <button
              className="px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              Add New Project
            </button>
          </div>

          <div className="mx-4 overflow-hidden bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-500">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                  >
                    Project Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                  >
                    Type & Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                  >
                    Images
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gallery?.map((project) => (
                  <ImagePortfolio
                    key={project.id}
                    {...project}
                    onUpdateSuccess={handleUpdateGalleryItem}
                    onDeleteSuccess={handleDeleteGalleryItem}
                  />
                ))}
                {gallery?.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No gallery projects found. Add your first project to get
                      started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      </>
    );
  };
  
  export default AdminGallery;
