import { useEffect, useState, useCallback } from "react";
import Service from "../../config/service";
import { IProject } from "../../config/interface";
import { Dialog } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

function GalleryImages() {
  const [searchParams] = useSearchParams();
  const department = searchParams.get("department");

  const [galleryImg, setGalleryImg] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProjectsByDepartment = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const allProjects = await Service.getGalleryByDepartment(department);
      setGalleryImg(allProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
      setGalleryImg([]);
    } finally {
      setIsLoading(false);
    }
  }, [department]);

  useEffect(() => {
    fetchProjectsByDepartment();
  }, [fetchProjectsByDepartment]);

  const openProjectDetailsModal = (project: IProject) => {
    // Convert `file.secureUrl` to an array so the carousel works
    const projectWithImages = {
      ...project,
      images:
        project.images && project.images.length > 0
          ? project.images
          : project.file?.secureUrl
          ? [project.file.secureUrl]
          : [],
    };
    setSelectedProject(projectWithImages);
    setCurrentImageIndex(0);
  };

  const closeProjectDetailsModal = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-600">Loading {department} projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (galleryImg.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-500">No projects found for {department}.</p>
      </div>
    );
  }

  return (
    <section className="px-5 py-10 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          {department} Projects
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryImg.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-md cursor-pointer hover:scale-105"
              onClick={() => openProjectDetailsModal(project)}
            >
              <img
                src={project.file?.secureUrl}
                alt={project.title}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {project.location && `📍 ${project.location}`}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Type: {project.type} | Status: {project.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject}
        onClose={closeProjectDetailsModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {selectedProject?.title}
              </Dialog.Title>
              <button
                onClick={closeProjectDetailsModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

            {/* Image Carousel */}
            {selectedProject?.images && selectedProject.images.length > 0 && (
              <div className="relative mb-4">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                  className="object-contain w-full h-auto rounded-lg max-h-96"
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-0 p-2 transform -translate-y-1/2 bg-white rounded-full shadow top-1/2 bg-opacity-70 hover:bg-opacity-100"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? selectedProject.images.length - 1
                            : prev - 1
                        )
                      }
                    >
                      ⬅️
                    </button>
                    <button
                      className="absolute right-0 p-2 transform -translate-y-1/2 bg-white rounded-full shadow top-1/2 bg-opacity-70 hover:bg-opacity-100"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === selectedProject.images.length - 1
                            ? 0
                            : prev + 1
                        )
                      }
                    >
                      ➡️
                    </button>
                  </>
                )}
                <div className="mt-2 text-sm text-center text-gray-600">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>
              </div>
            )}

            <p className="mb-4 text-gray-700">{selectedProject?.description}</p>

            <div className="grid grid-cols-1 text-sm text-gray-800 md:grid-cols-2 gap-y-2">
              {selectedProject?.location && (
                <p>
                  <strong>Location:</strong> {selectedProject.location}
                </p>
              )}
              {selectedProject?.type && (
                <p>
                  <strong>Project Type:</strong> {selectedProject.type}
                </p>
              )}
              {selectedProject?.technologyused && (
                <p className="col-span-1 md:col-span-2">
                  <strong>Technology Used:</strong>{" "}
                  {selectedProject.technologyused}
                </p>
              )}
              {selectedProject?.status && (
                <p>
                  <strong>Status:</strong> {selectedProject.status}
                </p>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}

export default GalleryImages;
