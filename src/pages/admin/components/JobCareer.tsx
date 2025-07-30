import { Dialog } from "@headlessui/react";
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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleEditClick = (jobItem: JobPortalInterface) => {
    setSelectedJob(jobItem);
    setOpenJob(true);
  };
  console.log(selectedJob)

  const handleUpdate = async (data: JobPortalInterface) => {
    if (!selectedJob) return;
    const formData = new FormData();
    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);
    formData.append("status", data.status ? "active" : "inactive");

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

  return (
    <>
      {/* Modal to Edit Job */}
      <Dialog
        open={isOpenJob}
        onClose={() => setOpenJob(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed w-screen overflow-y-auto inset-1">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="flex flex-col w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  Edit Job Role: {selectedJob?.Role}
                </Dialog.Title>
                <button
                  onClick={() => setOpenJob(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {selectedJob && (
                <JobForm
                  selectedJob={selectedJob}
                  onSubmit={handleUpdate}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>

      {/* Modal to View PDF */}
      <Dialog
        open={!!pdfUrl}
        onClose={() => setPdfUrl(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded shadow-xl p-4">
            <button
              onClick={() => setPdfUrl(null)}
              className="absolute text-xl font-bold text-gray-600 top-2 right-4 hover:text-red-600"
            >
              ✕
            </button>
            <iframe
              src={pdfUrl ?? ""}
              title="Job Description"
              className="w-full h-full border rounded"
            />
          </div>
        </div>
      </Dialog>

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
                          jobItem.jd[0].path
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
    </>
  );
};

export default JobCareer;
