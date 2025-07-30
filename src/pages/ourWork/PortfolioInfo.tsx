import { PortfolioInfoPropType } from ".";
import { Link } from "react-router-dom";

function PortfolioInfo(prop: PortfolioInfoPropType) {
  console.log(prop, "==============Piddhhi+++++++++++++++");
  const firstFile = prop.file && prop.file.length > 0 ? prop.file[0] : null;

  const pdfDownloadURL = firstFile?.path
    ? `${import.meta.env.VITE_IMG_URL}${firstFile.path}`
    : "";

  return (
    <>
      <div className="bg-[#6abd45] rounded-xl md:order-1 order-first p-5 mx-5 text-white h-fit flex flex-col justify-between">
        <div className="flex flex-col flex-wrap">
          <div
            className="text-3xl"
         
          >
            {prop.title}
          </div>
          <div className="mx-1 my-3 text-lg text-justify">
            {prop.description}
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-center mt-5 mb-0 align-bottom md:flex-row">
         
          {pdfDownloadURL ? (
            <Link
              className="border-2 rounded-full border-white border-opacity-90 duration-200 ease-in-out text-md px-5 py-2 hover:bg-white hover:text-[#6abd45] hover:border-white hover:shadow-xl"
              to={pdfDownloadURL}
              target="_blank"
              rel="noopener noreferrer" 
            >
              Download PDF ➤
            </Link>
          ) : (
    
            <p className="text-white text-md">No PDF available for download.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioInfo;
