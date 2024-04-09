import { PageBanner, BannerPropType } from "../../components/banner";
import { PortfolioPropType } from ".";
import PortfolioInfo from "./PortfolioInfo";
import { CarouselDefault } from "../../components/Carousel/CarouselDefault";

const bannerData: BannerPropType = {
  header: "Our Portfolio",
  image: "/src/assets/image/banner-image/portfolio-banner.jpg",
};

const portfolioData: PortfolioPropType[] = [
  {
    title: "Structural Steel – Main Steel",
    description:
      "These are shop drawings supplied for main structural elements such as beams, columns, etc. For us, our portfolio is more than a collection. It’s work that has gone out and delivered results and created a lasting impact with the respective project. The very reason why clients keep coming back to us.",
    pdf: "https://www.whiteboardtec.com/projects/main-steel/WBT-Main-steel-sample.pdf",
    images: [
      {
        url: "/src/assets/image/insite-images/connection-design.png",
        alt: "Structural Steel 1",
      },
      {
        url: "/src/assets/image/insite-images/equal-opportunity.png",
        alt: "Structural Steel 2",
      },
      {
        url: "/src/assets/image/insite-images/our-services.jpg",
        alt: "Structural Steel 3",
      },
      {
        url: "/src/assets/image/insite-images/simplified.jpg",
        alt: "Structural Steel 4",
      },
    ],
  },
  {
    title: "Structural Steel – Miscellaneous Steel",
    description:
      "These are shop drawings of various miscellaneous steel elements such as gratings, handrails, trusses, ISO-Views and more.",
    pdf: "https://www.whiteboardtec.com/projects/misc-steel/WBT-Misc-steel-sample.pdf",
    images: [
      {
        url: "/src/assets/image/insite-images/connection-design.png",
        alt: "Structural Steel 1",
      },
      {
        url: "/src/assets/image/insite-images/equal-opportunity.png",
        alt: "Structural Steel 2",
      },
      {
        url: "/src/assets/image/insite-images/our-services.jpg",
        alt: "Structural Steel 3",
      },
      {
        url: "/src/assets/image/insite-images/simplified.jpg",
        alt: "Structural Steel 4",
      },
    ],
  },
];

function Portfolio() {
  return (
    <>
      <PageBanner {...bannerData} />
      <div className="m-28 my-10">
        {portfolioData?.map((portfolio, index) => {
          return (
            <section key={index} className="rounded-3xl mt-20 h-fit border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl">
              <div className="m-4 w-full h-96 flex flex-row flex-wrap justify-center items-center">
                <CarouselDefault />
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
