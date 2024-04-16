import { Link } from "react-router-dom";
import { JobDescType } from ".";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
// import nodemailer from 'nodemailer';

function JobBox(job: JobDescType) {
  const [isOpenJob, setOpenJob] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

  const handleApply = async () => {
    if (!name || !email || !phone || !resume) {
      alert("Please fill all the fields");
      return;
    }

    const data = {
      name: name,
      email: email,
      phone: phone,
      resume: "",
      jobId: job.id,
    };

    const profileDesc = ref(
      storage,
      `Application/${name.replace(" ", "_")}_${v4()}`
    );
    await uploadBytes(profileDesc, resume).then((val) => {
      getDownloadURL(val.ref).then((url) => {
        data.resume = url;
        const application = collection(db, "application");
        addDoc(application, data);
      });
    });
    alert("Application Successfully Submitted")
    setOpenJob(false);
  };

  return (
    <>
      <Dialog
        open={isOpenJob}
        onClose={() => setOpenJob(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-1 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col">
              <div className="flex justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  Apply for {job.role}
                </Dialog.Title>
                <button
                  onClick={() => setOpenJob(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
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

              <table className="mt-4 mx-10 border-separate border-spacing-y-4">
                <tr>
                  <td>
                    <label htmlFor="Name" className="text-sm text-gray-800">
                      Name
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Name"
                      id="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Email" className="text-sm text-gray-800">
                      Email
                    </label>
                  </td>
                  <td>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Phone" className="text-sm text-gray-800">
                      Phone
                    </label>
                  </td>
                  <td>
                    <input
                      type="tel"
                      name="Phone"
                      id="Phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="resume" className="text-sm text-gray-800">
                      Resume
                    </label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      onChange={handleFileChange}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full"
                    />
                    {progress > 0 && progress <= 100 && (
                        <span className="mx-3 text-gray-600">{progress}%</span>
                      )}
                  </td>
                </tr>
              </table>
              <div className="flex flex-wrap justify-center flex-row">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleApply();
                  }}
                  className=" px-4 border-2 rounded-md bg-green-500 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                >
                  Apply
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setOpenJob(false);
                  }}
                  className=" px-4 border-2 rounded-md bg-red-600 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-red-500 hover:text-red-500  hover:bg-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <div className="rounded-3xl border-2 shadow-lg drop-shadow-lg bg-white">
        <div className="m-5 p-3">
          <div className="text-[#6abd45] text-lg font-semibold">{job.role}</div>
          <div className="my-2">
            <div className="text-gray-700 text-sm">
              Location: {job.location}
            </div>
            <div className="text-gray-700 text-sm">Job Type: {job.type}</div>
            <div className="text-gray-700 text-sm">
              Qualification: {job.qualification}
            </div>
          </div>
          <div className="mt-5 mb-0 flex flex-wrap flex-col md:flex-row justify-evenly">
            <Link
              to={job.jd}
              target="_blank"
              className="border-2 rounded-full border-black border-opacity-50 opacity-80 text-sm px-5 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg"
            >
              Download JD ➤{" "}
            </Link>
            <button
              className="border-2 rounded-full border-black border-opacity-50 opacity-80 text-sm px-5 py-2 hover:bg-[#6abd45] hover:text-white hover:border-white hover:shadow-lg"
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
