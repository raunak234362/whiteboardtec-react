import { PortfolioInfoPropType } from ".";
import { Link } from "react-router-dom";

function PortfolioInfo(prop: PortfolioInfoPropType) {
  return (
    <>
      <div className="bg-[#6abd45] rounded-xl md:order-1 order-first p-5 mx-5 text-white h-fit flex flex-col justify-between">
        <div className="flex flex-wrap flex-col">
          <div
            className="text-3xl"
            // style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
          >
            {prop.title}
          </div>
          <div className="mx-1 my-3 text-lg text-justify">
            {prop.description}
          </div>
        </div>
        <div className="mt-5 mb-0 flex flex-wrap flex-col md:flex-row items-center align-bottom">
          <Link
            className="border-2 rounded-full border-white border-opacity-90 duration-200 ease-in-out text-md px-5 py-2 hover:bg-white hover:text-[#6abd45] hover:border-white hover:shadow-xl"
            to={prop.pdf}
            target="_blank"
          >
            Download PDF ➤
          </Link>
        </div>
      </div>
    </>
  );
}

export default PortfolioInfo;
