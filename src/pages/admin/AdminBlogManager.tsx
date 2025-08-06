import React, { useEffect, useState } from "react";
import Service from "../../config/service"; // extend your Service.ts to add blog methods
import { blogInterface } from "../../config/interface"; // your interfaces file
import { Editor } from "primereact/editor";

function AdminBlogManager() {
  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<blogInterface | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    files: FileList | null;
  }>({
    title: "",
    content: "",
    files: null,
  });

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
        const data = await Service.getBlogs(); 
          console.log("Fetched blogs:", data);
      setBlogs(data);
    } catch (e) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Open form for add or edit
  const openForm = (blog?: blogInterface) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({ title: blog.title, content: blog.content, files: null });
    } else {
      setEditingBlog(null);
      setFormData({ title: "", content: "", files: null });
    }
    setFormOpen(true);
  };

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, files: e.target.files }));
  };

  // Submit form (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);
      if (formData.files && formData.files.length > 0) {
        // Append all files
        Array.from(formData.files).forEach((file) =>
          payload.append("files", file)
        );
      }

      if (editingBlog) {
        await Service.updateBlog(editingBlog.id, payload); // Implement in Service.ts
        alert("Blog updated");
      } else {
        await Service.createBlog(payload); // Implement in Service.ts
        alert("Blog created");
      }
      setFormOpen(false);
      fetchBlogs();
    } catch (error) {
      alert("Error submitting the blog");
    }
  };

  // Delete blog
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure to delete this blog?")) return;
    try {
      await Service.deleteBlog(id); // Implement in Service.ts
      alert("Blog deleted");
      fetchBlogs();
    } catch {
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Manage Blogs</h2>
        <button
          onClick={() => openForm()}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          + Add New Blog
        </button>
      </div>

      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No blogs found.
              </td>
            </tr>
          )}
          {blogs.map((blog) => (
            <tr key={blog.id} className="hover:bg-gray-100">
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 space-x-2 text-center border">
                <button
                  onClick={() => openForm(blog)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 space-y-4 bg-white rounded"
          >
            <h3 className="text-lg font-semibold">
              {editingBlog ? "Edit Blog" : "Add New Blog"}
            </h3>

            <label className="block">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Content</span>
              <Editor
                value={formData.content}
                onTextChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: e.htmlValue ?? "",
                  }))
                }
                style={{ height: "320px" }}
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Files (images, attachments)</span>
              <input
                type="file"
                name="files"
                multiple
                onChange={handleFileChange}
                className="mt-1"
              />
            </label>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                {editingBlog ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminBlogManager;
