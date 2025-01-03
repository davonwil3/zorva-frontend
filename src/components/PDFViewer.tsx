import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div
      style={{
        height: "700px", // Set a fixed height for the viewer
        width: "100%", // Constrain the width to a percentage of the modal
        margin: "0 auto", // Center the viewer within the container
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: "8px",
        border: "1px solid #ddd", // Optional border for better appearance
        backgroundColor: "#fff",
        padding: "9px",
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfUrl}
          defaultScale={1.2} // Adjust the zoom level
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;

