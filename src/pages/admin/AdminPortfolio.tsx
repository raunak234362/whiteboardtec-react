import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
import WorkPortfolio from "./components/WorkPortfolio";
import { PortfolioPropType } from "../ourWork";
import { Dialog } from "@headlessui/react";
import Service from "../../config/service";




function AdminPortfolio() {
  const [portfolios, setPortfolio] = useState<PortfolioPropType[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] =
    useState<PortfolioPropType | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [jdPdf, setJdPdf] = useState<File | null>(null);
  // const [jdProgress, setJdProgress] = useState<number>(0);
  
  const fetchPortfolio = async () => {
    try {
      const response = await Service.getPortfolio();
      console.log("Fetched Portfolio:", response);
      setPortfolio(
        response.map((portfolio: any) => ({
          ...portfolio,
          pdf: portfolio.file || "",
          // jdPdf: portfolio.jdPdf || "",
        }))
      );
 
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setPortfolio([]);
    }
  };
console.log("----------",portfolios);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0);
    const file = e.target.files?.[0];
    if (file) {
      setPdf(file);
      setProgress(100);
    } else {
      setPdf(null);
      setProgress(0);
    }
  };
  


  const handleAddSubmit = useCallback(async () => {
    console.log(pdf);
    if (!pdf) {
      alert("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", pdf);
    formData.append("status", status ? "active" : "inactive");

    try {
      await Service.portfolio(formData);
      alert("Portfolio project added successfully");
      fetchPortfolio();
      setOpen(false);
      setPdf(null);
      setDescription("");
      setTitle("");
      setStatus(false);
      setProgress(0);
    } catch (error) {
      console.error("Error adding portfolio project:", error);
      alert("Failed to add portfolio project. Please try again.");
    }
  }, [title, description, pdf, status]);

  const handleUpdateSubmit = useCallback(async () => {
    if (!currentPortfolio?.id) {
      alert("No portfolio selected for update");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status ? "active" : "inactive");

    if (pdf) {
      formData.append("file", pdf);
    }

    try {
      await Service.updatePortfolio(currentPortfolio.id, formData); 
      alert("Portfolio project updated successfully");
      fetchPortfolio();
      setOpen(false);
      setIsEditMode(false);
      setCurrentPortfolio(null);
      setTitle("");
      setDescription("");
      setPdf(null);
      setStatus(false);
      setProgress(0);
    } catch (error) {
      console.error("Error updating portfolio project:", error);
      alert("Failed to update portfolio project. Please try again.");
    }
  }, [title, description, pdf, status, currentPortfolio]);

  const handleEdit = useCallback((portfolio: PortfolioPropType) => {
    setOpen(true); 
    setIsEditMode(true);
    setCurrentPortfolio(portfolio);
    setTitle(portfolio.title);
    setDescription(portfolio.description);
    setPdf(null); 
    setStatus(
      typeof portfolio.status === "boolean"
        ? portfolio.status
        : portfolio.status === "active"
    );
    setProgress(0);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this portfolio project?")
    ) {
      try {
        await Service.deletePortfolio(id);
        alert("Portfolio project deleted successfully");
        fetchPortfolio(); // Refresh the list
      } catch (error) {
        console.error("Error deleting portfolio project:", error);
        alert("Failed to delete portfolio project. Please try again.");
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Admin | Portfolio - Whiteboard";
    const token = sessionStorage.getItem("token");
    console.log("Token in useEffect:", token);

    if (token) {
      setIsAuthenticated(true);
      fetchPortfolio();
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const header: HeaderProp = {
    head: "Portfolio",
  };
  if (isLoading) {
    return <div>Loading authentication...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />; 
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setOpen(false);
          setIsEditMode(false); 
          setCurrentPortfolio(null);
          setTitle(""); 
          setDescription("");
          setPdf(null);
          setStatus(false);
          setProgress(0);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed w-screen overflow-y-auto inset-1">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="flex flex-col w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  {isEditMode ? "Edit Portfolio" : "Add New Portfolio"}{" "}
               
                </Dialog.Title>
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsEditMode(false);
                    setCurrentPortfolio(null);
                    setTitle("");
                    setDescription("");
                    setPdf(null);
                    setStatus(false);
                    setProgress(0);
                  }}
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
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <table className="mx-10 mt-4 border-separate border-spacing-y-4">
                <tbody>
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
                        className="w-full px-2 mx-4 border-2 border-gray-200 rounded-md"
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
                        className="w-full mx-4 border-2 border-gray-200 rounded-md"
                      />
                      {progress > 0 && progress <= 100 && (
                        <span className="mx-3 text-gray-600">
                          {Math.round(progress)}%
                        </span>
                      )}
                      {isEditMode && currentPortfolio?.pdf && !pdf && (
                        <p className="mx-4 mt-1 text-sm text-gray-500">
                          Current PDF:{" "}
                          <a
                            href={currentPortfolio.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            View
                          </a>{" "}
                          (Upload new to change)
                        </p>
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
                </tbody>
              </table>
              <div className="flex flex-row flex-wrap justify-center">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isEditMode) {
                      handleUpdateSubmit(); 
                    } else {
                      handleAddSubmit(); 
                    }
                  }}
                  className=" px-4 border-2 rounded-md bg-green-500 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                >
                  {isEditMode ? "Update" : "Add New"}{" "}
                  {/* Dynamic button text */}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setIsEditMode(false);
                    setCurrentPortfolio(null);
                    setTitle("");
                    setDescription("");
                    setPdf(null);
                    setStatus(false);
                    setProgress(0);
                  }}
                  className="px-4 mx-3 text-lg text-white bg-red-600 border-2 border-white rounded-md drop-shadow-lg hover:border-red-500 hover:text-red-500 hover:bg-white"
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
          <div className="flex flex-row flex-wrap m-4">
            <h1 className="text-lg font-semibold">
              List of Current Portfolio Works
            </h1>
            <button
              className="px-2 mx-4 bg-gray-200 border-2 border-black rounded-md shadow-xl hover:drop-shadow-none drop-shadow-xl hover:shadow-none"
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
                setIsEditMode(false);
               
                setTitle("");
                setDescription("");
                setPdf(null);
                setStatus(false);
                setProgress(0);
                setCurrentPortfolio(null); 
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
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-center uppercase"
                >
                  Portfolio PDF
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-xs font-medium text-center uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {portfolios?.map(
                (
                  portfolio 
                ) => (
                  <WorkPortfolio
                    key={portfolio.id} 
                    {...portfolio}
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
export default AdminPortfolio;