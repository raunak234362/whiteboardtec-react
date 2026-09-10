import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar, useSidebar } from "./components";
import WorkPortfolio from "./components/WorkPortfolio";
import { PortfolioPropType } from "../../config/interface";
import { Dialog } from "@headlessui/react";
import Service from "../../config/service";

function AdminPortfolio() {
  const { isSidebarOpen } = useSidebar();
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <Dialog.Panel className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-150 pb-4 mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 uppercase tracking-wider">
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
              className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
            >
              Close
            </button>
          </div>

          {/* Form Inputs */}
          <form className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                placeholder="Enter description"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                PDF Document
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-250 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 file:cursor-pointer transition-colors"
              />
              {progress > 0 && progress <= 100 && (
                <p className="mt-1 text-gray-600 text-xs font-semibold">
                  Upload progress: {Math.round(progress)}%
                </p>
              )}
              {isEditMode && currentPortfolio?.file && !pdf && (
                <p className="mt-1.5 text-xs text-gray-500">
                  Current PDF:{" "}
                  <a
                    href={`${import.meta.env.VITE_IMG_URL}${
                      Array.isArray(currentPortfolio.file)
                        ? (currentPortfolio.file[0] as { path?: string })?.path
                        : (currentPortfolio.file as { path?: string } | null | undefined)?.path || ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-semibold hover:text-blue-800"
                  >
                    View Current Document
                  </a>{" "}
                  (Upload a new file to change)
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="statusCheckbox"
                checked={status}
                onChange={() => setStatus(!status)}
                className="w-4.5 h-4.5 text-[#6abd45] border-gray-300 rounded focus:ring-[#6abd45] cursor-pointer"
              />
              <label
                htmlFor="statusCheckbox"
                className={`text-sm font-semibold select-none cursor-pointer ${
                  status ? "text-green-600" : "text-red-650"
                }`}
              >
                {status ? "Active" : "Inactive"}
              </label>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  if (isEditMode) handleUpdateSubmit();
                  else handleAddSubmit();
                }}
                style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
                className="w-full py-2.5 hover:!bg-[#5baf38] rounded-lg font-bold uppercase transition-all duration-150 shadow-md text-sm tracking-wide"
              >
                {isEditMode ? "Update" : "Add New"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>

      {/* Main portfolio section */}
      <section className={`w-full grid ${isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"} h-screen bg-gray-50 transition-all duration-300`}>
        <aside className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"}`}>
          <Sidebar />
        </aside>

        <main className="flex flex-col overflow-auto">
          <Header {...header} />
          <div className="flex items-center justify-between p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Portfolio Projects
            </h1>
            <button
              className="px-6 py-2 border border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 font-bold uppercase rounded-sm transition-all shadow-sm"
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

          <div className="p-6">
            <div className="overflow-auto border border-gray-200 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-black bg-[#6abd45]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">
                      Portfolio PDF
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
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
          </div>
        </main>
      </section>
    </>
  );
}

export default AdminPortfolio;
