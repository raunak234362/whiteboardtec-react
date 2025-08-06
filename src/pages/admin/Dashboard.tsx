import { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar } from "./components";
import Service from "../../config/service"; 
import AdminBlogManager from "./AdminBlogManager"; 

type DashboardStats = {
  totalJobs: number;
  activeJobs: number;
  applicants: number;
  galleryImages: number;
  portfolios: number;
 
};

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs p-6 bg-white border-l-4 border-green-500 rounded shadow-md transition-shadow duration-300 hover:shadow-xl hover:scale-[1.03] cursor-pointer">
      <h3 className="text-xs font-semibold text-gray-500 uppercase transition-colors duration-300 hover:text-green-600">
        {title}
      </h3>
      <div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
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
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Admin | Dashboard - Whiteboard";

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch all jobs
        const jobs = await Service.getJob();
        console.log(
          "Job statuses:",
          jobs.map((j) => j.status)
        );
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter((j) => j.status === true).length;
          // const activeJobs = jobs.filter(
          //   (j) =>
          //     j.status === "active" || j.status === "true" || j.status === true // In case you ever store boolean!
          // ).length;
        // Fetch total applicants across all jobs
        let applicants = 0;
        
        for (const job of jobs) {
          const apps = await Service.getCareersApplicants(job.id);
          applicants += apps.length;
        }

        // Fetch gallery images/projects count
        const gallery = await Service.getGallery();
        const galleryImages = gallery.length;

        // Fetch portfolios count
        const portfoliosList = await Service.getPortfolio();
        const portfolios = portfoliosList.length;

        setStats({
          totalJobs,
          activeJobs,
          applicants,
          galleryImages,
          portfolios,
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

        {/* Main Content Area */}
        <div className="flex flex-col px-6 py-8">
          <Header {...header} />

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <span className="text-lg text-gray-600">
                Loading dashboard...
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center py-16">
              <span className="text-lg text-red-600">{error}</span>
            </div>
          )}

          {/* Dashboard Content */}
          {!loading && !error && (
            <>
              {/* Welcome Message */}
              <div className="flex flex-col items-center justify-center mt-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  Welcome to Whiteboard
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {/* You can show admin info here */}
                </p>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 gap-6 px-4 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <DashboardCard title="Total Jobs" value={stats.totalJobs} />
                <DashboardCard title="Active Jobs" value={stats.activeJobs} />
                <DashboardCard title="Applicants" value={stats.applicants} />
                <DashboardCard
                  title="Gallery Images"
                  value={stats.galleryImages}
                />
                <DashboardCard
                  title="Total No of Portfolios"
                  value={stats.portfolios}
                />
                {/* Add more cards as needed */}
              </div>
             
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
