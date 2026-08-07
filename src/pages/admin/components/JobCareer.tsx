import { useState,useEffect } from "react";
import {
  JobPortalResponse,
  IJobApplication,
  JobPortalInterface,
} from "../../../config/interface"; 
import Service from "../../../config/service"; 
import JobForm from "./JobForm";

interface JobCareerProps {
  job: JobPortalResponse[]; 
  onJobChange: () => void;
}


interface ApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  applicants: IJobApplication[];
  onDeleteApplicant: (jobroleId: string, applicantId: string) => void;
}

const ApplicantsModal: React.FC<ApplicantsModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  applicants,
  onDeleteApplicant,
}) => {

  const [localApplicants, setLocalApplicants] = useState<IJobApplication[]>([]);
  useEffect(() => {
    setLocalApplicants(applicants);
  }, [applicants, isOpen]);

  
  const updateStatus = async (
    jobroleId: string,
    applicantId: string,
    status: boolean
  ) => {
   
    setLocalApplicants((apps) =>
      apps.map((app) => (app.id === applicantId ? { ...app, status } : app))
    );
    try {
      await Service.updateJobApplicationStatus(jobroleId, applicantId, status);
     
    } catch (error) {
      console.error("Error updating applicant status:", error);
      setLocalApplicants((apps) =>
        apps.map((app) =>
          app.id === applicantId ? { ...app, status: !status } : app
        )
      );
      alert("Failed to update applicant status.");
    }
  };

  
  if (!isOpen) return null;
console.log("ApplicantsModal props:", { jobTitle, applicants });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-7xl h-[85vh] bg-white rounded-xl shadow-2xl p-6 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-150 pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
            Applicants for <span className="text-[#6abd45]">"{jobTitle}"</span>
          </h2>
          <button
            onClick={onClose}
            className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
          >
            Close
          </button>
        </div>

        {applicants.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-center text-gray-500 font-medium">
              No applications for this job role yet.
            </p>
          </div>
        ) : (
          <div className="flex-grow overflow-auto border border-gray-200 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 z-10 text-black bg-[#6abd45]">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Applicant Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">
                    Contacted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {localApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {applicant.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      <a href={`mailto:${applicant.email}`} className="hover:text-[#6abd45] hover:underline font-medium">
                        {applicant.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      <a href={`tel:${applicant.phone}`} className="hover:text-[#6abd45] hover:underline font-medium">
                        {applicant.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(applicant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        applicant.status 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-yellow-50 text-yellow-700 border border-yellow-255"
                      }`}>
                        {applicant.status ? "Contacted" : "Not Contacted"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {applicant.resume ? (
                        <a
                          href={`${import.meta.env.VITE_IMG_URL}${
                            applicant.resume[0]?.path
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#6abd45] hover:underline font-semibold"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          View PDF
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() =>
                          onDeleteApplicant(applicant.jbroleId, applicant.id)
                        }
                        className="px-2.5 py-1 text-xs text-red-650 border border-red-200 rounded hover:bg-red-50 hover:border-red-500 transition-colors font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <input
                        type="checkbox"
                        name={`applicant-${applicant.id}`}
                        id={`applicant-${applicant.id}`}
                        checked={applicant.status}
                        onChange={(e) =>
                          updateStatus(applicant.jbroleId, applicant.id, e.target.checked)
                        }
                        className="w-4.5 h-4.5 text-[#6abd45] border-gray-300 rounded focus:ring-[#6abd45] cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
// --- End ApplicantsModal Component ---

export const JobCareer = ({ job, onJobChange }: JobCareerProps) => {
  const [isOpenJob, setOpenJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPortalInterface | null>(
    null
  ); // State holds JobPortalInterface
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // PDF URL is a string

  // States for Applicants Modal
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [applicantsForSelectedJob, setApplicantsForSelectedJob] = useState<
    IJobApplication[]
  >([]);
  const [currentJobTitleForApplicants, setCurrentJobTitleForApplicants] =
    useState("");

  const handleEditClick = (jobItem: JobPortalInterface) => {
    console.log("Editing job:", jobItem);
    setSelectedJob(jobItem);
    setOpenJob(true);
  };

  const handleUpdate = async (data: JobPortalInterface & { jdFile?: FileList }) => {
    // Expect JobPortalInterface for update logic
    if (!selectedJob) return;
    console.log("Updating job with data:", selectedJob);
    const formData = new FormData();
    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);
    formData.append("status", data.status ? "true" : "false");

    if (data.jdFile && data.jdFile.length > 0) {
      formData.append("jd", data.jdFile[0]);
    }

    try {
      setLoading(true);
      await Service.editJob(selectedJob.id, formData); 
      alert("Job updated successfully");
      setOpenJob(false);
      onJobChange(); 
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Expect string ID
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setLoading(true);
      await Service.deleteJob(id); 
      alert("Job deleted successfully");
      onJobChange(); 
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  // --- Logic for Applicants ---
  const handleViewApplicants = async (jobroleId: string, jobTitle: string) => {
    try {
      setLoading(true);
      console.log("Fetching applicants for job role:", jobroleId);
      const applicants = await Service.getCareersApplicants(jobroleId);
      setApplicantsForSelectedJob(applicants);
      setCurrentJobTitleForApplicants(jobTitle);
      setIsApplicantsModalOpen(true);
      alert("Fetched applicants successfully.");
    } catch (error) {
      console.error("Error fetching applicants:", error);
      alert("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplicant = async (
    jobroleId: string,
    applicantId: string
  ) => {
    console.log("Deleting applicant:", jobroleId, applicantId);
    if (!window.confirm("Are you sure you want to delete this applicant?"))
      return;
    try {
      setLoading(true);
      console.log("Deleting applicant:", jobroleId, applicantId);
      await Service.deleteapplication(jobroleId, applicantId);
      alert("Applicant deleted successfully!");
      // Directly fetch applicants and update state
      const applicants = await Service.getCareersApplicants(jobroleId);
      setApplicantsForSelectedJob(applicants);
    } catch (error) {
      console.error("Error deleting applicant:", error);
      alert("Failed to delete applicant.");
    } finally {
      setLoading(false);
    }
  };
  // --- End Logic for Applicants ---

  return (
    <>
      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-[90%] h-[90%] bg-white rounded-lg shadow-lg p-4">
            <button
              onClick={() => setPdfUrl(null)}
              className="absolute text-xl font-bold text-gray-700 top-3 right-3 hover:text-red-600"
            >
              &times;
            </button>
            <iframe
              src={pdfUrl}
              title="Job PDF Viewer"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}

      {/* Job Listing Table */}
      <div className="overflow-auto border border-gray-200 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-black bg-[#6abd45]">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">Qualification</th>
              <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">View PDF</th>
              <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">Actions</th>
              <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">Applicants</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {job.map((jobItem) => (
              <tr key={jobItem.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 font-semibold text-gray-800">{jobItem.Role}</td>
                <td className="px-6 py-4 text-gray-600">{jobItem.location}</td>
                <td className="px-6 py-4 text-gray-600">{jobItem.type}</td>
                <td className="px-6 py-4 text-gray-600">{jobItem.qualification}</td>
                <td className="px-6 py-4">
                  {jobItem.jd ? ( // `jd` is now directly the URL string from JobPortalResponse
                    <button
                      // Assuming VITE_IMG_URL is the base URL for your static files/PDFs
                      onClick={() =>
                        setPdfUrl(
                          `${import.meta.env.VITE_IMG_URL}${jobItem.jd[0]?.path}`
                        )
                      }
                      className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors font-medium"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400">No PDF</span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2 text-center">
                  <button
                    className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    onClick={() =>
                      handleEditClick({
                        ...jobItem,
                        id: String(jobItem.id),
                        status: jobItem.status === true ? true : false,
                        jd: jobItem.jd ? [jobItem.jd] : [], 
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                    onClick={() => handleDelete(jobItem.id)} // Pass string ID
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </td>
                {/* New Column Data for Applicants */}
                <td className="px-6 py-4 text-center">
                  <button
                    className="px-2 py-1 text-sm text-green-600 border border-green-600 rounded hover:bg-green-50"
                    onClick={() => handleViewApplicants(jobItem.id, jobItem.Role)}
                    disabled={loading}
                  >
                    View Applicants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing job */}
      {isOpenJob && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-150 pb-4 mb-4">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                Edit Job Role: <span className="text-[#6abd45]">{selectedJob.Role}</span>
              </h2>
              <button
                onClick={() => setOpenJob(false)}
                className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
              >
                Close
              </button>
            </div>
            {/* JobForm should be designed to take and return JobPortalResponse for updates */}
            <JobForm
              selectedJob={selectedJob}
              onSubmit={handleUpdate}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Applicants Modal */}
      <ApplicantsModal
        isOpen={isApplicantsModalOpen}
        onClose={() => setIsApplicantsModalOpen(false)}
        jobTitle={currentJobTitleForApplicants}
        applicants={applicantsForSelectedJob}
        onDeleteApplicant={handleDeleteApplicant}
      />
    </>
  );
};

export default JobCareer;
