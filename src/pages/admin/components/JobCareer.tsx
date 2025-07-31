import { useState } from "react";
import { JobPortalResponse, IJobApplication, JobPortalInterface } from "../../../config/interface"; // Ensure correct imports
import Service from "../../../config/service"; // Adjust path as necessary
// Assuming JobForm exists at this path and is compatible with JobPortalResponse/JobFormValues
import JobForm from "./JobForm";

interface JobCareerProps {
  job: JobPortalResponse[]; // Expecting JobPortalResponse array directly
  onJobChange: () => void; // Callback to trigger re-fetch in parent AdminCareer
}

// --- ApplicantsModal Component (defined within this file for simplicity) ---
interface ApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  applicants: IJobApplication[];
  onDeleteApplicant: (jobroleId: string, applicantId: string) => void;
  // You might add an onUpdateApplicantStatus prop here for future functionality
}

const ApplicantsModal: React.FC<ApplicantsModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  applicants,
  onDeleteApplicant,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-[90%] h-[90%] max-w-4xl bg-white rounded-lg shadow-lg p-6 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#6abd45]">
            Applicants for "{jobTitle}"
          </h2>
          <button
            onClick={onClose}
            className="text-3xl leading-none text-gray-400 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {applicants.length === 0 ? (
          <p className="py-10 text-center text-gray-600">
            No applications for this job role yet.
          </p>
        ) : (
          <div className="flex-grow px-6 -mx-6 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Applicant Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {applicant.applicantName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {applicant.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {applicant.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(applicant.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {applicant.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 underline whitespace-nowrap">
                      {applicant.resumeUrl ? (
                        <a
                          href={applicant.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() =>
                          onDeleteApplicant(applicant.jobId, applicant.id)
                        }
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                      {/* Add an "Edit Status" or "View Full Details" button here */}
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
  console.log("JobCareer pdfUrl:", pdfUrl);

  // States for Applicants Modal
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [applicantsForSelectedJob, setApplicantsForSelectedJob] = useState<
    IJobApplication[]
  >([]);
  const [currentJobTitleForApplicants, setCurrentJobTitleForApplicants] =
    useState("");

  const handleEditClick = (jobItem: JobPortalInterface) => {
    setSelectedJob(jobItem);
    setOpenJob(true);
  };

  const handleUpdate = async (data: JobPortalInterface) => {
    // Expect JobPortalInterface for update logic
    if (!selectedJob) return;

    const formData = new FormData();
    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);
    // Convert boolean status from JobForm (if it outputs boolean) to "active"/"inactive" string for API
    formData.append("status", data.status ? "active" : "inactive");

    // Handle JD file if it's being updated via the form.
    // If your JobForm provides a new FileList for `jd` on update, you'd handle it here.
    // For simplicity, this example assumes `data.jd` is the URL string from the original data,
    // or you'd pass a separate file input from JobForm.
    // Example for a new file upload in JobForm for updates:
    // if (data.newJdFile && data.newJdFile instanceof FileList && data.newJdFile.length > 0) {
    //   formData.append("jd", data.newJdFile[0]);
    // }

    try {
      setLoading(true);
      await Service.editJob(String(selectedJob.id), formData); // Convert number ID to string
      alert("Job updated successfully");
      setOpenJob(false);
      onJobChange(); // Trigger re-fetch of jobs in parent
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
      await Service.deleteJob(id); // Pass string ID to Service
      alert("Job deleted successfully");
      onJobChange(); // Trigger re-fetch of jobs in parent
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
      const applicants = await Service.getCareersApplicants(jobroleId);
      setApplicantsForSelectedJob(applicants);
      setCurrentJobTitleForApplicants(jobTitle);
      setApplicantsForSelectedJob(applicants);
      setCurrentJobTitleForApplicants(jobTitle);
      setIsApplicantsModalOpen(true);
      alert("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplicant = async (
    jobroleId: string,
    applicantId: string
  ) => {
    if (!window.confirm("Are you sure you want to delete this applicant?"))
      return;
    try {
      setLoading(true);
      await Service.deleteapplication(jobroleId, applicantId);
      alert("Applicant deleted successfully!");
      // Re-fetch applicants for the current job to update the modal
      await handleViewApplicants(jobroleId, currentJobTitleForApplicants);
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#6abd45] text-white">
          <tr>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Location</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Qualification</th>
            <th className="px-6 py-3 text-left">View PDF</th>
            <th className="px-6 py-3 text-center">Actions</th>
            <th className="px-6 py-3 text-center">Applicants</th>{" "}
            {/* New Column */}
          </tr>
        </thead>
        <tbody>
          {job.map((jobItem) => (
            <tr key={jobItem.id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{jobItem.Role}</td>
              <td className="px-6 py-4">{jobItem.location}</td>
              <td className="px-6 py-4">{jobItem.type}</td>
              <td className="px-6 py-4">{jobItem.qualification}</td>
              <td className="px-6 py-4">
                {jobItem.jd ? ( // `jd` is now directly the URL string from JobPortalResponse
                  <button
                    // Assuming VITE_IMG_URL is the base URL for your static files/PDFs
                    onClick={() =>
                      setPdfUrl(`${import.meta.env.VITE_IMG_URL}${jobItem.jd[0]?.path}`)
                    }
                    className="text-blue-600 underline hover:text-blue-800"
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
                      id: Number(jobItem.id),
                      status: jobItem.status === "active" ? true : false,
                      jd: jobItem.jd ? [jobItem.jd] : [], // Ensure jd is an array as required by JobPortalInterface
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

      {/* Modal for editing job */}
      {isOpenJob && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-full max-w-4xl p-6 bg-white rounded shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Edit Job Role: {selectedJob.Role}
              </h2>
              <button
                onClick={() => setOpenJob(false)}
                className="text-gray-400 hover:text-gray-800"
              >
                x
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
