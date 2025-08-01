import { Link } from "react-router-dom";
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
            <div className="flex flex-col w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between">
                <Dialog.Title className="text-2xl font-semibold">
                  Apply for {job.Role}
                </Dialog.Title>
                <button
                  onClick={() => setOpenJob(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
              <form onSubmit={handleSubmit(handleApply)}>
                <table className="mx-10 mt-4 border-separate border-spacing-y-4">
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="Name" className="text-lg text-gray-800">
                          Name
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Name"
                          {...register("name", { required: true })}
                          className="w-full px-2 mx-4 text-lg border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="Email"
                          className="text-lg text-gray-800"
                        >
                          Email
                        </label>
                      </td>
                      <td>
                        <input
                          type="email"
               
                          id="Email"
                         {...register("email", { required: true })}
                          className="w-full px-2 mx-4 text-lg border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="Phone"
                          className="text-lg text-gray-800"
                        >
                          Phone
                        </label>
                      </td>
                      <td>
                        <input
                          type="tel"
                         
                          id="Phone"
                          {...register("phone", { required: true })}
                          className="w-full px-2 mx-4 text-lg border-2 border-gray-200 rounded-md"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="resume"
                          className="text-lg text-gray-800"
                        >
                          Resume
                        </label>
                      </td>
                      <td>
                        <input
                          type="file"
                          name="resume"
                          id="resume"
                          onChange={handleFileChange}
                          className="w-full mx-4 text-lg border-2 border-gray-200 rounded-md"
                        />
                        {progress > 0 && progress <= 100 && (
                          <span className="mx-3 text-gray-600">
                            {progress}%
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex flex-row flex-wrap justify-center">
                  <button
                    type="submit"
                    className=" px-4 border-2 rounded-md bg-green-500 text-white text-xl border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                  >
                    Apply
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      setOpenJob(false);
                    }}
                    className="px-4 mx-3 text-xl text-white bg-red-600 border-2 border-white rounded-md drop-shadow-lg hover:border-red-500 hover:text-red-500 hover:bg-white"
                  >
                    Cancel
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
            <Link
              to={job.jd}
              target="_blank"
              className="border-2 rounded-full border-black border-opacity-50 text-center opacity-80 text-md px-5 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg"
            >
              Download JD ➤{" "}
            </Link>
            <button
              className="border-2 rounded-full max-md:mt-5 border-black border-opacity-50 opacity-80 text-md px-5 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                setOpenJob(true);
              }}
            >
              Apply Now ➤{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobBox;
