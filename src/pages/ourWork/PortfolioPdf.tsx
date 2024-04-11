import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

function PortfolioPdf({pdfURL}: {pdfURL: string}) {
    const [pdf, setPdf] = useState<any>(null);

    const [numPage, setNumPage] = useState<number|null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({numPages}: {numPages: number}) {
        setNumPage(numPages);
        setPageNumber(1);
    }

    const loadPdf = async() => {
        const response = await fetch(pdfURL);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const pdfFile = await pdfjs.getDocument(url);
        setPdf(pdfFile);
    }

    useEffect(() => {
        loadPdf();
    }, []);

    return (
        <>
            <div>
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}> {/* Add onLoadError event handler */}
                    <Page pageNumber={pageNumber} className="h-full"/>
                </Document>
            </div>
        </>
    )
}

export default PortfolioPdf