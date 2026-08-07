import {  useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar, SubNavbar, useSidebar } from "./components";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Service from "../../config/service";
import { JobPortalResponse } from "../../config/interface";
import JobCareer from "./components/JobCareer";

function AdminCareer() {
  const { isSidebarOpen } = useSidebar();
  // State & hooks
  const { register, handleSubmit, reset } = useForm<JobPortalResponse>();
  const [gettingdata, setGettingData] = useState<JobPortalResponse[]>([]);
  const [jd, setJD] = useState<FileList | null>(null);
  const [status, setStatus] = useState(true);
  const [isOpen, setOpen] = useState(false);

  const header: HeaderProp = {
    head: "Career",
  };

  // Fetch job listings
  const fetchJob = async () => {
    try {
      const response = await Service.getJob();
      setGettingData(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setGettingData([]); // clear on error
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  // Handle Add New Job form submission
  const handleJobFormSubmit = async (data: JobPortalResponse) => {
    const formData = new FormData();

    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);
    formData.append("status", status ? "true" : "false");

    if (jd && jd.length > 0) {
      formData.append("jd", jd[0]);
    }

    try {
      await Service.JobPortal(formData);
      alert("Job added successfully!");
      await fetchJob();
      setOpen(false);
      reset();
      setJD(null);
      setStatus(true);
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Something went wrong while adding the job. Please try again.");
    }
  };

  return (
    <>
      {/* Add New Job Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <Dialog.Panel className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-800">
              Add New Job Role
            </Dialog.Title>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 transition hover:text-gray-800 focus:outline-none"
              aria-label="Close modal"
            >
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleJobFormSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Role */}
              <div>
                <label
                  htmlFor="Role"
                  className="block mb-1 text-sm font-medium text-gray-800"
                >
                  Role<span className="text-red-500">*</span>
                </label>
                <input
                  id="Role"
                  {...register("Role", { required: "Role is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="Location"
                  className="block mb-1 text-sm font-medium text-gray-800"
                >
                  Location<span className="text-red-500">*</span>
                </label>
                <input
                  id="Location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., Bengaluru, India"
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label
                  htmlFor="Type"
                  className="block mb-1 text-sm font-medium text-gray-800"
                >
                  Type
                </label>
                <input
                  id="Type"
                  {...register("type")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Full-time, Remote, etc."
                />
              </div>

              {/* Qualification */}
              <div>
                <label
                  htmlFor="Qualification"
                  className="block mb-1 text-sm font-medium text-gray-800"
                >
                  Qualification<span className="text-red-500">*</span>
                </label>
                <input
                  id="Qualification"
                  {...register("qualification", {
                    required: "Qualification is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., Bachelor's in CS, 3+ years experience"
                  required
                />
              </div>

              {/* Job Description Upload */}
              <div className="md:col-span-2">
                <label
                  htmlFor="JD"
                  className="block mb-1 text-sm font-medium text-gray-800"
                >
                  Job Description (PDF)
                </label>
                <input
                  type="file"
                  id="JD"
                  accept=".pdf"
                  onChange={(e) => setJD(e.target.files)}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Status */}
              <div className="flex items-center space-x-3 md:col-span-2">
                <input
                  type="checkbox"
                  id="Active"
                  checked={status}
                  onChange={() => setStatus(!status)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="Active"
                  className={`font-semibold ${
                    status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status ? "Active" : "Inactive"}
                </label>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="px-6 py-2 border border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 font-bold uppercase rounded-sm transition-all shadow-sm"
              >
                Add Job
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-6 py-2 border border-red-600 text-red-600 bg-white hover:bg-red-50 font-bold uppercase rounded-sm transition-all shadow-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>

      {/* Main Layout */}
      <section className={`w-full grid ${isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"} h-screen bg-gray-50 transition-all duration-300`}>
        {/* Sidebar */}
        <aside className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"}`}>
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex flex-col overflow-auto">
          <Header {...header} />
          <SubNavbar tabs={[
            { name: "Job Roles", to: "/admin/career" },
            { name: "Careers Page", to: "/admin/career/edit" }
          ]} />
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Current Job Openings
            </h1>
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 border border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 font-bold uppercase rounded-sm transition-all shadow-sm"
            >
              + Add New Job
            </button>
          </div>

          <div className="p-6">
            {gettingdata.length > 0 ? (
              <JobCareer job={gettingdata} onJobChange={fetchJob} />
            ) : (
              <p className="py-10 text-lg text-center text-gray-500">
                No job postings found. Click "Add New Job" to create one.
              </p>
            )}
          </div>
        </main>
      </section>
    </>
  );
}

export default AdminCareer;
