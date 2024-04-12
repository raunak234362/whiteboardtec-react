import { PageBanner, BannerPropType } from "../../components/banner";
import { PortfolioPropType } from ".";
import PortfolioInfo from "./PortfolioInfo";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import PortfolioPdf from "./PortfolioPdf";

const bannerData: BannerPropType = {
  header: "Our Portfolio",
  image: "/src/assets/image/banner-image/portfolio-banner.jpg",
};

function Portfolio() {
  const [portfolios, setPortfolio] = useState<PortfolioPropType[]>([]);

  const fetchPortfolio = useCallback(async () => {
    const portfolio = collection(db, "portfolio");
    const querySnapshot = query(portfolio, where("status", "==", true));
    const portfolioData = await getDocs(querySnapshot);
    const data = portfolioData.docs.map((doc) => ({
      id: String(doc.id),
     ...doc.data(),
    }));
    setPortfolio(data as PortfolioPropType[]);
  }, []);

  useEffect(() => {
    document.title = "Portfolio - Whiteboard";
    fetchPortfolio();
  }, []);


  return (
    <>
      <PageBanner {...bannerData} />
      <div className="my-2 mx-auto lg:max-w-screen-xl">
        {portfolios?.map((portfolio, index) => {
          return (
            <section key={index} className="rounded-3xl mt-10 h-[70vh] border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl">
              <div className="overflow-y-hidden my-4 ml-6">
                {
                  portfolio.pdf && (
                    // <PortfolioPdf pdfURL={"https://clickdimensions.com/links/TestPDFfile.pdf"} />
                    <PortfolioPdf pdfURL={portfolio.pdf} />
                  )
                }
              </div>
              <div>
                <PortfolioInfo
                  title={portfolio.title}
                  description={portfolio.description}
                  pdf={portfolio.pdf}
                />
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default Portfolio;
