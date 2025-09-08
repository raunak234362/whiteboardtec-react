import { useMemo } from "react";
import { PortfolioPropType } from "../../config/interface";

interface PortfolioPdfProps {
  portfolio: PortfolioPropType | PortfolioPropType[];
}

function PortfolioPdf({ portfolio }: PortfolioPdfProps) {
  // Normalize portfolio to always be an array
  const portfolioArray = Array.isArray(portfolio) ? portfolio : [portfolio];

  // Log portfolio for debugging
  console.log("Portfolio prop:", portfolioArray);

  // Group portfolio items by fileName but keep the backend path
  const groupedPortfolio = useMemo(() => {
    const map = new Map<
      string,
      { fileName: string; path: string; owners: PortfolioPropType[] }
    >();

    portfolioArray.forEach((item) => {
      const file = Array.isArray(item.file) ? item.file[0] : null;
      if (!file?.fileName || !file?.path) {
        console.warn("Skipping invalid portfolio item:", item);
        return;
      }

      const key = file.fileName.trim().toLowerCase();

      if (!map.has(key)) {
        map.set(key, {
          fileName: file.fileName,
          path: file.path,
          owners: [item],
        });
      } else {
        map.get(key)?.owners.push(item);
      }
    });

    const result = Array.from(map.values());
    console.log("Grouped portfolio:", result);
    return result;
  }, [portfolioArray]);

  // Validate portfolio prop
  if (!portfolioArray || portfolioArray.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-center text-gray-600">
        <p>No valid portfolio data to display.</p>
      </div>
    );
  }

  if (groupedPortfolio.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-center text-gray-600">
        <p>No valid PDFs to display.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full space-y-10">
      {groupedPortfolio.map(({ fileName, path, owners }) => {
        const fileId = fileName.replace(/\.pdf$/i, "") ?? "Unknown";
        const pdfURL = `${
          import.meta.env.VITE_IMG_URL
        }${path}?t=${Date.now()}&rand=${Math.random()}`;

        console.log("Rendering PDF:", {
          fileName,
          fileId,
          pdfURL,
          path,
          owners: owners.map((o) => o.id),
        });

        return (
          <div
            key={fileName.toLowerCase()}
            className="flex flex-col w-full h-[600px] border rounded-xl shadow p-4 bg-white"
          >
          
            <object
              data={`${pdfURL}#toolbar=0&navpanes=0&scrollbar=1&zoom=auto`}
              type="application/pdf"
              width="100%"
              height="100%"
              title={`Portfolio PDF ${fileId}`}
              aria-label={`Portfolio PDF ${fileId}`}
            >
              <p className="text-center text-gray-600">
                Your browser does not support PDFs. You can{" "}
                <a
                  href={pdfURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  download the PDF
                </a>{" "}
                instead.
              </p>
            </object>
          </div>
        );
      })}
    </div>
  );
}

export default PortfolioPdf;
