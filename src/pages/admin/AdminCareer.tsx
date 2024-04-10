import { useCallback, useEffect, useState } from "react";
import { auth, db, storage } from "../../config/firebase";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
import { JobDescType } from "../careers";
import JobCareer from "./components/JobCareer";
import { Dialog } from "@headlessui/react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";


function AdminCareer() {
  const [job, setJob] = useState<JobDescType[]>([]);

  const fetchJob = useCallback(async () => {
    const career = collection(db, "career");
    // const jobs = query(career);
    const querySnapshot = await getDocs(career);
    const data = querySnapshot.docs.map((doc) => ({
      id: String(doc.id),
      ...doc.data(),
    }));
    setJob(data as JobDescType[]); // Fix: Cast 'data' as 'JobDescType[]'
  }, []);

  useEffect(() => {
    document.title = "Admin | Dashboard - Whiteboard";
    fetchJob();
  });

  const header: HeaderProp = {
    head: "Career",
  };
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [type0, setType] = useState("");
  const [qualification, setQualification] = useState("");
  const [jd, setJD] = useState<any>(null);
  const [status, setStatus] = useState(false);

  const handleSubmit = useCallback( async () => {
    console.log(jd);
    if (!jd) {
      alert("Please add a Job Description File");
      return;
    }

    const data = {
      role: role,
      location: location,
      type: type0,
      qualification: qualification,
      jd: "",
      status: status,
    };

    const jobDesc = ref(storage, `Careers/${role.replace(" ", "_")}_${v4()}`);
    await uploadBytes(jobDesc, jd).then((val) => {
      getDownloadURL(val.ref).then((url) => {
        data.jd = url;
        const career = collection(db, "career");
        addDoc(career, data);
      });
    });
    fetchJob();
  }, []);

  const [isOpen, setOpen] = useState(false);

  if (auth.currentUser?.email) {
    return (
      <>
        <Dialog
          open={isOpen}
          onClose={() => setOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="fixed inset-1 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col">
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
                        onChange={(e) => setRole(e.target.value)}
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
                        onChange={(e) => setLocation(e.target.value)}
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
                        onChange={(e) => setType(e.target.value)}
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
                        onChange={(e) => setQualification(e.target.value)}
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
                        onChange={() => {
                          setStatus((prev) => {
                            return !prev;
                          });
                        }}
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
                    handleSubmit();
                  }}
                  className=" px-4 border-2 rounded-md bg-[#6abd45] text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                >
                  Add
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setOpen(false)
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

        <section className="w-full grid grid-cols-[20%_80%]">
          <div style={{ minHeight: "95.2vh" }}>
            <Sidebar />
          </div>
          <div className="flex flex-col flex-wrap">
            <Header {...header} />
            <div className="flex flex-wrap flex-row m-4">
              <h1 className="text-lg font-semibold">
                List of Current Job Openings
              </h1>
              <button
                className="mx-4 px-2 border-2 rounded-md bg-gray-200 border-black hover:drop-shadow-none drop-shadow-xl shadow-xl hover:shadow-none"
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
                    className="px-6 py-3 text-start pl-20 text-xs font-medium uppercase"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium  uppercase"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium  uppercase"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium  uppercase"
                  >
                    Job Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium  uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {job?.map((job, index) => (
                  <JobCareer key={index} {...job} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  } else {
    return <Navigate to="/admin/login" />;
  }
}

export default AdminCareer;
