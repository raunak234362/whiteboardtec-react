import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
import { Dialog } from "@headlessui/react";
import ImagePortfolio from "./components/ImagePortfolio";
import Service from "../../config/service";
import { useForm, SubmitHandler } from "react-hook-form";

import { IProject, GalleryProjectFrontend } from "../../config/interface";

type IProjectFormInput = {
  title: string;
  description: string;
  location: string;
  type: string;
  technologyused: string;
  status: string;
  department: string;
};

// Custom Hook for multiple file uploads
function useMultipleFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setSelectedFiles([]);
  };

  return { selectedFiles, onFileChange, removeFile, clearFiles };
}

const AdminGallery = () => {
  const { selectedFiles, onFileChange, removeFile, clearFiles } =
    useMultipleFileUpload();

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
      type: "OTHER",
      technologyused: "",
      status: "IN_PROGRESS",
      department: "OTHER",
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
        file: [],
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
      formData.append("department", data.department);
      formData.append("technologyused", data.technologyused);
      formData.append("status", data.status);

      selectedFiles.forEach((file) => {
        formData.append("images", file); // Append with [] to indicate multiple files
      });

      await Service.createGallery(formData);

      await fetchGalleryProjects();
      setOpen(false);
      reset();
      clearFiles();
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

  if (isLoadingAuth) {
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const header: HeaderProp = { head: "Gallery Management" };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setOpen(false);
          reset();
          clearFiles();
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
                    clearFiles();
                    setIsUploading(false);
                  }}
                  className="text-gray-400 hover:text-gray-800"
                  disabled={isUploading}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Left column */}
                  <div className="space-y-4">
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Project Title *
                      </span>
                      <input
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
                    </label>
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Description *
                      </span>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter project description"
                        disabled={isUploading}
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </label>
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Location *
                      </span>
                      <input
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
                    </label>
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Project Type
                      </span>
                      <select
                        {...register("type")}
                        disabled={isUploading}
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
                      {errors.type && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.type.message}
                        </p>
                      )}
                    </label>
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Department
                      </span>
                      <select
                        {...register("department")}
                        disabled={isUploading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="OTHER">Other</option>
                        <option value="PEMB">PEMB</option>
                        <option value="STRUCTURAL">Structural</option>
                      </select>
                      {errors.department && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.department.message}
                        </p>
                      )}
                    </label>
                  </div>
                  {/* Right column */}
                  <div className="space-y-4">
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Software / Technologies Used *
                      </span>
                      <input
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
                    </label>
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Project Status
                      </span>
                      <select
                        {...register("status")}
                        disabled={isUploading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="PLANNING">Planning</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ON_HOLD">On Hold</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </label>
                    <label>
                      <span className="block mb-1 text-sm font-medium text-gray-700">
                        Project Images * (Multiple files supported)
                      </span>
                      <input
                        type="file"
                        name="images"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={onFileChange}
                        disabled={isUploading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {selectedFiles.length === 0 && (
                        <p className="mt-1 text-sm text-red-500">
                          At least one image is required.
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Select multiple images to upload for this project
                      </p>
                    </label>
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 space-y-2 overflow-y-auto max-h-32">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded bg-gray-50"
                          >
                            <div>
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
                                        width: `${uploadProgress[index] || 0}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            {!isUploading && (
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                                aria-label="Remove file"
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
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {isUploading && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                          <span>Uploading images...</span>
                          <span>
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
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-center pt-6 space-x-4 border-t">
                  <button
                    type="submit"
                    disabled={isUploading || selectedFiles.length === 0}
                    className="px-6 py-2 text-white transition bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isUploading ? "Uploading..." : "Add Gallery Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      reset();
                      clearFiles();
                      setIsUploading(false);
                    }}
                    disabled={isUploading}
                    className="px-6 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Main section */}
      <section className="w-full grid grid-cols-[20%_80%] min-h-screen">
        <aside
          className="text-white bg-gray-900 border-r border-gray-300"
          style={{ minHeight: "100vh" }}
        >
          <Sidebar />
        </aside>
        <main className="flex flex-col overflow-auto">
          <Header {...header} />
          <div className="flex flex-row flex-wrap items-center justify-between m-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Gallery Management
            </h1>
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 text-white transition bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add New Project
            </button>
          </div>

          <div className="mx-4 overflow-hidden bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-500">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
                    Project Details
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
                    Type & Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
                    Images
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gallery.map((project) => (
                  <ImagePortfolio
                    key={project.id}
                    {...project}
                    onUpdateSuccess={handleUpdateGalleryItem}
                    onDeleteSuccess={handleDeleteGalleryItem}
                  />
                ))}
                {gallery.length === 0 && (
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
        </main>
      </section>
    </>
  );
};

export default AdminGallery;
