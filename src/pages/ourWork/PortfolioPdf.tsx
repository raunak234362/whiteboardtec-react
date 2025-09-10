import { PortfolioPropType } from "../../config/interface";

interface PortfolioPdfViewerProps {
  portfolio: PortfolioPropType;
}

function PortfolioPdfViewer({ portfolio }: PortfolioPdfViewerProps) {
  const file = Array.isArray(portfolio.file) ? portfolio.file[0] : null;

  if (!file?.fileName || !file?.path) {
    return (
      <div className="flex items-center justify-center h-full text-center text-gray-600 bg-gray-100 rounded-lg m-4">
        <p>No valid PDF to display for this item.</p>
      </div>
    );
  }

  const pdfURL = `${import.meta.env.VITE_IMG_URL}${
    file.path
  }?t=${Date.now()}&rand=${Math.random()}`;

  return (
    <div className="relative w-full h-full p-4">
      <object
        data={`${pdfURL}#toolbar=0&navpanes=0&scrollbar=1&zoom=auto`}
        type="application/pdf"
        width="100%"
        height="100%"
        title={`Portfolio PDF: ${file.fileName}`}
        aria-label={`Portfolio PDF: ${file.fileName}`}
        className="rounded-lg shadow-md"
      >
        <div className="flex items-center justify-center w-full h-full text-center text-gray-600 bg-gray-100 rounded-lg">
          <p>
            Your browser doesn't support PDFs. You can{" "}
            <a
              href={pdfURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              download the PDF
            </a>{" "}
            instead.
          </p>
        </div>
      </object>
    </div>
  );
}

export default PortfolioPdfViewer;
