import { Link } from "react-router-dom";
import { PortfolioPropType } from "../../config/interface";

interface PortfolioInfoProps {
  selectedPortfolio: PortfolioPropType;
}

function PortfolioInfo({ selectedPortfolio }: PortfolioInfoProps) {
  const firstFile =
    selectedPortfolio?.file && selectedPortfolio.file.length > 0
      ? selectedPortfolio.file[0]
      : null;
  const pdfDownloadURL = firstFile?.path
    ? `${import.meta.env.VITE_IMG_URL}${firstFile.path}`
    : "";

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
        File Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
        <div>
          <p className="font-semibold text-gray-900">Title:</p>
          <p>{selectedPortfolio.title}</p>
        </div>
        {/* <div>
          <p className="font-semibold text-gray-900">File Name:</p>
          <p>{firstFile?.fileName || "N/A"}</p>
        </div> */}
        {/* <div>
          <p className="font-semibold text-gray-900">Description:</p>
          <p>{selectedPortfolio.description || "No description provided."}</p>
        </div> */}
        {firstFile?.size && (
          <div>
            <p className="font-semibold text-gray-900">Size:</p>
            <p>{(firstFile.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
        {/* You can add more info here, e.g., created date, tags */}
      </div>

      <div className="mt-6 pt-4 border-t flex justify-end">
        {pdfDownloadURL ? (
          <Link
            className="inline-flex items-center justify-center bg-[#6abd45] text-white rounded-full px-6 py-3 text-md font-semibold hover:bg-green-700 transition-colors shadow-lg"
            to={pdfDownloadURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
            <span className="ml-2">⬇️</span>
          </Link>
        ) : (
          <p className="text-sm text-gray-500">
            No PDF available for download.
          </p>
        )}
      </div>
    </div>
  );
}

export default PortfolioInfo;
