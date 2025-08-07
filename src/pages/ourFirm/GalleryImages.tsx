import { useCallback, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import Service from "../../config/service";
import { IProject } from "../../config/interface";

function GalleryImages() {
  const [searchParams] = useSearchParams();
  const department = searchParams.get("department");

  const [galleryImg, setGalleryImg] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const fetchProjects = useCallback(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const projects = await Service.getGalleryByDepartment(department ?? "");
        setGalleryImg(projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
        setGalleryImg([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [department]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openModal = (project: IProject) => {
    let images: string[] = [];

    if (project.images && project.images.length > 0) {
      images = project.images;
    } else if (
      typeof project.file === "object" &&
      !Array.isArray(project.file) &&
      project.file !== null &&
      "secureUrl" in project.file &&
      typeof (project.file as { secureUrl?: string }).secureUrl === "string"
    ) {
      images = [(project.file as { secureUrl: string }).secureUrl];
    }

    const updatedProject: IProject = {
      ...project,
      images: images,
    };

    setSelectedProject(updatedProject);
    setCurrentIndex(0);
    setIsZoomed(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsZoomed(false);
  };

  const toggleZoom = () => setIsZoomed((z) => !z);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600">
        Loading {department} projects...
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

  if (galleryImg.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        No projects found for {department}.
      </div>
    );
  }

  return (
    <section className="min-h-screen px-5 py-10 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          {department} Projects
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryImg.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden transition-transform transform bg-white rounded-lg shadow-md cursor-pointer group hover:scale-105"
              onClick={() => openModal(project)}
            >
              <img
                src={
                  typeof project.file === "string"
                    ? project.file
                    : Array.isArray(project.file)
                    ? project.file[0] || ""
                    : project.file &&
                      typeof project.file === "object" &&
                      "secureUrl" in project.file
                    ? (project.file as { secureUrl: string }).secureUrl
                    : ""
                }
                alt={project.title}
                loading="lazy"
                className="object-cover w-full h-48"
              />
              {/* Badges */}
              <div className="absolute z-10 flex space-x-2 top-2 left-2">
                {project.type && (
                  <span className="px-2 text-xs font-semibold text-white bg-blue-600 rounded">
                    {project.type}
                  </span>
                )}
                {project.status && (
                  <span
                    className={`text-xs font-semibold rounded px-2 ${
                      project.status.toLowerCase() === "active"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              {/* Hover details */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white transition-opacity bg-black rounded-lg opacity-0 bg-opacity-60 group-hover:opacity-100">
                <h3 className="text-lg font-semibold truncate">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm truncate">
                  {project.location ? `📍 ${project.location}` : ""}
                </p>
                <p className="mt-1 text-xs truncate">
                  Type: {project.type} | Status: {project.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog
          open={!!selectedProject}
          onClose={closeModal}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-70"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-6 overflow-auto">
            <Dialog.Panel
              className="relative w-full max-w-4xl max-h-[90vh] rounded-lg bg-white p-6 shadow-lg flex flex-col items-center overflow-hidden"
              style={{ maxWidth: "90vw" }}
            >
              {/* Carousel */}
              <div className="relative flex justify-center w-full mb-4">
                {selectedProject?.images &&
                selectedProject.images.length > 0 ? (
                  <>
                    <img
                      src={selectedProject.images[currentIndex]}
                      alt={`${selectedProject.title} - ${currentIndex + 1}`}
                      onClick={toggleZoom}
                      className={`cursor-pointer rounded object-contain transition-all duration-300 ${
                        isZoomed ? "max-h-[90vh]" : "max-h-[60vh]"
                      }`}
                      style={{ maxWidth: isZoomed ? "90vw" : "60vw" }}
                    />
                    {/* Prev */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(
                          (prev) =>
                            (prev - 1 + selectedProject.images!.length) %
                            selectedProject.images!.length
                        );
                      }}
                      aria-label="Previous Slide"
                      className="absolute z-30 p-2 -translate-y-1/2 bg-white rounded-full shadow-lg left-4 top-1/2 bg-opacity-70 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      ‹
                    </button>
                    {/* Next */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(
                          (prev) => (prev + 1) % selectedProject.images!.length
                        );
                      }}
                      aria-label="Next Slide"
                      className="absolute z-30 p-2 -translate-y-1/2 bg-white rounded-full shadow-lg right-4 top-1/2 bg-opacity-70 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      ›
                    </button>
                    <div className="absolute w-full text-sm text-center text-gray-600 bottom-2">
                      {currentIndex + 1} / {selectedProject.images.length}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-64 text-gray-500 bg-gray-200 rounded-lg">
                    No images available
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="w-full max-w-full overflow-auto text-center text-gray-800">
                <h2 className="text-2xl font-bold">{selectedProject?.title}</h2>
                <p className="mt-2 whitespace-pre-wrap">
                  {selectedProject?.description || "No description available."}
                </p>
                <div className="grid grid-cols-1 gap-2 mt-4 text-sm text-left sm:grid-cols-2">
                  {selectedProject?.location && (
                    <p>
                      <strong>Location:</strong> {selectedProject.location}
                    </p>
                  )}
                  {selectedProject?.type && (
                    <p>
                      <strong>Type:</strong> {selectedProject.type}
                    </p>
                  )}
                  {selectedProject?.technologyused && (
                    <p className="sm:col-span-2">
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
              </div>
              <button
                onClick={closeModal}
                className="px-6 py-2 mt-6 text-white bg-green-600 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </section>
  );
}

export default GalleryImages;
