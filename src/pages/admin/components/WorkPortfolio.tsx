import { useState } from "react";
import { PortfolioPropType } from "../../ourWork";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { set } from "firebase/database";

interface WorkPortfolioProps extends PortfolioPropType {
  onEdit:(portfolio: PortfolioPropType) => void;
  onDelete: (id: string) => void;
}


function WorkPortfolio({
  id,
  title: initialTitle, 
  description: initialDescription, 
  pdf: initialPdfUrl, 
  status: initialStatus, 
  onEdit, 
  onDelete, 
}: WorkPortfolioProps) {
  const [isOpenJob, setOpenJob] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [pdf, setPdf] = useState<File | null>(null); 
  const [status, setStatus] = useState(initialStatus); 
  const [progress, setProgress] = useState<number>(0);
  

  const handleFileChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0);
    const file = e.target.files?.[0];
    if (file) {
      setPdf(file);
      setProgress(100);
      
    }
    else {
      setPdf(null);
      setProgress(0);
      alert("Please select a valid PDF file.");
    }
  };

  const handleOpenEditModal = () => {
    onEdit({
      id,
      title: initialTitle,
      description: initialDescription,
      pdf: initialPdfUrl,
      status: initialStatus,
      
    });
  };
  

return (
    <>
      
      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
        {initialTitle} 
        </td>
        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
          {initialPdfUrl ? (
            <Link
              to={initialPdfUrl} 
              target="_blank"
              className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              View PDF
            </Link>
          ) : (
            "No PDF"
          )}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              
              onEdit({
                id,
                title: initialTitle,
                description: initialDescription,
                pdf: initialPdfUrl,
                status: initialStatus,
              });
            }}
            className="inline-flex items-center mr-4 text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
            
              onDelete(id);
            }}
            className="inline-flex items-center text-sm font-semibold text-red-600 border border-transparent rounded-lg gap-x-2 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default WorkPortfolio;
