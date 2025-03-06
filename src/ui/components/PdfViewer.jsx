import { useState, useRef } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PdfViewer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const iframeRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const fileURL = e.target.result;
        setPdfFile(fileURL);
        setShowPdf(false);
      };
  
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };
  

  const handlePrint = () => {

    if (!pdfFile) {
      alert("No PDF file selected to print.");
      return;
    }

    if (window.electron) {
      window.electron.send("print-pdf", pdfFile);
    } else {
      if (iframeRef.current) {
        iframeRef.current.src = pdfFile;
        

        iframeRef.current.onload = () => {
          setTimeout(() => {
            iframeRef.current.contentWindow.print();
          }, 500); 
        };
      } else {
        alert("Failed to load PDF for printing.");
      }
    }
  };
  

  return (
    <div className="view-container">
      <h2>📄 PDF Viewer</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="file-input"/>
      
      {pdfFile && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setShowPdf(true)} style={{ marginRight: "10px", padding: "5px" }}>
            View PDF
          </button>
          <button onClick={handlePrint} style={{ padding: "5px" }}>
            Print PDF
          </button>
        </div>
      )}

      {showPdf && pdfFile && (
        <div>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
      <iframe ref={iframeRef} style={{ display: "none" }} title="Print Frame"></iframe>
    </div>
  );
};

export default PdfViewer;

