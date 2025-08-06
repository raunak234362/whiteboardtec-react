import { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar } from "./components";
import { JobCareer } from "./components/JobCareer"; 
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Service from "../../config/service"; // Path to your Service.ts file
import { JobPortalResponse } from "../../config/interface"; // Path to your interface.ts file

function AdminCareer() {
  // useForm is typed with JobPortalResponse for consistency with API payload
  const { register, handleSubmit, reset } = useForm<JobPortalResponse>();
  const [gettingdata, setGettingData] = useState<JobPortalResponse[]>([]);
  const [jd, setJD] = useState<FileList | null>(null); // State for the file input
  const [status, setStatus] = useState(true); // State for the status checkbox
  const [isOpen, setOpen] = useState(false); // State for the Add New Job modal

  const header: HeaderProp = {
    head: "Career",
  };

  /**
   * Fetches all job roles from the backend.
   * This function is also passed to JobCareer to trigger re-fetching after modifications.
   */
  const fetchJob = async () => {
    try {
      const response = await Service.getJob();
      console.log("Fetched Jobs:", response);
      setGettingData(response); // Update the state with API response
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setGettingData([]); // Set to empty array on error to prevent issues
    }
  };

  // ✅ Run fetchJob on component mount to load initial job data
  useEffect(() => {
    fetchJob();
  }, []);

  /**
   * Handles the submission of the new job form.
   * @param data The form data collected by react-hook-form.
   */
  const handleJobFormSubmit = async (data: JobPortalResponse) => {
    console.log("Form data for new job:", data);

    const formData = new FormData();
    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);
    // Convert boolean status from the checkbox to "active" or "inactive" string for the API
    formData.append("status", status ? "true" : "false");

    // Append the Job Description (JD) file
    if (jd && jd.length > 0) {
      // Assuming your backend expects a single file for 'jd' under this key
      formData.append("jd", jd[0]); // Append the first selected file
    } else {
        // Optionally, handle cases where JD is required but not provided
        // alert("Job Description PDF is required.");
        // return;
    }

    try {
      const response = await Service.JobPortal(formData);
      console.log("API Response for new job:", response);

      alert("Job added successfully!");

      await fetchJob(); // Refresh the job list to show the newly added job
      setOpen(false); // Close the Add New Job modal
      reset(); // Reset the form fields
      setJD(null); // Clear the file input state
      setStatus(true); // Reset the status checkbox to inactive
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Something went wrong while adding the job. Please try again.");
    }
  };

  return (
    <>
      {/* Modal for adding a new job role */}
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" /> {/* Overlay */}
        <div className="fixed w-screen overflow-y-auto inset-1">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="flex flex-col w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-xl font-semibold text-gray-800">
                  Add New Job Role
                </Dialog.Title>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-800"
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
              <form onSubmit={handleSubmit(handleJobFormSubmit)}>
                <table className="mx-10 mt-4 border-separate border-spacing-y-4 w-[calc(100%-80px)]"> {/* Adjusted width for better layout */}
                  <tbody>
                    <tr>
                      <td className="w-1/4 pr-4">
                        <label htmlFor="Role" className="text-sm font-medium text-gray-800">
                          Role:
                        </label>
                      </td>
                      <td className="w-3/4">
                        <input
                          type="text"
                          id="Role"
                          {...register("Role", {
                            required: "Role is required",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Software Engineer"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4">
                        <label htmlFor="Location" className="text-sm font-medium text-gray-800">
                          Location:
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Location"
                          {...register("location", {
                            required: "Location is required",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Bengaluru, India"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4">
                        <label htmlFor="Type" className="text-sm font-medium text-gray-800">
                          Type:
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Type"
                          {...register("type")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Full-time, Remote"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4">
                        <label htmlFor="Qualification" className="text-sm font-medium text-gray-800">
                          Qualification:
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Qualification"
                          {...register("qualification", {
                            required: "Qualification is required",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Bachelor's in CS, 3+ years experience"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4">
                        <label htmlFor="JD" className="text-sm font-medium text-gray-800">
                          Job Description (PDF):
                        </label>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="JD"
                          accept=".pdf"
                          onChange={(e) => setJD(e.target.files)}
                          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4">
                        <label htmlFor="Active" className="text-sm font-medium text-gray-800">
                          Status:
                        </label>
                      </td>
                      <td className="flex items-center">
                        <input
                          type="checkbox"
                          id="Active"
                          checked={status}
                          onChange={() => setStatus(!status)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className={`ml-3 text-base font-semibold ${status ? "text-[#6abd45]" : "text-red-600"}`}>
                          {status ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Add Job
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-6 py-2 text-white transition-colors duration-200 bg-red-600 rounded-md hover:bg-red-700"
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
        <div style={{ minHeight: "95.2vh" }} className="bg-gray-800">
          <Sidebar />
        </div>
        <div className="flex flex-col bg-gray-100">
          <Header {...header} />
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Current Job Openings
            </h1>
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
            >
              + Add New Job
            </button>
          </div>

          {/* Job Listings Table */}
          <div className="p-6">
            {gettingdata && gettingdata.length > 0 ? (
              <JobCareer
                job={gettingdata} // Pass the fetched job data directly
                onJobChange={fetchJob} // Pass fetchJob to allow JobCareer to trigger data refresh
              />
            ) : (
              <p className="py-10 text-lg text-center text-gray-500">
                No job postings found. Click "Add New Job" to create one.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminCareer;