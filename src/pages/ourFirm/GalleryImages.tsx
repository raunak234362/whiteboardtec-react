import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Service from "../../config/service";
import { ImageModal } from "./ImagePopup"; // Or your filename for ImageModal

function GalleryImages() {
  type Project = {
    projectId: string;
    projectTitle: string;
    file?: {
      secureUrl?: string;
    };
    projectDescription?: string;
    projectLocation?: string;
    projectType?: string;
    technologyUsed?: string;
    department?: string;
    // Add other fields as needed
  };

  const [searchParams] = useSearchParams();
  const department = searchParams.get("department") || ""; // read from URL

  const [galleryImg, setGalleryImg] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProjectsByDepartment = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const allProjects = await Service.getGalleryByDepartment(
        department ?? ""
      );
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
    fetchProjects();
  }, [fetchProjects]);

  const openProjectDetailsModal = (project: IProject) => {
    // Convert `file.secureUrl` to an array so the carousel works
    const projectWithImages = {
      ...project,
      images:
        project.images && project.images?.length > 0
          ? project.images
          : typeof project.file === "object" &&
            !Array.isArray(project.file) &&
            (project.file as { secureUrl?: string })?.secureUrl
          ? [(project.file as { secureUrl: string }).secureUrl]
          : [],
    };
    setSelectedProject(projectWithImages);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProjectID(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600">
        {department
          ? `Loading ${department} projects...`
          : "Please select a department."}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 text-red-500">
        {error}
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        No department selected.
      </div>
    );
  }

  return (
    <section className="min-h-screen px-5 py-10 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          {department} PROJECTS
        </h2>
        
        {
          galleryImg?.length === 0 && (
            <div className="flex items-center justify-center h-48">
              <p className="text-gray-500">No projects found for {department}.</p>
            </div>
          )
        }
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryImg?.map((project) => (
            <div
              key={project.projectId}
              className="relative overflow-hidden transition-transform transform bg-white rounded-lg shadow-md cursor-pointer group hover:scale-105"
              onClick={() => openModal(project)}
            >
              <img
                src={project.file?.secureUrl || ""}
                alt={project.projectTitle}
                loading="lazy"
                className="object-cover w-full h-48"
              />
              {/* Hover details */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white transition-opacity bg-black rounded-lg opacity-0 bg-opacity-60 group-hover:opacity-100">
                <h3 className="text-lg font-semibold truncate">
                  {project.projectTitle}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {selectedProjectID && (
          <ImageModal projectID={selectedProjectID} onClose={closeModal} imageList={[]} title={""} location={""} softwareUsed={""} projectType={""} ProjectStatus={""} initialIndex={0} />
        )}
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
            {selectedProject?.images && selectedProject.images?.length > 0 && (
              <div className="relative mb-4">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                  className="object-contain w-full h-auto rounded-lg max-h-96"
                />
                {selectedProject.images?.length > 1 && (
                  <>
                    <button
                      className="absolute left-0 p-2 transform -translate-y-1/2 bg-white rounded-full shadow top-1/2 bg-opacity-70 hover:bg-opacity-100"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? selectedProject.images
                              ? selectedProject.images?.length - 1
                              : 0
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
                          selectedProject.images &&
                          prev === selectedProject.images?.length - 1
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
                  {currentImageIndex + 1} / {selectedProject.images?.length}
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
