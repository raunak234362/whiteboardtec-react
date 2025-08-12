import { useState } from "react";
import { pdfjs } from "react-pdf";
import { PortfolioPropType } from "../../config/interface";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";


function PortfolioPdf({ portfolio }: { portfolio: PortfolioPropType[] }) {
  
  const firstPdf = portfolio && portfolio.length > 0 ? portfolio[0] : undefined;
  console.log("PortfolioPdf component loaded with pdfFiles:", firstPdf);
  const id = firstPdf?.id;
  const file_id = Array.isArray(firstPdf?.file)
    ? firstPdf.file[0]?.fileName?.replace(/\.pdf$/i, "")
    : undefined;

  console.log(
    "PortfolioPdf component loaded with id:",
    id,
    "and file_id:",
    file_id
  );


  const [error] = useState<string | null>(null);
  const pdfURL =
    firstPdf?.file[0]?.path
      ? `${import.meta.env.VITE_IMG_URL}${firstPdf.file[0].path}`
      : "";
 

  return (
    <div className="relative w-full h-full">
      {error && (
        <div className="absolute top-0 left-0 right-0 z-10 p-2 text-center text-white bg-red-500">
          {error}
        </div>
      )}

      {pdfURL && !error ? (
        <div className="flex items-center justify-center w-full h-full">
          <iframe
            src={pdfURL + "#toolbar=0&navpanes=0&scrollbar=1&zoom=auto"}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Portfolio PDF"
            allowFullScreen
          >
            Your browser does not support PDFs. You can{" "}
            <a href={pdfURL} target="_blank" rel="noopener noreferrer">
              download the PDF
            </a>{" "}
            instead.
          </iframe>
        </div>
      ) : (
   
        !error && (
          <div className="flex items-center justify-center w-full h-full text-center text-gray-600">
            <p>No PDF to display.</p>
          </div>
        )
      )}
    </div>
  );
}

export default PortfolioPdf;
