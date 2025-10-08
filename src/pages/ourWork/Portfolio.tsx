import { PageBanner, BannerPropType } from "../../components/banner";
import { PortfolioPropType } from "../../config/interface";
import PortfolioInfo from "./PortfolioInfo"; // Now for the detail section
import { useEffect, useState } from "react";
import PortfolioPdf from "./PortfolioPdf"; // Renamed for clarity
import Service from "../../config/service";

const bannerData: BannerPropType = {
  header: "Our Portfolio",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/portfolio-banner_hziqaf.jpg",
};

function Portfolio() {
  const [portfolios, setPortfolios] = useState<PortfolioPropType[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioPropType | null>(null);

  const fetchPortfolio = async () => {
    try {
      const response = await Service.getPortfolio();
      setPortfolios(
        response.map((portfolio: PortfolioPropType) => ({
          ...portfolio,
          status: portfolio.status,
        }))
      );
      if (response.length > 0) {
        setSelectedPortfolio(response[0]); // Select the first item by default
      }
    } catch (error) {
      console.error("Failed to fetch portfolio data:", error);
    }
  };

  useEffect(() => {
    document.title = "Portfolio - Whiteboard";
    fetchPortfolio();
  }, []);

  return (
    <>
      <PageBanner {...bannerData} />
      <div className="mx-auto my-8 px-4 lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl border overflow-hidden min-h-[700px]">
          {/* Left Panel: File Browser / List */}
          <div className="w-full md:w-1/3 border-r border-gray-200 p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              My Portfolio
            </h2>
            <div className="flex flex-col space-y-4 overflow-y-auto custom-scrollbar pr-2">
              {portfolios.length > 0 ? (
                portfolios.map((portfolio, index) => {
                  const isSelected = selectedPortfolio?.id === portfolio.id;

                  return (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ease-in-out
                        ${
                          isSelected
                            ? "bg-[#e6ffe6] shadow-md border-green-400"
                            : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                        }`}
                      onClick={() => setSelectedPortfolio(portfolio)}
                    >
                      <div className="flex-shrink-0 mr-4 text-green-600 text-3xl">
                        📄 {/* PDF Icon */}
                      </div>
                      <div className="flex-grow">
                        <p
                          className={`font-semibold ${
                            isSelected ? "text-green-800" : "text-gray-800"
                          }`}
                        >
                          {portfolio.title}
                        </p>
                        {/* {firstFile?.fileName && (
                          // <p className="text-sm text-gray-500 truncate">
                          //   {firstFile.fileName}
                          // </p>
                        )} */}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 p-4">
                  No portfolio items found.
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: PDF Viewer and Info */}
          <div className="w-full md:w-2/3 flex flex-col bg-gray-50">
            {selectedPortfolio ? (
              <>
                {/* PDF Viewer Section */}
                <div className="flex-shrink-0 h-[calc(100vh-250px)] md:h-[500px] border-b border-gray-200 bg-white relative">
                  <PortfolioPdf portfolio={selectedPortfolio} />
                </div>

                {/* Info Section */}
                <div className="flex-grow p-6 bg-white">
                  <PortfolioInfo selectedPortfolio={selectedPortfolio} />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <p className="text-lg">
                  Select an item from the left to view its details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
