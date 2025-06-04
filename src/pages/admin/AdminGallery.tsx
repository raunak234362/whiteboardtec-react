import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
// import WorkPortfolio from "./components/WorkPortfolio";
import { PortfolioPropType } from "../ourWork";
import { Dialog } from "@headlessui/react";
import { auth, storage, db } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, getDocs } from "firebase/firestore";
import ImagePortfolio from "./components/ImagePortfolio";

function AdminGallery() {
  const [gallery, setGallery] = useState<PortfolioPropType[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [softwareUsed, setSoftwareUsed] = useState("");
  const [projectStatus, setProjectStatus] = useState("In Progress");
  const [img, setImg] = useState<any>(null);
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const fetchPortfolio = useCallback(async () => {
    const career = collection(db, "gallery");
    const querySnapshot = await getDocs(career);
    const data = querySnapshot.docs.map((doc) => ({
      id: String(doc.id),
      ...doc.data(),
    }));
    setGallery(data as PortfolioPropType[]); // Fix: Cast 'data' as 'JobDescType[]'
  }, []);

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
        setImg(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setProjectType("");
    setSoftwareUsed("");
    setProjectStatus("In Progress");
    setImg(null);
    setStatus(false);
    setProgress(0);
  };

  const handleSubmit = useCallback(async () => {
    // Validation
    if (!img) {
      alert("Please upload an image file");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    const data = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      projectType: projectType.trim(),
      softwareUsed: softwareUsed.trim(),
      projectStatus: projectStatus,
      img: "",
      status: status,
      createdAt: new Date().toISOString(),
    };

    try {
      const imgFile = ref(
        storage,
        `Gallery/${title.replace(/\s+/g, "_")}_${v4()}`
      );
      await uploadBytes(imgFile, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          data.img = url;
          const portfolio = collection(db, "gallery");
          addDoc(portfolio, data);
        });
      });
      alert("New Portfolio Project Successfully Added");
      fetchPortfolio();
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding portfolio:", error);
      alert("Error adding portfolio. Please try again.");
    }
  }, [title, description, location, projectType, softwareUsed, projectStatus, img, status, fetchPortfolio]);

  useEffect(() => {
    document.title = "Admin | Dashboard - Whiteboard";
    fetchPortfolio();
  }, [fetchPortfolio]);

  const header: HeaderProp = {
    head: "Portfolio",
  };

  if (auth.currentUser?.email) {
    return (
      <>
        <Dialog
          open={isOpen}
          onClose={() => setOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="fixed inset-0 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-lg flex flex-col max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    Add New Portfolio Project
                  </Dialog.Title>
                  <button
                    onClick={() => {
                      setOpen(false);
                      resetForm();
                    }}
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter project title"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter project description"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Project location"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        id="projectType"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select project type</option>
                        <option value="Institute">Institute</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Facility Expension">Facility Expension</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="softwareUsed" className="block text-sm font-medium text-gray-700 mb-1">
                        Software/Technologies Used
                      </label>
                      <input
                        type="text"
                        name="softwareUsed"
                        id="softwareUsed"
                        value={softwareUsed}
                        onChange={(e) => setSoftwareUsed(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Tekla, SDS-2"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Status
                      </label>
                      <select
                        name="projectStatus"
                        id="projectStatus"
                        value={projectStatus}
                        onChange={(e) => setProjectStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Image *
                      </label>
                      <input
                        type="file"
                        name="img"
                        id="img"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      {progress > 0 && progress <= 100 && (
                        <div className="mt-2">
                          <div className="bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 mt-1 block">{progress.toFixed(0)}% uploaded</span>
                        </div>
                      )}
                    </div>

                   
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Portfolio Project
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      resetForm();
                    }}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
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
            <div className="flex flex-wrap flex-row m-4 items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">
                Portfolio Management
              </h1>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                Add New Project
              </button>
            </div>

            <div className="mx-4 bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Project Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Type & Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gallery?.map((portfolio, index) => (
                    <ImagePortfolio key={portfolio.id || index} {...portfolio} />
                  ))}
                  {gallery?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No portfolio projects found. Add your first project to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <Navigate to="/admin/login" />;
  }
}

export default AdminGallery;