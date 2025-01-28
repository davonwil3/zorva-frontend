import React, { useState, useEffect, useCallback } from "react";
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
                    filenames: [props.selectedRow.filename],
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
                } else if (filename.toLowerCase().endsWith(".csv")) {
                    // Handle CSV files using the grid
                    console.log("Handling CSV file:", filename);
                    const response = await fetch(fileUrl);
                    if (!response.ok) {
                        throw new Error("Failed to fetch CSV file.");
                    }
                    const textData = await response.text();
                    const rows = textData.split("\n").map((row) => row.split(","));
                    const headers = rows[0];
                    const rowData = rows.slice(1).map((row) =>
                        headers.reduce(
                            (acc, header, index) => ({
                                ...acc,
                                [header]: row[index],
                            }),
                            {}
                        )
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
                        setColumnDefs(columns);
                        setRowData(rowData);
                        setContentType("grid");
                    } else {
                        setError("The CSV file is empty.");
                    }
                } else if (
                    filename.toLowerCase().endsWith(".xls") ||
                    filename.toLowerCase().endsWith(".xlsx")
                ) {
                    // Handle Excel files using Microsoft Viewer
                    console.log("Handling Excel file with Microsoft Viewer:", filename);
                    const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        fileUrl
                    )}`;
                    console.log("Microsoft Viewer URL for Excel:", viewerUrl);
                    setMicrosoftViewerUrl(viewerUrl);
                    setContentType("microsoftViewer");
                } else if (
                    pdfExtensions.some((ext) => filename.toLowerCase().endsWith(ext))
                ) {
                    // Handle PDF files using PDFViewer
                    console.log("Handling PDF file:", filename);
                    setContentType("pdf");
                } else if (
                    microsoftViewerExtensions.some((ext) => filename.toLowerCase().endsWith(ext))
                ) {
                    // Handle files viewable by Microsoft Office Online Viewer
                    console.log("Handling Microsoft Viewer for file:", filename);
                    const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        fileUrl
                    )}`;
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="flex bg-white rounded-lg shadow-2xl max-w-6xl w-full overflow-hidden relative">
                {/* Main Content */}
                <div className="flex-grow p-6">
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                        onClick={props.onClose}
                        aria-label="Close Modal"
                    >
                        &times;
                    </button>

                    {/* Conditional Content */}
                    <div className="h-[650px] overflow-auto bg-gray-50 p-4 rounded-lg">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">
                                No details available or unsupported file type: {error}
                            </p>
                        ) : contentType === "grid" ? (
                            <div className="h-full w-full">
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
                                    src={microsoftViewerUrl}
                                    className="w-full h-full border-none"
                                    title="Microsoft Office Viewer"
                                    onError={(e) => {
                                        console.error("Iframe Load Error:", e);
                                        setError("Failed to load document in viewer.");
                                    }}
                                ></iframe>
                            ) : (
                                <p className="text-center text-gray-500">Loading viewer...</p>
                            )
                        ) : contentType === "pdf" ? (
                            <PDFViewer pdfUrl={fileData[0]?.data || ""} />
                        ) : contentType === "json" ? (
                            <div className="bg-gray-100 p-4 rounded-lg overflow-auto h-96">
                                <SyntaxHighlighter language="json" style={atomDark}>
                                    {JSON.stringify(jsonContent, null, 2)}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No details available or unsupported file type.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-24 bg-gray-100 border-l border-gray-200 flex flex-col items-center py-4 space-y-6">
                    {/* Sidebar Items */}
                    <div className="flex flex-col items-center cursor-pointer p-3 hover:bg-gray-200 rounded-lg">
                        <FontAwesomeIcon
                            className="text-xl text-yellow-500 mb-2"
                            icon={faLightbulbOn as IconProp}
                        />
                        <p className="text-sm text-gray-600 font-medium">Insights</p>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer p-3 hover:bg-gray-200 rounded-lg">
                        <FontAwesomeIcon
                            className="text-xl text-blue-500 mb-2"
                            icon={faFileChartPie as IconProp}
                        />
                        <p className="text-sm text-gray-600 font-medium">Reports</p>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer p-3 hover:bg-gray-200 rounded-lg">
                        <FontAwesomeIcon
                            className="text-xl text-green-500 mb-2"
                            icon={faChartLineUp as IconProp}
                        />
                        <p className="text-sm text-gray-600 font-medium">Graphs</p>
                    </div>
                </div>
            </div>
        </div>

    );
}
