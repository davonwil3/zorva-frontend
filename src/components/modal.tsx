import React, { useState, useEffect, useCallback } from "react";
import "../css/modal.css";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLightbulbOn, faChartLineUp, faFileChartPie } from "@fortawesome/pro-light-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Import your PDFViewer component
import PDFViewer from "./PDFViewer"; // Adjust the path based on your project structure

interface FileMetadata {
    id: string;
    filename: string;
    created_at: string;
    usage_bytes: number;
    data: any;
}

export default function Modal(props: any) {
    const [fileData, setFileData] = useState<FileMetadata[]>([]);
    const [rowData, setRowData] = useState<any[]>([]);
    const [columnDefs, setColumnDefs] = useState<any[]>([]);
    const [microsoftViewerUrl, setMicrosoftViewerUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [jsonContent, setJsonContent] = useState<object | null>(null);
    const [contentType, setContentType] = useState<string>(""); // Determines which content to display
    const [error, setError] = useState<string | null>(null); // To handle errors

    ModuleRegistry.registerModules([AllCommunityModule]);

    // Define file extension arrays
    const jsonExtension = [".json"];
    const csvOrExcelExtensions = [".csv", ".xls", ".xlsx"];
    const pdfExtensions = [".pdf"];
    const microsoftViewerExtensions = [".doc", ".docx", ".ppt", ".pptx"]; // Removed ".pdf"

    // Fetch function without debounce
    const fetchAndProcessData = useCallback(async () => {
        setLoading(true);
        setError(null); // Reset error state
        setContentType(""); // Reset content type
        setMicrosoftViewerUrl(null); // Reset viewer URL

        try {
            console.log("Fetching file data for fileID:", props.selectedRow.fileID);
            // Fetch file data
            const response = await fetch("http://localhost:10000/api/getfilesbyID", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileIDs: [props.selectedRow.fileID],
                    firebaseUid: props.firebaseUid,
                }),
            });
            const data = await response.json();
            console.log("API response data:", data);

            if (data?.files?.length > 0) {
                setFileData(data.files);
                const file = data.files[0];
                const filename = props.selectedRow.filename;
                const fileUrl = file.data;

                console.log("Signed URL:", fileUrl);

                // Determine file type
                if (jsonExtension.some((ext) => filename.toLowerCase().endsWith(ext))) {
                    // Handle JSON files
                    console.log("Handling JSON file:", filename);
                    const jsonResponse = await fetch(fileUrl);
                    if (!jsonResponse.ok) {
                        throw new Error("Failed to fetch JSON file.");
                    }
                    const jsonData = await jsonResponse.json();
                    console.log("Fetched JSON content:", jsonData);
                    setJsonContent(jsonData);
                    setContentType("json");
                } else if (csvOrExcelExtensions.some((ext) => filename.toLowerCase().endsWith(ext))) {
                    // Handle CSV or Excel files
                    console.log("Handling CSV/Excel file:", filename);
                    const arrayBuffer = await (await fetch(fileUrl)).arrayBuffer();
                    const workbook = XLSX.read(arrayBuffer, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                    console.log("Parsed sheet data:", sheetData);

                    if (sheetData.length > 0) {
                        const columns = Object.keys(sheetData[0] as object).map((key) => ({
                            field: key,
                            headerName: key.toUpperCase(),
                            sortable: true,
                            filter: true,
                            resizable: true,
                        }));
                        setColumnDefs(columns);
                        setRowData(sheetData);
                        setContentType("grid");
                    } else {
                        setError("The file is empty.");
                    }
                } else if (pdfExtensions.some((ext) => filename.toLowerCase().endsWith(ext))) {
                    // Handle PDF files using PDFViewer
                    console.log("Handling PDF file:", filename);
                    setContentType("pdf");
                } else if (microsoftViewerExtensions.some((ext) => filename.toLowerCase().endsWith(ext))) {
                    // Handle files viewable by Microsoft Office Online Viewer
                    console.log("Handling Microsoft Viewer for file:", filename);
                    const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
                    console.log("Microsoft Viewer URL:", viewerUrl);
                    setMicrosoftViewerUrl(viewerUrl);
                    setContentType("microsoftViewer");
                } else {
                    // Unsupported file type
                    console.log("Unsupported file type:", filename);
                    setError("Unsupported file type.");
                }
            } else {
                setError("No files found.");
            }
        } catch (error: any) {
            console.error("Error fetching or processing file data:", error);
            setError(error.message || "An error occurred while loading the file.");
        } finally {
            setLoading(false);
            console.log("Loading state set to false.");
        }
    }, [props.selectedRow.fileID, props.firebaseUid, props.selectedRow.filename]);

    useEffect(() => {
        if (props.isOpen) {
            fetchAndProcessData();
        }

        // No debounce cleanup needed
    }, [fetchAndProcessData, props.isOpen]);

    if (!props.isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-and-sidebar">
                <div className="modal-container">
                    <button className="modal-close" onClick={props.onClose}>
                        &times;
                    </button>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>No details available or unsupported file type: {error}</p>
                    ) : contentType === "grid" ? (
                        <div className="modal-grid-container" style={{ height: 700, width: "100%" }}>
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={{
                                    sortable: true,
                                    filter: true,
                                    resizable: true,
                                }}
                            />
                        </div>
                    ) : contentType === "microsoftViewer" ? (
                        microsoftViewerUrl ? (
                            <iframe
                                key={microsoftViewerUrl} // Forces re-render when URL changes
                                src={microsoftViewerUrl}
                                style={{ width: "100%", height: "700px", border: "none" }}
                                title="Microsoft Office Viewer"
                                onError={(e) => {
                                    console.error("Iframe Load Error:", e);
                                    setError("Failed to load document in viewer.");
                                }}
                                onLoad={() => {
                                    console.log("Iframe loaded successfully.");
                                }}
                            ></iframe>
                        ) : (
                            <p>Loading viewer...</p>
                        )
                    ) : contentType === "pdf" ? (
                        <PDFViewer pdfUrl={fileData[0].data} />
                    ) : contentType === "json" ? (
                        <div
                            style={{
                                background: "#f9f9f9",
                                padding: "15px",
                                borderRadius: "8px",
                                overflow: "auto",
                                height: "700px",
                            }}
                        >
                            <SyntaxHighlighter language="json" style={atomDark}>
                                {JSON.stringify(jsonContent, null, 2)}
                            </SyntaxHighlighter>
                        </div>
                    ) : (
                        <p>No details available or unsupported file type.</p>
                    )}
                </div>
                <div className="modal-sidebar">
                    <div className="modal-sidebar-element">
                        <FontAwesomeIcon className="menu-icon" icon={faLightbulbOn as IconProp} />
                        <p>Insights</p>
                    </div>
                    <div className="modal-sidebar-element">
                        <FontAwesomeIcon className="menu-icon" icon={faFileChartPie as IconProp} />
                        <p>Reports</p>
                    </div>
                    <div className="modal-sidebar-element">
                        <FontAwesomeIcon className="menu-icon" icon={faChartLineUp as IconProp} />
                        <p>Graphs</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
