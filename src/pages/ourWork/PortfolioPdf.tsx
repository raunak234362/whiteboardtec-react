import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

// Set the worker source using a local worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PortfolioPdf({ pdfURL }: { pdfURL: string }) {
  console.log("Loading PDF from:", pdfURL);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to the first page when a new document is loaded
  };

  const setNextPage = () => {
    setPageNumber((prev) => (prev < numPages ? prev + 1 : 1)); // Loop back to the first page
  };

  const setPrevPage = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : numPages)); // Loop back to the last page
  };

  return (
    <div className="relative w-full h-full">
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={setPrevPage}
          className="rounded-full p-2 bg-black/20 text-white cursor-pointer"
          aria-label="Previous Page"
        >
          <BsChevronCompactLeft size={30} />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={setNextPage}
          className="rounded-full p-2 bg-black/20 text-white cursor-pointer"
          aria-label="Next Page"
        >
          <BsChevronCompactRight size={30} />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="flex justify-center items-center w-full h-full">
        <Document
          file={pdfURL}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Failed to load PDF:", error)}
          loading={<div>Loading PDF...</div>} // Use a fallback component
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            width={window.innerWidth > 768 ? 720 : undefined}
          />
        </Document>
      </div>

      {/* Page navigation indicator */}
      <div className="text-center mt-2 text-gray-700">
        Page {pageNumber} of {numPages}
      </div>
    </div>
  );
}

export default PortfolioPdf;
