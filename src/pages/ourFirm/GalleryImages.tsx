import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Service from "../../config/service";
import { ImageModal } from "./ImagePopup";

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
  };

  const [searchParams] = useSearchParams();
  const department = searchParams.get("department") || "";

  const [galleryImg, setGalleryImg] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectID, setSelectedProjectID] = useState<string | null>(
    null
  );

  const fetchProjects = useCallback(() => {
    async function fetchData() {
      if (!department) {
        setGalleryImg([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const res = await Service.getGalleryByDepartment(department);
        setGalleryImg(
          (res ?? []).map((item: any) => ({
            projectId: item.projectId ?? item.id ?? "",
            projectTitle: item.projectTitle ?? item.title ?? "",
            file: item.file,
            projectDescription:
              item.projectDescription ?? item.description ?? "",
            projectLocation: item.projectLocation ?? "",
            projectType: item.projectType ?? "",
            technologyUsed: item.technologyused ?? "",
            department: item.department ?? department,
          }))
        );
      } catch (err) {
        console.error("Error fetching gallery:", err);
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

  const openModal = (project: Project) => {
    setSelectedProjectID(project.projectId);
  };

  const closeModal = () => {
    setSelectedProjectID(null);
  };

  // Helper to group projects by technology
  const groupByTechnology = (galleryImg: Project[]) => {
    console.log("Grouping projects by technology:", galleryImg);
    const groups: { [tech: string]: Project[] } = {};
    galleryImg.forEach((proj) => {
      const tech = proj.technologyUsed?.trim() || "Other";
      if (!groups[tech]) groups[tech] = [];
      groups[tech].push(proj);
    });
    return groups;
  };

  const techGroups = groupByTechnology(galleryImg);

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
          {department} PROJECTS
        </h2>

        {Object.keys(techGroups).map((tech) => (
          <div key={tech} className="mb-10">
            {department === "PEMB" ? null : (
              
            <h3 className="mb-4 text-2xl font-semibold text-gray-700">
              {tech}
            </h3>
            )}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {techGroups[tech].map((project) => (
                <div
                  key={project.projectId}
                  className="relative overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md cursor-pointer group hover:scale-105 hover:z-10"
                  onClick={() => openModal(project)}
                >
                  <img
                    src={project.file?.secureUrl || ""}
                    alt={project.projectTitle}
                    loading="lazy"
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-green-950 transition-opacity rounded-lg opacity-0 group-hover:opacity-95 bg-[#6abd45] bg-opacity-90">
                    <h3 className="text-lg font-semibold break-words whitespace-normal text-center max-w-full">
                      {project.projectTitle}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {selectedProjectID && (
          <ImageModal
            projectID={selectedProjectID}
            onClose={closeModal}
            imageList={[]}
            title={""}
            location={""}
            softwareUsed={""}
            projectType={""}
            ProjectStatus={""}
            initialIndex={0}
          />
        )}
      </div>
    </section>
  );
}

export default GalleryImages;
