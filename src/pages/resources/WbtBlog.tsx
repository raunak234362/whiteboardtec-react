import { useEffect, useState } from "react";
import { PageBanner } from "../../components/banner";
import Service from "../../config/service";
import { blogInterface } from "../../config/interface";
import { Link } from "react-router-dom"; // ✅ new import

const props = {
  banner: {
    header: "Hey, Thanks",
    subheader: "for visiting our blog.",
    image:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685612/banner-image/resource_lixfvx.jpg",
  },
  context: {
    head: "Welcome to Our Blog",
    desc: "There's so much happening in our world all the time and we’d like to share our views, collaborate and exchange ideas with like-minded people like you. Read on and share your views.",
  },
  posts: {
    title: "Featured Posts",
    desc: "Trending business and technology topics",
  },
};

function WbtBlog() {
  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liking, setLiking] = useState<string | null>(null);
  const [likedBlogs, setLikedBlogs] = useState<string[]>([]);

  useEffect(() => {
    document.title = "WBT Blog - Resources - Whiteboard";

    const liked = localStorage.getItem("wbt-liked-blogs");
    setLikedBlogs(liked ? JSON.parse(liked) : []);

    async function fetchBlogs() {
      setLoading(true);
      setError(null);
      try {
        const data = await Service.getBlogs();
        setBlogs(data);
      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  async function handleLike(blogId: string) {
    if (liking === blogId || likedBlogs.includes(blogId)) return;
    setLiking(blogId);
    try {
      const updatedLikes = await Service.likes(blogId);

      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b.id === blogId ? { ...b, likes: updatedLikes } : b
        )
      );

      const newLiked = [...likedBlogs, blogId];
      setLikedBlogs(newLiked);
      localStorage.setItem("wbt-liked-blogs", JSON.stringify(newLiked));
    } catch (error) {
      alert("Failed to like the blog. Please try again.");
    } finally {
      setLiking(null);
    }
  }

  return (
    <>
      <PageBanner {...props.banner} />
      <div className="w-full mx-auto my-0 bg-gray-100 lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="m-28 max-md:mx-0 mt-0 mb-10 p-2 grid grid-cols-[70%_30%] max-md:grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="order-1 max-md:order-2">
            <div className="mb-4 text-3xl font-bold text-black">
              {props.context?.head || "Welcome to Our Blog"}
            </div>
            <div className="mb-8 text-xl leading-relaxed text-gray-900">
              {props.context?.desc ||
                "Explore the latest articles and insights from Whiteboard."}
            </div>

            {loading && (
              <p className="py-10 text-lg text-center text-gray-500">
                Loading blogs...
              </p>
            )}

            {error && (
              <p className="py-10 font-semibold text-center text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && blogs.length === 0 && (
              <p className="py-10 text-lg text-center text-gray-500">
                No blogs found.
              </p>
            )}

            {!loading && !error && blogs.length > 0 && (
              <div className="space-y-8">
                {blogs.map((blog) => {
                  const alreadyLiked = likedBlogs.includes(blog.id);
                  return (
                    <Link
                      to={`/resources/wbt-blog/${blog.id}`} // ✅ Clickable link
                      key={blog.id}
                      className="block"
                    >
                      <article className="p-6 transition-shadow duration-300 bg-white rounded shadow-md cursor-pointer hover:shadow-lg">
                        <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                          {blog.title}
                        </h3>

                        <div
                          className="mb-3 prose text-gray-700 line-clamp-4 max-w-none"
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Published:{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // ✅ Prevent navigating when liking
                              handleLike(blog.id);
                            }}
                            disabled={liking === blog.id || alreadyLiked}
                            className={`flex items-center space-x-1 ${
                              liking === blog.id || alreadyLiked
                                ? "text-green-300 cursor-not-allowed"
                                : "text-green-600 hover:text-green-800 cursor-pointer"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 fill-current"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                            <span>{blog.likes ?? 0}</span>
                          </button>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar Featured Posts */}
          <aside className="bg-[#6abd45] rounded-md p-6 order-2 max-md:order-1 text-white">
            <h2 className="mb-4 text-3xl font-bold">{props.posts?.title}</h2>
            <p className="text-lg">{props.posts?.desc}</p>
          </aside>
        </section>
      </div>
    </>
  );
}

export default WbtBlog;
  