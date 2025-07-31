import { useState } from "react";
import { JobPortalInterface } from "../../../config/interface";
import Service from "../../../config/service";
import JobForm from "./JobForm";

interface JobCareerProps {
  job: JobPortalInterface[];
}

const JobCareer = ({ job }: JobCareerProps) => {
  const [isOpenJob, setOpenJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPortalInterface | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<any | null>(null);

  const handleEditClick = (jobItem: JobPortalInterface) => {
    setSelectedJob(jobItem);
    setOpenJob(true);
  };

  const handleUpdate = async (data: JobPortalInterface) => {
    if (!selectedJob) return;

    const formData = new FormData();
    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);
    formData.append("status", data.status ? "true" : "false");

    try {
      setLoading(true);
      await Service.editJob(selectedJob.id!, formData);
      alert("Job updated successfully");
      setOpenJob(false);
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setLoading(true);
      await Service.deleteJob(id);
      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    } finally {
      setLoading(false);
    }
  };
  console.log("Job data:", job);

  const handleCloseModal = () => setPdfUrl(null);
console.log("PDF File:", job[0].jd?.[0]?.path?.[0]?.path);
  return (
    <>
      {/* PDF Modal (same as WorkPortfolio style) */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-[90%] h-[90%] bg-white rounded-lg shadow-lg p-4">
            <button
              onClick={handleCloseModal}
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
                {jobItem.jd && jobItem.jd.length > 0 ? (
                  <button
                    onClick={() =>
                      setPdfUrl(
                        `${import.meta.env.VITE_IMG_URL}${
                          jobItem.jd?.[0]?.path[0]?.path
                        }`
                      )
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
                  onClick={() => handleEditClick(jobItem)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                  onClick={() => handleDelete(jobItem.id)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing job (unchanged) */}
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
                ✕
              </button>
            </div>
            <JobForm
              selectedJob={selectedJob}
              onSubmit={handleUpdate}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default JobCareer;
