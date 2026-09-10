import { useState } from "react";
import { PortfolioPropType } from "../../../config/interface";

interface WorkPortfolioProps extends PortfolioPropType {
  onEdit: (portfolio: PortfolioPropType) => void;
  onDelete: (id: string) => void;
}

function WorkPortfolio({
  id,
  title,
  description,
  file,
  status,
  onEdit,
  onDelete,
}: WorkPortfolioProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-150">
        <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
          {title}
        </td>

        <td className="px-6 py-4 text-sm text-gray-650 max-w-[250px] truncate">
          {description || "No description"}
        </td>

        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
          {file && file.length > 0 ? (
            <button
              onClick={handleOpenModal}
              className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors font-medium"
            >
              View PDF
            </button>
          ) : (
            <span className="text-gray-400">No PDF</span>
          )}
        </td>

        <td className="px-6 py-4 text-sm text-center space-x-2 whitespace-nowrap">
          <button
            onClick={() => {
              return onEdit({ id, title, description, status, file });
            }}
            className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id!)}
            className="px-2 py-1 text-sm text-red-600 border border-red-650 rounded hover:bg-red-50 transition-colors font-medium"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Modal for PDF Preview */}
      {isModalOpen && file && file.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-[90%] h-[90%] bg-white rounded-xl shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-150 pb-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                Document Viewer: <span className="text-gray-500">{file[0].fileName || "Portfolio PDF"}</span>
              </h3>
              <button
                onClick={handleCloseModal}
                className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
              >
                Close
              </button>
            </div>
            <div className="flex-grow">
              <iframe
                src={`${import.meta.env.VITE_IMG_URL}${file[0].path}`}
                title="PDF Viewer"
                className="w-full h-full border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorkPortfolio;
