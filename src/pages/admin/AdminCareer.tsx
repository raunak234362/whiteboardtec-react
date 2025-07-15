import { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar } from "./components";
import JobCareer from "./components/JobCareer";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Service from "../../config/service";
import { JobPortalInterface } from "../../config/interface";

function AdminCareer() {
  const {
    register,
    handleSubmit,
  } = useForm<JobPortalInterface>();
  const [job, setJob] = useState<JobPortalInterface[]>([]);
  const header: HeaderProp = {
    head: "Career",
  };
  const [jd, setJD] = useState<any>(null);
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [gettingdata, setgettingdata] = useState<any>(null);

  const JobForm = async (data: JobPortalInterface) => {
    console.log("Form data:", data);

    const formData = new FormData();

    // Append text fields
    formData.append("Role", data.Role);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("qualification", data.qualification);

    // Append status field
    formData.append("status", status ? "active" : "inactive");

    // Append file(s)
    if (jd && jd.length > 0) {
      Array.from(jd as FileList).forEach((file: File) => {
        formData.append("jd", file); // For multiple files
      });
    }

    try {
      const response = await Service.JobPortal(formData);
      console.log("API Response:", response);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading");
    }
  };

  const fetchJob = async () => {
    const response = await Service.getJob()
    setgettingdata(response)
    console.log(response)
  }
  useEffect(() => {
    fetchJob()
  }, [])
  console.log(gettingdata);

  const [isOpen, setOpen] = useState(false);

  return (
    <>
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
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(JobForm)}>
                <table className="mx-10 mt-4 border-separate border-spacing-y-4">
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
                        {...register("Role", { required: "Role is required" })}
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
                          required: "location is required",
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
                          required: "qualification is required",
                        })}
                        className="w-full px-2 mx-4 border-2 border-gray-200 rounded-md"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="JD" className="text-sm text-gray-800">
                        Job Description
                      </label>
                    </td>
                    <td>
                      <input
                        type="file"
                        id="JD"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            setJD(e.target.files); // Save selected files in state
                          }
                        }}
                        className="w-full mx-4 border-2 border-gray-200 rounded-md"
                      />

                      {progress > 0 && progress <= 100 && (
                        <span className="mx-3 text-gray-600">{progress}%</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="Active" className="text-sm text-gray-800">
                        Status
                      </label>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="Active"
                        checked={status}
                        {...register("status")}
                        className="mx-4 border-2 border-gray-200 rounded-md custom-checkbox"
                      />
                      {status ? (
                        <label className="text-[#6abd45]" htmlFor="Active">
                          Active
                        </label>
                      ) : (
                        <label className="text-red-600" htmlFor="Active">
                          Inactive
                        </label>
                      )}
                    </td>
                  </tr>
                </table>
                <div className="flex flex-row flex-wrap justify-center">
                  <button
                    type="submit"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handleSubmit();
                    // }}
                    className=" px-4 border-2 rounded-md bg-green-500 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                  >
                    Add
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="px-4 mx-3 text-lg text-white bg-red-600 border-2 border-white rounded-md drop-shadow-lg hover:border-red-500 hover:text-red-500 hover:bg-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>

      <section className="w-full grid grid-cols-[20%_80%]">
        <div style={{ minHeight: "95.2vh" }}>
          <Sidebar />
        </div>
        <div className="flex flex-col flex-wrap">
          <Header {...header} />
          <div className="flex flex-row flex-wrap m-4">
            <h1 className="text-lg font-semibold">
              List of Current Job Openings
            </h1>
            <button
              className="px-2 mx-4 bg-gray-200 border-2 border-black rounded-md shadow-xl hover:drop-shadow-none drop-shadow-xl hover:shadow-none"
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              Add New
            </button>
          </div>

          <table className="mx-4 divide-y divide-gray-200">
            <thead className="bg-[#6abd45] text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 pl-20 text-xs font-medium uppercase text-start"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium uppercase text-start"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium uppercase text-start"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-center uppercase"
                >
                  Job Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-xs font-medium text-center uppercase"
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-xs font-medium text-center uppercase"
                >
                  Applications
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {gettingdata?.map(({job}:any, {index}:any) => (
                <JobCareer key={index} {...job} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default AdminCareer;
