import { PageBanner, BannerPropType } from "../../components/banner";
import { PortfolioPropType } from "../../config/interface";
import PortfolioInfo from "./PortfolioInfo";
import { useEffect, useState } from "react";
import PortfolioPdf from "./PortfolioPdf";
import Service from "../../config/service"; 

const bannerData: BannerPropType = {
  header: "Our Portfolio",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/portfolio-banner_hziqaf.jpg",
};

function Portfolio() {
  const [portfolios, setPortfolios] = useState<PortfolioPropType[]>([]);

  const fetchPortfolio = async () => {
    try {
      const response = await Service.getPortfolio(); 
      // const activePortfolios = response.filter(
      //   (portfolio: PortfolioPropType) => portfolio.status === true
      // );
      console.log(response);
      
      setPortfolios(response);
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
      <div className="mx-auto my-2 lg:max-w-screen-lg xl:max-w-screen-xl">
        {portfolios.map((portfolio, index) => (
          <section
            key={index}
            className="rounded-3xl mt-10 h-[60vh] max-md:h-[90vh] border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1 relative"
          >
            <div className="order-1 my-2 ml-6 overflow-y-hidden max-md:ml-0 max-md:order-2">
              {portfolio && <PortfolioPdf pdfFiles={portfolio} />}
            </div>
            <div className="order-2 max-md:order-1">
              <PortfolioInfo
                title={portfolio.title}
                description={portfolio.description}
                file={portfolio.file}
              />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default Portfolio;
