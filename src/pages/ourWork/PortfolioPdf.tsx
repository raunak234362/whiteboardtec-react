import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function PortfolioPdf({ pdfURL }: { pdfURL: string }) {

  const [numPage, setNumPage] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [pdfData, setPdfData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
        console.log(pdfURL);
      const response = await fetch(pdfURL, {mode:"no-cors"});
      console.log(response);
      const data = await response.blob(); // Get the binary data
      setPdfData(data);
    };

    fetchData();
  }, [pdfURL]);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPage(numPages);
    setPageNumber(1);
    console.log("numPages", numPages);
  }

  function setNextPage() {
    if (pageNumber < numPage) {
      setPageNumber(pageNumber + 1);
    } else {
      setPageNumber(1);
    }
  }

  function setPrevPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(numPage);
    }
  }

  return (
    <>
          <div className=" rounded-full p-2 bg-black/20 text-white cursor-pointer h-fit z-10 w-fit absolute left-5 top-[50%]">
            <BsChevronCompactLeft onClick={setPrevPage} size={30} />
          </div>
          <div className=" rounded-full p-2 bg-black/20 text-white cursor-pointer h-fit z-10 w-fit absolute right-[41%] top-[50%]">
            <BsChevronCompactRight onClick={setNextPage} size={30} />
        </div>
      <div className="my-4 w-full pb-5 flex flex-row flex-wrap justify-center items-center overflow-y-hidden">
        <div className="flex flex-row w-full justify-center">

          <Document
            file={pdfData}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          {/* <embed src={pdfURL} type="application/pdf" width="200%" height="100%" /> */}

        </div>
      </div>
         
    </>
  );
}

export default PortfolioPdf;
