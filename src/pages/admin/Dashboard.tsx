import { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar } from "./components";
import Service from "../../config/service";

type DashboardStats = {
  totalJobs: number;
  activeJobs: number;
  applicants: number;
  galleryImages: number;
  portfolios: number;
  blogs: number;
};

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      role="region"
      aria-label={title}
      tabIndex={0}
      className="flex flex-col items-center justify-center w-full max-w-xs p-6 bg-white border-l-4 border-green-500 rounded shadow-md transition-shadow duration-300 hover:shadow-xl hover:scale-[1.03] cursor-default focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <h3 className="mb-1 text-xs font-semibold text-gray-500 uppercase transition-colors duration-300">
        {title}
      </h3>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    applicants: 0,
    galleryImages: 0,
    portfolios: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Admin | Dashboard - Whiteboard";

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch jobs
        const jobs = await Service.getJob();
        const totalJobs = jobs.length;

        // Active jobs count
        const activeJobs = jobs.filter(
          (j) => String(j.status).toLowerCase() === "true"
        ).length;

        // Applicants
        let applicants = 0;
        for (const job of jobs) {
          const apps = await Service.getCareersApplicants(job.id);
          applicants += apps.length;
        }

        // Gallery count
        const gallery = await Service.getGallery();
        const galleryImages = gallery.length;

        // Portfolio count
        const portfolios = (await Service.getPortfolio()).length;

        // Blogs count
        const blogs = (await Service.getBlogs()).length;

        setStats({
          totalJobs,
          activeJobs,
          applicants,
          galleryImages,
          portfolios,
          blogs,
        });
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const header: HeaderProp = {
    head: "Dashboard",
  };

  return (
    <>
      <section className="w-full min-h-screen grid grid-cols-[20%_1fr] bg-gray-50">
        {/* Sidebar */}
        <div style={{ minHeight: "95.2vh" }} className="bg-gray-800">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex flex-col max-w-full px-8 py-10 overflow-auto">
          <Header {...header} />

          {loading && (
            <div className="flex items-center justify-center py-20">
              <span className="text-lg text-gray-600">
                Loading dashboard...
              </span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-20">
              <span className="text-lg text-red-600">{error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex flex-col items-center justify-center mb-12">
                <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-center text-gray-900">
                  Welcome to Whiteboard
                </h1>
                <p className="max-w-2xl mt-4 text-lg text-center text-gray-600">
                  {/* Optional info here */}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <DashboardCard title="Total Jobs" value={stats.totalJobs} />
                <DashboardCard title="Active Jobs" value={stats.activeJobs} />
                <DashboardCard title="Applicants" value={stats.applicants} />
                <DashboardCard
                  title="Gallery Images"
                  value={stats.galleryImages}
                />
                <DashboardCard
                  title="Total Portfolios"
                  value={stats.portfolios}
                />
                <DashboardCard title="Blogs Posted" value={stats.blogs} />
              </div>
            </>
          )}
        </main>
      </section>
    </>
  );
}

export default Dashboard;
