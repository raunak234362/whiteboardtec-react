import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";

// Set the worker source using a local worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PortfolioPdf({ pdfURL }: { pdfURL: string }) {
  console.log("Loading PDF from:", pdfURL);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the URL is valid
    fetch(pdfURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch((error) => {
        setError(`Failed to fetch PDF: ${error.message}`);
      });
  }, [pdfURL]);


  return (
    <div className="relative w-full h-full">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}
    
      {/* PDF Viewer */}
      <div className="flex justify-center items-center w-full h-full">
      
 <iframe
        src={pdfURL+"#toolbar=0&navpanes=0&scrollbar=1&zoom=auto"}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
      </div>

    
    </div>
  );
}

export default PortfolioPdf;
