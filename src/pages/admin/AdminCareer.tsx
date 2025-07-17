import { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar } from "./components";
import JobCareer from "./components/JobCareer";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Service from "../../config/service";
import { ApiResponse, JobPortalResponse } from "../../config/interface";

function AdminCareer() {
  const { register, handleSubmit, reset } = useForm<JobPortalResponse>();
  const [gettingdata, setGettingData] = useState<JobPortalResponse[]>([]);
  const [jd, setJD] = useState<FileList | null>(null);
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [isOpen, setOpen] = useState(false);

  const header: HeaderProp = {
    head: "Career",
  };

  // 🚀 Fetch all jobs
  const fetchJob = async () => {
    try {
      const response = await Service.getJob();
      console.log("Fetched Jobs:", response);
      setGettingData(response); // Update the state with API response
      console.log("Fetched Jobs:", response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setGettingData([]); // Set to empty array on error
    }
  };

  // ✅ Run fetchJob on mount
  useEffect(() => {
    fetchJob();
  }, []);

  // 📝 Submit new job
  const JobForm = async (data: JobPortalResponse) => {
    console.log("Form data:", data);

    const formData = new FormData();
    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);
    formData.append("status", status ? "active" : "inactive");

    // Append JD file
    if (jd && jd.length > 0) {
      Array.from(jd).forEach((file: File) => {
        formData.append("jd", file);
      });
    }

    try {
      const response = await Service.JobPortal(formData);
      console.log("API Response:", response);

      alert("Job added successfully!");

      await fetchJob(); // Refresh the job list
      setOpen(false); // Close modal
      reset(); // Reset form fields
      setJD(null); // Clear file input
      setStatus(false); // Reset status checkbox
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading");
    }
  };

  return (
    <>
      {/* Modal for adding a job */}
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed w-screen overflow-y-auto inset-1">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="flex flex-col w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  Add New Job Role
                </Dialog.Title>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(JobForm)}>
                <table className="mx-10 mt-4 border-separate border-spacing-y-4">
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="Role" className="text-sm text-gray-800">
                          Role
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Role"
                          {...register("Role", {
                            required: "Role is required",
                          })}
                          className="w-full px-2 mx-4 border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="Location"
                          className="text-sm text-gray-800"
                        >
                          Location
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Location"
                          {...register("location", {
                            required: "Location is required",
                          })}
                          className="w-full px-2 mx-4 border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="Type" className="text-sm text-gray-800">
                          Type
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Type"
                          {...register("type")}
                          className="w-full px-2 mx-4 border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="Qualification"
                          className="text-sm text-gray-800"
                        >
                          Qualification
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Qualification"
                          {...register("qualification", {
                            required: "Qualification is required",
                          })}
                          className="w-full px-2 mx-4 border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="JD" className="text-sm text-gray-800">
                          Job Description (PDF)
                        </label>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="JD"
                          accept=".pdf"
                          multiple
                          onChange={(e) => setJD(e.target.files)}
                          className="w-full mx-4 border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="Active"
                          className="text-sm text-gray-800"
                        >
                          Status
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="Active"
                          checked={status}
                          onChange={() => setStatus(!status)}
                          className="mx-4 border-2 border-gray-200 rounded-md"
                        />
                        {status ? (
                          <span className="text-[#6abd45]">Active</span>
                        ) : (
                          <span className="text-red-600">Inactive</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 mx-3 text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Add Job
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 mx-3 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Main Page Layout */}
      <section className="w-full grid grid-cols-[20%_80%]">
        <div style={{ minHeight: "95.2vh" }}>
          <Sidebar />
        </div>
        <div className="flex flex-col">
          <Header {...header} />
          <div className="flex justify-between m-4">
            <h1 className="text-lg font-semibold">
              List of Current Job Openings
            </h1>
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300"
            >
              Add New
            </button>
          </div>

          {/* Job Listings Table */}
          <div className="mx-4">
            {gettingdata && gettingdata.length > 0 ? (
              <JobCareer job={gettingdata} />
            ) : (
              <p className="text-center text-gray-500">
                No job postings found.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminCareer;
