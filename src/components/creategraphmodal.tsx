import React, { useState, useEffect, useCallback } from "react";
import "../css/modal.css";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import * as XLSX from "xlsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// Import your PDFViewer component
import PDFViewer from "./PDFViewer";
// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Define the shape of each file's metadata
interface FileMetadata {
    filename: string;
    contentType: string;
    pdfUrl?: string;
    jsonContent?: any;
    rowData?: any[];
    columnDefs?: any[];
    viewerUrl?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    firebaseUid: string;
    selectedStoredFiles: { fileID: string; filename: string }[];
}

// File extension arrays
const jsonExtension = [".json"];
const pdfExtensions = [".pdf"];
const microsoftViewerExtensions = [".doc", ".docx", ".ppt", ".pptx"];
// CSV/Excel handled separately in code.

export default function CreateGraphModal(props: Props) {
    const [fileData, setFileData] = useState<FileMetadata[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    // Optional additional states if you use them in other parts of the component
    const [jsonContent, setJsonContent] = useState<any[]>([]);
    const [microsoftViewerUrl, setMicrosoftViewerUrl] = useState<
        Array<{ filename: string; viewerUrl: string }>
    >([]);

    // Fetch and process data from backend
    const fetchAndProcessData = useCallback(async () => {
        setLoading(true);
        setError(null); // Reset error state
        setFileData([]); // Reset file data
        setJsonContent([]); // Reset JSON content
        setMicrosoftViewerUrl([]); // Reset viewer URLs

        try {
            console.log("Fetching file data for fileIDs:", props.selectedStoredFiles);

            const response = await fetch("http://localhost:10000/api/getfilesbyID", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileIDs: props.selectedStoredFiles.map((file) => file.fileID),
                    firebaseUid: props.firebaseUid,
                    filenames: props.selectedStoredFiles.map((file) => file.filename),
                }),
            });

            const data = await response.json();
            console.log("API response data:", data);

            if (data?.files?.length > 0) {
                const processedFiles: FileMetadata[] = [];

                await Promise.all(
                    data.files.map(async (file: { filename: string; data: string }) => {
                        const filename = file.filename;
                        const fileUrl = file.data;

                        console.log("Processing file:", filename);

                        try {
                            // JSON files
                            if (jsonExtension.some((ext) => filename.toLowerCase().endsWith(ext))) {
                                console.log("Handling JSON file:", filename);
                                const jsonResponse = await fetch(fileUrl);
                                if (!jsonResponse.ok) {
                                    throw new Error(`Failed to fetch JSON file: ${filename}`);
                                }
                                const jsonData = await jsonResponse.json();
                                console.log("Fetched JSON content:", jsonData);

                                processedFiles.push({
                                    filename,
                                    contentType: "json",
                                    jsonContent: jsonData,
                                });

                                // CSV files
                            } else if (filename.toLowerCase().endsWith(".csv")) {
                                console.log("Handling CSV file:", filename);
                                const csvResponse = await fetch(fileUrl);
                                if (!csvResponse.ok) {
                                    throw new Error(`Failed to fetch CSV file: ${filename}`);
                                }
                                const textData = await csvResponse.text();
                                const rows = textData.split("\n").map((row) => row.split(","));
                                const headers = rows[0];
                                const rowData = rows.slice(1).map((row) =>
                                    headers.reduce((acc, header, index) => {
                                        return { ...acc, [header]: row[index] };
                                    }, {})
                                );

                                console.log("Parsed CSV data:", rowData);

                                if (rowData.length > 0) {
                                    const columns = headers.map((header) => ({
                                        field: header,
                                        headerName: header.toUpperCase(),
                                        sortable: true,
                                        filter: true,
                                        resizable: true,
                                    }));

                                    processedFiles.push({
                                        filename,
                                        contentType: "grid",
                                        rowData,
                                        columnDefs: columns,
                                    });
                                } else {
                                    throw new Error(`The CSV file "${filename}" is empty.`);
                                }

                                // Excel files
                            } else if (
                                filename.toLowerCase().endsWith(".xls") ||
                                filename.toLowerCase().endsWith(".xlsx")
                            ) {
                                console.log("Handling Excel file with Microsoft Viewer:", filename);
                                const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                                    fileUrl
                                )}`;
                                console.log("Microsoft Viewer URL for Excel:", viewerUrl);

                                processedFiles.push({
                                    filename,
                                    contentType: "microsoftViewer",
                                    viewerUrl,
                                });

                                // PDF files
                            } else if (pdfExtensions.some((ext) => filename.toLowerCase().endsWith(ext))) {
                                console.log("Handling PDF file:", filename);

                                processedFiles.push({
                                    filename,
                                    contentType: "pdf",
                                    pdfUrl: fileUrl,
                                });

                                // Microsoft Viewer file types
                            } else if (
                                microsoftViewerExtensions.some((ext) => filename.toLowerCase().endsWith(ext))
                            ) {
                                console.log("Handling Microsoft Viewer for file:", filename);
                                const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                                    fileUrl
                                )}`;
                                console.log("Microsoft Viewer URL:", viewerUrl);

                                processedFiles.push({
                                    filename,
                                    contentType: "microsoftViewer",
                                    viewerUrl,
                                });

                                // Unsupported
                            } else {
                                console.log("Unsupported file type:", filename);
                                setError(`Unsupported file type: ${filename}`);
                            }
                        } catch (err) {
                            if (err instanceof Error) {
                                console.error(`Error processing file "${filename}":`, err.message);
                                setError(`Error processing file "${filename}": ${err.message}`);
                            } else {
                                console.error(`Error processing file "${filename}":`, err);
                                setError(`Error processing file "${filename}": ${String(err)}`);
                            }
                        }
                    })
                );

                setFileData(processedFiles);
            } else {
                setError("No files found.");
            }
        } catch (error) {
            console.error("Error fetching or processing file data:", error);
            if (error instanceof Error) {
                setError(error.message || "An error occurred while loading the files.");
            } else {
                setError("An error occurred while loading the files.");
            }
        } finally {
            setLoading(false);
            console.log("Loading state set to false.");
        }
    }, [props.selectedStoredFiles, props.firebaseUid]);

    useEffect(() => {
        if (props.isOpen) {
            fetchAndProcessData();
        }
    }, [fetchAndProcessData, props.isOpen]);

    if (!props.isOpen) return null;

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
        {/* Modal Container */}
        <div className="flex bg-white rounded-lg shadow-2xl max-w-5xl w-full overflow-hidden relative">
          {/* Main Content */}
          <div className="flex-grow p-6">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              onClick={props.onClose}
              aria-label="Close Modal"
            >
              &times;
            </button>
      
            {/* Tabs for Multiple Files */}
            {fileData.length > 1 && (
              <div className="flex border-b border-gray-200 mb-6 space-x-4">
                {fileData.map((file, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-t-lg ${
                      index === activeTab
                        ? "text-blue-600 bg-blue-50 border border-b-0 border-gray-200"
                        : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {file.filename}
                  </button>
                ))}
              </div>
            )}
      
            {/* Conditional Content Rendering */}
            <div className="h-[600px] overflow-auto bg-gray-50 p-4 rounded-lg">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-500">
                  {error || "Something went wrong."}
                </p>
              ) : fileData[activeTab]?.contentType === "grid" ? (
                <div className="h-full">
                  <AgGridReact
                    rowData={fileData[activeTab]?.rowData || []}
                    columnDefs={fileData[activeTab]?.columnDefs || []}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                    }}
                  />
                </div>
              ) : fileData[activeTab]?.contentType === "microsoftViewer" ? (
                fileData[activeTab]?.viewerUrl ? (
                  <iframe
                    src={fileData[activeTab].viewerUrl}
                    className="w-full h-full border-none"
                    title="Microsoft Viewer"
                  ></iframe>
                ) : (
                  <p className="text-center text-gray-500">Loading viewer...</p>
                )
              ) : fileData[activeTab]?.contentType === "pdf" ? (
                <PDFViewer pdfUrl={fileData[activeTab]?.pdfUrl || ""} />
              ) : fileData[activeTab]?.contentType === "json" ? (
                <SyntaxHighlighter language="json" style={atomDark}>
                  {JSON.stringify(fileData[activeTab]?.jsonContent || {}, null, 2)}
                </SyntaxHighlighter>
              ) : (
                <p className="text-center text-gray-500">Unsupported file type.</p>
              )}
            </div>
          </div>
      
          {/* Sidebar */}
          <div className="w-24 bg-gray-100 border-l border-gray-200 flex flex-col items-center py-4">
            
          </div>
        </div>
      </div>
      
    );
}
