import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../config/service";
import { blogInterface } from "../../config/interface";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<blogInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const allBlogs = await Service.getBlogs();
        const found = allBlogs.find((b) => b.id === id);
        if (found) {
          setBlog(found);
          document.title = `${found.title} - Blog`;
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="py-10 text-center text-gray-500">Loading blog...</p>;
  }
  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }
  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-green-600 transition hover:text-green-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Featured Image */}
        {Array.isArray(blog.file) && blog.file.length > 0 && (
          <img
            src={
              typeof blog.file[0] === "string"
                ? blog.file[0]
                : blog.file[0]?.path || ""
            }
            alt={blog.title}
            className="object-cover w-full mb-6 rounded-lg shadow h-80"
          />
        )}

        {/* Title */}
        <h1 className="mb-3 text-4xl font-extrabold text-gray-900">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center justify-between pb-4 mb-8 text-sm text-gray-500 border-b border-gray-200">
          <span>
            Published: {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span>Likes: {blog.likes ?? 0}</span>
        </div>

        {/* Blog Content */}
        <div
          className="leading-relaxed prose prose-lg text-gray-800 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
}
