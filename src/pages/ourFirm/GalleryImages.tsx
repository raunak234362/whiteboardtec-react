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
            technologyUsed: item.technologyused?.trim() || "Other", // Ensure Other is set here
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

  const groupByTechnology = (galleryImg: Project[]) => {
    const groups: { [tech: string]: Project[] } = {};
    galleryImg.forEach((proj) => {
      const tech = proj.technologyUsed || "Other"; // 'Other' is already handled in fetchData
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

  // Helper function to render a single technology group's images
  const renderProjectImages = (projects: Project[]) => (
    <div className="grid gap-6 grid-cols-3">
      {projects.map((project) => (
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
  );

  const teklaProjects = techGroups["Tekla Structures"] || [];
  const sds2Projects = techGroups["SDS/2"] || [];

  // Filter out Tekla and SDS/2 from the remaining groups
  const otherTechGroups = Object.keys(techGroups).filter(
    (tech) =>
      tech !== "Tekla Structures" && tech !== "SDS/2" && techGroups[tech].length > 0
  );

  return (
    <section className="min-h-screen px-5 py-10 bg-gray-50">
      <div className="container mx-auto">


        {/* Two-column layout for Tekla and SDS/2 */}
        <div className={`md:grid ${sds2Projects.length > 0 ? "md:grid-cols-2" : "md:grid-cols-1"} md:gap-8 mb-10`}>
          {teklaProjects.length > 0 && (
            <>
              {teklaProjects.length > 0 && (
                <div className="bg-gray-300 h-fit p-2 rounded-lg">
                  {department !== "PEMB" && (
                    <h3 className="mb-4 text-2xl font-semibold text-black">
                      Tekla Structures
                    </h3>
                  )}
                  {department === "PEMB" && (
                    <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
                      {/* {department} PROJECTS */}
                    </h2>
                  )}
                
                  {renderProjectImages(teklaProjects)}
                </div>
              )}
              {sds2Projects.length > 0 ? (
                <div className="bg-gray-300 h-fit p-2 rounded-lg">
                  <h3 className="mb-4 text-2xl font-semibold text-black">
                    SDS/2
                  </h3>
                  {renderProjectImages(sds2Projects)}
                </div>
              ) : null}
            </>
          )}
        </div>
        {/* SDS/2 Column */}

        {/* Render other technology groups below the main two-column layout */}
        {otherTechGroups.map((tech) => (
          <div key={tech} className="mb-10">
            <h3 className="mb-4 text-2xl font-semibold text-gray-700">
              {tech}
            </h3>
            {renderProjectImages(techGroups[tech])}
          </div>
        ))}

        {selectedProjectID && (
          <ImageModal
            projectID={selectedProjectID}
            onClose={closeModal}
            imageList={[]}
            scope=""
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
