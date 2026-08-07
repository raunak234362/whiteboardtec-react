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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: { title: "" },
  });

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

      {/* Modal */}
      {formOpen && (
        <Dialog
          open={formOpen}
          onClose={() => !loading && setFormOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl mx-auto">
            <Dialog.Panel className="relative w-full bg-white rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-150 pb-4 mb-6">
                <Dialog.Title className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </Dialog.Title>
                <button
                  onClick={() => !loading && setFormOpen(false)}
                  className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
                >
                  Close
                </button>
              </div>

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
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </section>
  );
}

export default AdminBlogManager;
