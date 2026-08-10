import  { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar, useSidebar } from "./components"; 
import { Dialog } from "@headlessui/react";
import { Editor } from "primereact/editor";
import { useForm } from "react-hook-form";
import Service from "../../config/service";
import { blogInterface } from "../../config/interface";

function AdminBlogManager() {
  const { isSidebarOpen } = useSidebar();
  const header: HeaderProp = { head: "Blog Management" };

  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<blogInterface | null>(null);
  const [content, setContent] = useState<string>("");

  const [dialogMode, setDialogMode] = useState<"split" | "preview">("split");
  const [isChangingDialogMode, setIsChangingDialogMode] = useState(false);

  const handleDialogModeChange = (newMode: "split" | "preview") => {
    if (newMode === dialogMode) return;
    setIsChangingDialogMode(true);
    setTimeout(() => {
      setDialogMode(newMode);
      setIsChangingDialogMode(false);
    }, 600);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: { title: "" },
  });

  const titleValue = watch("title");

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Service.getBlogs();
      setBlogs(data);
    } catch {
      setError("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openForm = (blog?: blogInterface) => {
    setDialogMode("split");
    if (blog) {
      setEditingBlog(blog);
      reset({ title: blog.title });
      setContent(blog.content ?? "");
    } else {
      setEditingBlog(null);
      reset({ title: "" });
      setContent("");
    }
    setFormOpen(true);
  };

  const onSubmit = async (data: { title: string }) => {
    if (!content.trim()) {
      alert("Content cannot be empty");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", data.title);
      payload.append("content", content);

      if (editingBlog) {
        await Service.updateBlog(editingBlog.id, payload);
        alert("Blog updated successfully");
      } else {
        await Service.createBlog(payload);
        alert("Blog created successfully");
      }
      setFormOpen(false);
      fetchBlogs();
    } catch {
      alert("Error submitting blog.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await Service.deleteBlog(id);
      alert("Blog deleted successfully");
      fetchBlogs();
    } catch {
      alert("Failed to delete blog.");
    }
  };

  return (
    <section className={`min-h-screen grid ${isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"} bg-gray-50 transition-all duration-300`}>
      <aside className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"}`}>
          <Sidebar />
        </aside>

      <main className="flex flex-col">
        <Header {...header} />

        <div className="flex-grow p-8 overflow-auto bg-white">
          <div className="flex items-center justify-between mb-8">
            {/* <h2 className="text-3xl font-semibold text-gray-900">
              Blog Management
            </h2> */}
            <button
              type="button"
              onClick={() => openForm()}
              className="inline-flex items-center justify-center px-6 py-3 border border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 font-bold uppercase rounded-sm transition-all shadow-sm"
            >
              + Add New Blog
            </button>
          </div>

          {loading && (
            <p className="text-center text-gray-600">Loading blogs...</p>
          )}
          {error && (
            <p className="font-semibold text-center text-red-600">{error}</p>
          )}

          <div className="overflow-auto border border-gray-200 rounded-lg shadow-md mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-black bg-[#6abd45]">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 font-medium text-center text-gray-500"
                    >
                      No blogs found.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">{blog.title}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => openForm(blog)}
                          className="px-2.5 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="px-2.5 py-1 text-sm text-red-600 border border-red-650 rounded hover:bg-red-50 transition-colors font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {formOpen && (
        <Dialog
          open={formOpen}
          onClose={() => !loading && setFormOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="w-full max-w-5xl mx-auto">
            <Dialog.Panel className="relative w-full bg-white rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-150 pb-4 mb-6">
                <Dialog.Title className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </Dialog.Title>

                {/* Dialog Mode Switcher */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => handleDialogModeChange("split")}
                    style={{
                      backgroundColor: dialogMode === "split" ? "#6abd45" : "transparent",
                      color: dialogMode === "split" ? "#ffffff" : "#000000"
                    }}
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-sm focus:outline-none"
                  >
                    Split View
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDialogModeChange("preview")}
                    style={{
                      backgroundColor: dialogMode === "preview" ? "#6abd45" : "transparent",
                      color: dialogMode === "preview" ? "#ffffff" : "#000000"
                    }}
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-sm focus:outline-none"
                  >
                    Live Preview
                  </button>
                </div>

                <button
                  onClick={() => !loading && setFormOpen(false)}
                  className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
                >
                  Close
                </button>
              </div>

              {isChangingDialogMode ? (
                <div className="flex flex-col justify-center items-center bg-gray-50 h-[450px] rounded-lg">
                  <div className="relative flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#6abd45]"></div>
                    <div className="absolute text-[#6abd45] font-bold text-[10px] uppercase tracking-widest animate-pulse">
                      WBT
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-3 font-semibold uppercase tracking-widest animate-pulse">
                    Loading Layout...
                  </p>
                </div>
              ) : (
                <div className={dialogMode === "split" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex justify-center"}>
                  {/* Left Column: Form */}
                  {dialogMode === "split" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                          Title *
                        </label>
                        <input
                          type="text"
                          {...register("title", { required: "Title is required" })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                          disabled={loading}
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.title.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                          Content *
                        </label>
                        <Editor
                          value={content}
                          onTextChange={(e) => setContent(e.htmlValue ?? "")}
                          style={{ height: "280px" }}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
                          className="w-full py-2.5 hover:!bg-[#5baf38] rounded-lg font-bold uppercase transition-all duration-150 shadow-md text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Saving..." : editingBlog ? "Update" : "Add"}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Right Column: Live Preview */}
                  <div className={`w-full bg-gray-50 p-6 rounded-xl border border-gray-150 flex flex-col justify-start items-center ${dialogMode === "preview" ? "max-w-2xl" : ""}`}>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 align-self-start w-full text-center">Live Preview</h4>
                    <div className="w-full bg-white p-6 rounded-lg shadow border border-gray-100 max-w-lg">
                      <h1 className="mb-3 text-2xl font-extrabold text-gray-900 break-words leading-tight">
                        {titleValue || "Blog Title Placeholder"}
                      </h1>
                      <div className="flex items-center justify-between pb-2 mb-4 text-xs text-gray-500 border-b border-gray-200">
                        <span>
                          Published: {editingBlog ? new Date(editingBlog.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                        </span>
                        <span>Likes: {editingBlog?.likes ?? 0}</span>
                      </div>
                      <style>{`
                        .blog-content-preview * {
                          max-width: 100% !important;
                          box-sizing: border-box !important;
                        }
                        .blog-content-preview p { margin-bottom: 1rem !important; }
                      `}</style>
                      <div
                        className="blog-content-preview leading-relaxed text-gray-800 text-sm"
                        dangerouslySetInnerHTML={{ __html: content || "<p>Blog content goes here...</p>" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </section>
  );
}

export default AdminBlogManager;
