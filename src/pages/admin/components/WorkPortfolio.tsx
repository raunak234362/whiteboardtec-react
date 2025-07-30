import { useState } from "react";
import { PortfolioPropType } from "../../ourWork";

interface WorkPortfolioProps extends PortfolioPropType {
  onEdit: (portfolio: PortfolioPropType) => void;
  onDelete: (id: string) => void;
}

function WorkPortfolio({
  id,
  title,
  description,
  pdf,
  status,
  onEdit,
  onDelete,
}: WorkPortfolioProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
console.log(pdf)
  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {title}
        </td>

        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap max-w-[250px] truncate">
          {description || "No description"}
        </td>

        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
          {pdf ? (
            <button
              onClick={handleOpenModal}
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              View PDF
            </button>
          ) : (
            "No PDF"
          )}
        </td>

        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
          <button
            onClick={() => onEdit({ id, title, description, pdf, status })}
            className="mr-2 text-green-600 hover:text-green-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Modal for PDF Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-[90%] h-[90%] bg-white rounded-lg shadow-lg p-4">
            <button
              onClick={handleCloseModal}
              className="absolute text-xl font-bold text-gray-700 top-3 right-3 hover:text-red-600"
            >
              &times;
            </button>
            <iframe
              src={`${import.meta.env.VITE_IMG_URL}${pdf[0].path}`}
              title="PDF Viewer"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default WorkPortfolio;
