import { PageBanner, BannerPropType } from "../../components/banner";
import { PortfolioPropType } from ".";
import PortfolioInfo from "./PortfolioInfo";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import PortfolioPdf from "./PortfolioPdf";

const bannerData: BannerPropType = {
  header: "Our Portfolio",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fportfolio-banner.jpg?alt=media&token=f540249a-168e-4932-b6ec-3e448450b88b",
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
      <div className="my-2 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        {portfolios?.map((portfolio, index) => {
          return (
            <section key={index} className="rounded-3xl mt-10 h-[60vh] max-md:h-[90vh] border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1 relative">
              <div className="overflow-y-hidden my-2 ml-6 max-md:ml-0 order-1 max-md:order-2">
                {
                  portfolio?.pdf && (
                    <PortfolioPdf pdfURL={portfolio?.pdf} />
                    
                  )
                }
              </div>
              <div className="max-md:order-1 order-2">
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
