import { JobDescType } from ".";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Service from "../../config/service";
import { useForm } from "react-hook-form";

function JobBox(job: JobDescType) {
    const { register, handleSubmit } = useForm<any>();
  const [isOpenJob, setOpenJob] = useState(false);
  console.log("JobBox props:", job);
  const [resume, setResume] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  let jdUrl = "";
  if (job.jd) {
    if (Array.isArray(job.jd) && job.jd.length > 0) {
      const jdItem = job.jd[0];
      jdUrl = jdItem.secureUrl || (jdItem.path ? `${import.meta.env.VITE_IMG_URL}${jdItem.path}` : "");
    } else if (typeof job.jd === "string") {
      jdUrl = job.jd.startsWith("http") ? job.jd : `${import.meta.env.VITE_IMG_URL}${job.jd}`;
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentLoaded = (event.loaded / event.total) * 100;
          setProgress(percentLoaded);
        }
      };

      reader.onloadend = () => {
        setProgress(100); // Set progress to 100% when loading is complete
        setResume(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleApply = async (data: any) => {
   console.log("Applying with data:", data);
    const formData = new FormData();
   formData.append("name", data?.name);
   formData.append("email", data?.email);
   formData.append("phone", data?.phone);
   if (resume) {
     formData.append("resume", resume);
   }

    const response = await Service.ApplyJobApplication(formData, job.id)
    if (response) {
      console.log("Application submitted successfully:", response);
    }
    setOpenJob(false);
    setResume(null);
    setProgress(0);
    alert("Application submitted successfully!");
  };

  return (
    <>
      <Dialog
        open={isOpenJob}
        onClose={() => setOpenJob(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed w-screen overflow-y-auto inset-1">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="relative flex flex-col w-full max-w-xl p-8 bg-white rounded-2xl shadow-2xl ">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Apply for {job.Role}
                </Dialog.Title>
                <button
                  onClick={() => setOpenJob(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-all duration-200"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(handleApply)} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="Name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Enter your full name"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/30 focus:border-[#6abd45] transition-all duration-200 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="Email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="Email"
                    placeholder="Enter your email address"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/30 focus:border-[#6abd45] transition-all duration-200 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="Phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="Phone"
                    placeholder="Enter your contact number"
                    {...register("phone", { required: true })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/30 focus:border-[#6abd45] transition-all duration-200 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Resume / CV
                  </label>
                  <div className="relative group border-2 border-dashed border-gray-300 hover:border-[#6abd45] rounded-xl p-6 bg-gray-50 hover:bg-green-50/20 text-center transition-all duration-200 cursor-pointer">
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                      <svg className="w-10 h-10 text-gray-400 group-hover:text-[#6abd45] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {resume ? (
                        <div className="text-[#6abd45] font-semibold text-sm">
                          Selected: {resume.name}
                        </div>
                      ) : (
                        <>
                          <div className="text-gray-600 font-medium text-sm">
                            Click or drag file here to upload
                          </div>
                          <div className="text-gray-400 text-xs">
                            PDF, DOC, DOCX up to 5MB
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {progress > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>Uploading...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#6abd45] h-1.5 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-semibold border-2 border-black border-opacity-50 text-black bg-[#6abd45] rounded-lg hover:bg-[#5aa33a] active:bg-[#4d8b31] cursor-pointer transition-all duration-150 shadow-md shadow-green-500/10"
                  >
                    Apply Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>

      <div className="bg-white border-2 shadow-md rounded-3xl drop-shadow-md">
        <div className="p-3 m-5">
          <div className="text-[#6abd45] text-2xl font-semibold">
            {job.Role}
          </div>
          <div className="my-2">
            <div className="text-lg text-gray-700">
              Location: {job.location}
            </div>
            <div className="text-lg text-gray-700">Job Type: {job.type}</div>
            <div className="text-lg text-gray-700">
              Qualification: {job.qualification}
            </div>
          </div>
          <div className="flex flex-col flex-wrap mt-5 mb-0 md:flex-row justify-evenly">
            <a
              href={jdUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!jdUrl) {
                  e.preventDefault();
                  alert("Job description is not available.");
                }
              }}
              className="border-2 rounded-full border-black border-opacity-50 text-center opacity-80 text-base px-5 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg"
            >
              Download JD ➤{" "}
            </a>
            <button
              className="border-2 rounded-full max-md:mt-5 border-black border-opacity-50 opacity-80 text-base px-5 py-2 hover:bg-[#6abd45] hover:text-black "
              onClick={(e) => {
                e.preventDefault();
                setOpenJob(true);
              }}
            >
              Apply Now➤{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobBox;
