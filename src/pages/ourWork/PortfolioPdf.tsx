import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf"; // Still good to keep if you plan to use react-pdf for more advanced features later
import { PortfolioPropType } from "../../config/interface";
import Service from "../../config/service";

// Set the worker source using a local worker (important for react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// Define the type for a single PDF file object, assuming it comes from Cloudinary or similar
interface PdfFile {
  fileName: string;
  originalName: string;
  path: string;
  public_id: string;
  secureUrl: string; // This is the URL we'll use
  // Add any other properties your file objects might have
}

// Update the prop type to be an array of PdfFile objects
function PortfolioPdf({ pdfFiles }: { pdfFiles: PortfolioPropType[] }) {
  const id = pdfFiles?.id;
  const file_id= pdfFiles?.file?.id
  const fetchPortfolioFile = async () => {
    try {
      const response = await Service.getPortfolioPdf(id, file_id);
      console.log(response);
    } catch (error) {
      alert("Bhaang Bhosda Hogya");
    }
  };

  useEffect(() => {
    fetchPortfolioFile
  },[])
  // Renamed pdfURL to pdfFiles for clarity
  console.log("Loading PDF from:", pdfFiles);

  const [displayPdfUrl, setDisplayPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   setDisplayPdfUrl(null); // Reset for new pdfFiles prop

  //   if (!pdfFiles || pdfFiles.length === 0) {
  //     setError("No PDF files provided.");
  //     setLoading(false);
  //     return;
  //   }

  // Safely access the secureUrl from the first item in the array
  // const candidatePdfUrl = pdfFiles[0]?.secureUrl;

  // if (!candidatePdfUrl) {
  //   setError("The first PDF file object is missing a 'secureUrl'.");
  //   setLoading(false);
  //   return;
  // }

  // Basic validation to check if it looks like a PDF URL
  // if (
  //   !candidatePdfUrl.endsWith(".pdf") &&
  //   !candidatePdfUrl.includes("type=pdf")
  // ) {
  //   console.warn("The provided URL might not be a PDF:", candidatePdfUrl);
  // You might set an error here too if you strictly only want PDFs
  // setError(`URL does not appear to be a PDF: ${candidatePdfUrl}`);
  // setLoading(false);
  // return;
  // }

  // Check if the URL is valid by trying to fetch its headers (HEAD request is more efficient)
  //   fetch(candidatePdfUrl, { method: "HEAD" })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const contentType = response.headers.get("Content-Type");
  //       if (contentType && !contentType.includes("application/pdf")) {
  //         console.warn(
  //           `URL ${candidatePdfUrl} returned Content-Type: ${contentType}, expected application/pdf.`
  //         );
  //         // You might still show it in an iframe, but warn the developer
  //         // setError(`URL does not appear to be a PDF (Content-Type: ${contentType}).`);
  //       }
  //       setDisplayPdfUrl(candidatePdfUrl); // Set the URL to be used in the iframe
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(
  //         `Failed to access PDF URL: ${error.message}. Please check the URL and network.`
  //       );
  //       setLoading(false);
  //     });
  // }, [pdfFiles]); // Depend on pdfFiles prop

  // if (loading) {
  //   return (
  //     <div className="relative flex items-center justify-center w-full h-full">
  //       <p>Loading PDF...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="relative w-full h-full">
      {error && (
        <div className="absolute top-0 left-0 right-0 z-10 p-2 text-center text-white bg-red-500">
          {error}
        </div>
      )}

      {/* PDF Viewer - only render iframe if no fatal error and a URL is set */}
      {displayPdfUrl && !error ? (
        <div className="flex items-center justify-center w-full h-full">
          <iframe
            src={displayPdfUrl + "#toolbar=0&navpanes=0&scrollbar=1&zoom=auto"}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Portfolio PDF"
            allowFullScreen
          >
            Your browser does not support PDFs. You can{" "}
            <a href={displayPdfUrl} target="_blank" rel="noopener noreferrer">
              download the PDF
            </a>{" "}
            instead.
          </iframe>
        </div>
      ) : (
        // Fallback message if no PDF can be displayed (e.g., due to error or no valid URL)
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
