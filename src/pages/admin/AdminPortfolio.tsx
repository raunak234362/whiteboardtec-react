import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
import WorkPortfolio from "./components/WorkPortfolio";
import { PortfolioPropType } from "../ourWork";
import { Dialog } from "@headlessui/react";
import { auth, storage, db } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, getDocs } from "firebase/firestore";

function AdminPortfolio() {
  const [portfolios, setPortfolio] = useState<PortfolioPropType[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState<any>(null);
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const fetchPortfolio = useCallback(async () => {
    const career = collection(db, "portfolio");
    const querySnapshot = await getDocs(career);
    const data = querySnapshot.docs.map((doc) => ({
      id: String(doc.id),
      ...doc.data(),
    }));
    setPortfolio(data as PortfolioPropType[]); // Fix: Cast 'data' as 'JobDescType[]'
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
        setPdf(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = useCallback(async () => {
    // console.log(pdf);
    if (!pdf) {
      alert("Please upload a PDF file");
      return;
    }

    const data = {
      title: title,
      description: description,
      pdf: "",
      status: status,
    };

    const pdfFile = ref(
      storage,
      `Portfolio/${title.replace(" ", "_")}_${v4()}`
    );
    await uploadBytes(pdfFile, pdf).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        data.pdf = url;
        const portfolio = collection(db, "portfolio");
        addDoc(portfolio, data);
      });
    });
    fetchPortfolio();
    setProgress(0);
    setOpen(false);
  }, []);

  useEffect(() => {
    document.title = "Admin | Dashboard - Whiteboard";
    fetchPortfolio();
  });

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
          <div className="fixed inset-1 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col">
                <div className="flex justify-between">
                  <Dialog.Title className="text-lg font-semibold">
                    Add New Portfolio
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <table className="mt-4 mx-10 border-separate border-spacing-y-4">
                  <tr>
                    <td>
                      <label htmlFor="Role" className="text-sm text-gray-800">
                        Title
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Role"
                        id="Role"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
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
                        Description
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Description"
                        id="Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="pdf" className="text-sm text-gray-800">
                        PDF
                      </label>
                    </td>
                    <td>
                      <input
                        type="file"
                        name="PDF"
                        id="PDF"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="border-2 border-gray-200 rounded-md mx-4 w-full"
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
                        name="Active"
                        id="Active"
                        checked={status}
                        onChange={() => setStatus(!status)}
                        className="border-2 border-gray-200 rounded-md mx-4 custom-checkbox"
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
                <div className="flex flex-wrap justify-center flex-row">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className=" px-4 border-2 rounded-md bg-green-500 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                  >
                    Add New
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      setOpen(false);
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

        <section className="w-full grid grid-cols-[20%_80%]">
          <div style={{ minHeight: "95.2vh" }}>
            <Sidebar />
          </div>
          <div className="flex flex-col flex-wrap">
            <Header {...header} />
            <div className="flex flex-wrap flex-row m-4">
              <h1 className="text-lg font-semibold">
                List of Current Portfolio Works
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
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium  uppercase"
                  >
                    Portfolio PDF
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
                {portfolios?.map((portfolio, index) => (
                  <WorkPortfolio key={index} {...portfolio} />
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

export default AdminPortfolio;
