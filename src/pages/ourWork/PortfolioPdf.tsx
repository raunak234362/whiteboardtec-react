import { useState } from "react";
import { pdfjs } from "react-pdf";
import { PortfolioPropType } from "../../config/interface";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PortfolioPdf({ portfolio }: { portfolio: PortfolioPropType[] }) {
  const [error] = useState<string | null>(null);
  if (!portfolio || portfolio.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-center text-gray-600">
        <p>No PDF to display.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full space-y-6">
      {error && (
        <div className="absolute top-0 left-0 right-0 z-10 p-2 text-center text-white bg-red-500">
          {error}
        </div>
      )}

      {portfolio.map((item) => {
        const file_id = Array.isArray(item.file)
          ? item.file[0]?.fileName?.replace(/\.pdf$/i, "")
          : undefined;

        // ✅ Add unique query param so iframe does not reuse cache
        const pdfURL = item.file?.[0]?.path
          ? `${import.meta.env.VITE_IMG_URL}${item.file[0].path}?id=${item.id}`
          : "";

        console.log("Rendering portfolio PDF with:", {
          file_id,
        });

        return (
          <div key={item.id} className="flex flex-col w-full h-[600px]">
            <h3 className="mb-2 text-lg font-semibold">PDF ID: {file_id}</h3>
            {pdfURL && !error ? (
              <iframe
                src={pdfURL + "#toolbar=0&navpanes=0&scrollbar=1&zoom=auto"}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title={`Portfolio PDF ${file_id}-${item.id}`} // ✅ unique title
                allowFullScreen
              >
                Your browser does not support PDFs. You can{" "}
                <a href={pdfURL} target="_blank" rel="noopener noreferrer">
                  download the PDF
                </a>{" "}
                instead.
              </iframe>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-center text-gray-600">
                <p>No PDF to display.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PortfolioPdf;
