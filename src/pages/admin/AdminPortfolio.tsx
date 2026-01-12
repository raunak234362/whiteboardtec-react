import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
import WorkPortfolio from "./components/WorkPortfolio";
import { PortfolioPropType } from "../../config/interface";
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

  const fetchPortfolio = async () => {
    try {
      const response = await Service.getPortfolio();
      setPortfolio(
        response.map((portfolio: any) => ({
          id: portfolio.id,
          title: portfolio.title,
          description: portfolio.description,
          status: portfolio.status,
          file: portfolio.file || null,
        }))
      );
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setPortfolio([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        fetchPortfolio();
      } catch (error) {
        console.error("Error deleting portfolio project:", error);
        alert("Failed to delete portfolio project. Please try again.");
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Admin | Portfolio - Whiteboard";
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchPortfolio();
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const header: HeaderProp = {
    head: "Portfolio",
  };

  return (
    <>
      {/* Modal */}
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <Dialog.Panel className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEditMode ? "Edit Portfolio" : "Add New Portfolio"}
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
              className="text-gray-400 hover:text-gray-800 focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form Inputs */}
          <form>
            <table className="w-full mx-auto border-separate border-spacing-y-4">
              <tbody>
                {[
                  {
                    label: "Title",
                    value: title,
                    type: "text",
                    onChange: setTitle,
                  },
                  {
                    label: "Description",
                    value: description,
                    type: "text",
                    onChange: setDescription,
                    placeholder: "Enter description",
                  },
                ].map(({ label, value, type, onChange, placeholder }, idx) => (
                  <tr key={idx}>
                    <td className="w-32 p-2 font-medium text-gray-800 align-top">
                      {label}
                    </td>
                    <td className="p-2">
                      <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="p-2 font-medium text-gray-800 align-top">
                    PDF
                  </td>
                  <td className="p-2">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {progress > 0 && progress <= 100 && (
                      <p className="mt-1 text-gray-600">
                        {Math.round(progress)}%
                      </p>
                    )}
                    {isEditMode && currentPortfolio?.file && !pdf && (
                      <p className="mt-1 text-sm text-gray-500">
                        Current PDF:{" "}
                        <a
                          href={`${import.meta.env.VITE_IMG_URL}${
                            Array.isArray(currentPortfolio.file)
                              ? (currentPortfolio.file[0] as { path?: string })
                                  ?.path
                              : (
                                  currentPortfolio.file as
                                    | { path?: string }
                                    | null
                                    | undefined
                                )?.path || ""
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>{" "}
                        (Upload new to change)
                      </p>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="p-2 font-medium text-gray-800 align-top">
                    Status
                  </td>
                  <td className="flex items-center p-2 space-x-2">
                    <input
                      type="checkbox"
                      checked={status}
                      onChange={() => setStatus(!status)}
                      className="w-5 h-5 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      id="statusCheckbox"
                    />
                    <label
                      htmlFor="statusCheckbox"
                      className={status ? "text-green-600" : "text-red-600"}
                    >
                      {status ? "Active" : "Inactive"}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Action Buttons */}
            <div className="flex justify-center mt-6 space-x-6">
              <button
                type="button"
                onClick={() => {
                  if (isEditMode) handleUpdateSubmit();
                  else handleAddSubmit();
                }}
                className="px-6 py-2 text-green-600 transition bg-green-600 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {isEditMode ? "Update" : "Add New"}
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
                className="px-6 py-2 text-white transition bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>

      {/* Main portfolio section */}
      <section className="w-full grid grid-cols-[20%_80%] h-screen bg-gray-50">
        <aside className="overflow-auto text-white bg-gray-900 border-r border-gray-300">
          <Sidebar />
        </aside>

        <main className="flex flex-col overflow-auto">
          <Header {...header} />
          <div className="flex items-center justify-between p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Portfolio Projects
            </h1>
            <button
              className="px-6 py-2 text-white transition bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => {
                setOpen(true);
                setIsEditMode(false);
                setCurrentPortfolio(null);
                setTitle("");
                setDescription("");
                setPdf(null);
                setStatus(false);
                setProgress(0);
              }}
            >
              + Add New Project
            </button>
          </div>

          <div className="p-6 overflow-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200 rounded shadow">
              <thead className="text-white bg-green-600">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                    Portfolio PDF
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-center uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolios.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 font-medium text-center text-gray-500"
                    >
                      No portfolio projects found.
                    </td>
                  </tr>
                ) : (
                  portfolios
                    .filter((portfolio) => portfolio.id)
                    .map((portfolio) => (
                      <WorkPortfolio
                        key={portfolio.id}
                        {...portfolio}
                        id={portfolio.id as string}
                        status={
                          typeof portfolio.status === "boolean"
                            ? portfolio.status
                            : portfolio.status === "active"
                        }
                        onEdit={(pf) => handleEdit(pf as PortfolioPropType)}
                        onDelete={handleDelete}
                      />
                    ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </section>
    </>
  );
}

export default AdminPortfolio;
