import { Link } from "react-router-dom";
import { JobDescType } from "../../careers";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function JobCareer(props: JobDescType) {
  const [isOpenJob, setOpenJob] = useState(false);
  const [role, setRole] = useState(props.role);
  const [location, setLocation] = useState(props.location);
  const [type0, setType] = useState(props.type);
  const [qualification, setQualification] = useState(props.qualification);
  const [jd, setJD] = useState<any>(null);
  const [status, setStatus] = useState(props.status);

  const handleUpdate = async () => {
    const data = {
      role: (props.role !== role) ? role : props.role,
      location: (props.location !== location) ? location : props.location,
      type: (props.type !== type0) ? type0 : props.type,
      qualification: (props.qualification !== qualification) ? qualification : props.qualification,
      jd: props.jd,
      status: (props.status !== status) ? status : props.status,
    }

  
    if (jd) {
      const reference = ref(storage, props.jd.split("?")[0]);
      await deleteObject(reference).then(() => {
        console.log("Old JD Deleted");
      }).catch((err)=>[
        console.log(err)
      ])
      const jobDesc = ref(storage, `Careers/${role.replace(" ", "_")}_${v4()}`);
      await uploadBytes(jobDesc, jd).then((val) => {
        getDownloadURL(val.ref).then((url) => {
          data.jd = url;
          const job = doc(db, "career", props.id)
          updateDoc(job, data);
        });
      });
    } else {
      const job = doc(db, "career", props.id)
      updateDoc(job, data);
    }
  }

  const handleDelete = async () => {
    const reference = ref(storage, props.jd.split("?")[0]);
    await deleteObject(reference).then(() => {
      console.log("Old JD Deleted");
    }).catch((err)=>[
      console.log(err)
    ])
    await deleteDoc(doc(db, "career", props.id))
  }

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
                    Edit Job Role for {props.role}
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
                      <label htmlFor="Role" className="text-sm text-gray-800">
                        Role
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Role"
                        id="Role"
                        value={role}
                        onChange={(e) => {setRole(e.target.value)}}
                        className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
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
                        name="Location"
                        id="Location"
                        value={location}
                        onChange={(e) => {setLocation(e.target.value)}}
                        className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
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
                        name="Type"
                        id="Type"
                        value={type0}
                        onChange={(e) => {setType(e.target.value)}}
                        className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
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
                        name="Qualification"
                        id="Qualification"
                        value={qualification}
                        onChange={(e) => {setQualification(e.target.value)}}
                        className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
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
                        name="JD"
                        id="JD"
                        onChange={async(e) => await setJD(e.target.files?.[0])}
                        className="border-2 border-gray-200 rounded-md mx-4 w-full"
                      />
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
                      name="Active"
                      id="Active"
                      checked={status}
                      onChange={() =>
                        setStatus(!status)
                      }
                      className="border-2 border-gray-200 rounded-md mx-4 custom-checkbox"
                    />
                      {
                        status ? (
                          <label className="text-[#6abd45]" htmlFor="Active">Active</label>
                        ) : (
                          <label className="text-red-600" htmlFor="Active">Inactive</label>
                        )
                      }
                    </td>
                  </tr>
                </table>
                <div className="flex flex-wrap justify-center flex-row">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                  className=" px-4 border-2 rounded-md bg-[#6abd45] text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                >
                  Update
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  className=" px-4 border-2 rounded-md bg-red-600 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-red-600 hover:text-red-600 hover:bg-white"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setOpenJob(false);
                  }}
                  className=" px-4 border-2 rounded-md bg-slate-600 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-slate-600 hover:text-slate-600 hover:bg-white"
                >
                  Cancel
                </button>

                </div>
              </div>
            </div>
          </div>
        </Dialog>

      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
            {props.role}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {props.location}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
          {props.type}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 ">
          <Link to={props.jd} target="_blank"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">
            View JD
          </Link>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
          <button
            type="button" onClick={(e) => {e.preventDefault(); setOpenJob(true); console.log(props.id);}}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            More
          </button>
        </td>
      </tr>
    </>
  );
}

export default JobCareer;
