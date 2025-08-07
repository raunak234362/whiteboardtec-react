import  { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar } from "./components"; // Adjust if path is different
import { Dialog } from "@headlessui/react";
import { Editor } from "primereact/editor";
import { useForm } from "react-hook-form";
import Service from "../../config/service";
import { blogInterface } from "../../config/interface";

function AdminBlogManager() {
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
    <section className="min-h-screen grid grid-cols-[240px_1fr] bg-gray-50">
      <aside className="h-screen text-white bg-gray-900 border-r border-gray-300">
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
              className="inline-flex items-center justify-center px-6 py-3 font-semibold text-green-500 bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md shadow-md">
              <thead className="text-white bg-green-600">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-left uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-center uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-6 font-medium text-center text-gray-500"
                    >
                      No blogs found.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="transition-colors hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-gray-800">{blog.title}</td>
                      <td className="px-6 py-4">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="flex justify-center px-6 py-4 space-x-4">
                        <button
                          onClick={() => openForm(blog)}
                          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="w-full max-w-2xl p-4 mx-auto">
            <Dialog.Panel className="relative bg-white rounded shadow-lg p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </Dialog.Title>
                <button
                  onClick={() => !loading && setFormOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={loading}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Content *
                  </label>
                  <Editor
                    value={content}
                    onTextChange={(e) => setContent(e.htmlValue ?? "")}
                    style={{ height: "280px" }}
                    className="border border-gray-300 rounded"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    disabled={loading}
                    className="px-5 py-2 text-gray-700 border border-gray-300 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 text-green-500 bg-green-600 border border-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {editingBlog ? "Update" : "Add"}
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
