import React, { useState, useEffect } from "react";
import "../css/modal.css";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import * as XLSX from "xlsx";
import { themeQuartz } from "ag-grid-community";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLightbulbOn } from "@fortawesome/pro-light-svg-icons";
import { faChartLineUp, faFileChartPie } from "@fortawesome/pro-light-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";


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
    const [googleViewerUrl, setGoogleViewerUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [jsonContent, setJsonContent] = useState<object | null>(null);

    ModuleRegistry.registerModules([AllCommunityModule]);

    const myTheme = themeQuartz.withParams({
        /* Low spacing = very compact */
        spacing: 2,
        /* Changes the color of the grid text */
        foregroundColor: "rgb(14, 68, 145)",
        /* Changes the color of the grid background */
        backgroundColor: "rgb(241, 247, 255)",
        /* Changes the header color of the top row */
        headerBackgroundColor: "rgb(228, 237, 250)",
        /* Changes the hover color of the row */
        rowHoverColor: "rgb(216, 226, 255)",
    });

    useEffect(() => {
        if (!props.selectedRow || !props.selectedRow.fileID) return;

        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:10000/api/getfilesbyID", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fileIDs: [props.selectedRow.fileID],
                        firebaseUid: props.firebaseUid,
                    }),
                });
                const data = await response.json();
                setFileData(data.files);
                console.log(data.files);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [props.selectedRow.fileID]);

    useEffect(() => {
        if (fileData.length > 0) {
            const processFileData = async () => {
                try {
                    const file = fileData[0];
                    const jsonExtension = [".json"];
                    const csvOrExcelExtensions = [".csv", ".xls", ".xlsx"];
                    const googleViewerExtensions = [
                        ".pdf",
                        ".doc",
                        ".docx",
                        ".ppt",
                        ".pptx",
                    ];

                    // Handle JSON files
                    if (jsonExtension.some((ext) => file.filename.endsWith(ext))) {
                        console.log("JSON file detected:", file.filename);

                        const response = await fetch(file.data);
                        const jsonData = await response.json();

                        // Set JSON content for React Syntax Highlighter
                        setJsonContent(jsonData);
                        setIsGridVisible(false);
                        setGoogleViewerUrl(null);
                        return; // Exit after processing JSON
                    }

                    // Handle CSV/Excel files
                    if (csvOrExcelExtensions.some((ext) => file.filename.endsWith(ext))) {
                        console.log("CSV/Excel file detected:", file.filename);

                        const response = await fetch(file.data);
                        const arrayBuffer = await response.arrayBuffer();

                        // Parse the data
                        const workbook = XLSX.read(arrayBuffer, { type: "array" });
                        const sheetName = workbook.SheetNames[0]; // Get the first sheet
                        const sheetData = XLSX.utils.sheet_to_json(
                            workbook.Sheets[sheetName]
                        );

                        const columns = Object.keys(sheetData[0] || {}).map((key) => ({
                            field: key,
                            headerName: key.toUpperCase(),
                            sortable: true,
                            filter: true,
                            resizable: true,
                        }));

                        setColumnDefs(columns);
                        setRowData(sheetData);
                        setIsGridVisible(true);
                        setGoogleViewerUrl(null);
                        return; // Exit after processing CSV/Excel
                    }

                    // Handle files supported by Google Docs Viewer
                    if (googleViewerExtensions.some((ext) => file.filename.endsWith(ext))) {
                        console.log("Google Docs Viewer file detected:", file.filename);

                        setGoogleViewerUrl(
                            `https://docs.google.com/gview?url=${encodeURIComponent(
                                file.data
                            )}&embedded=true`
                        );
                        setIsGridVisible(false);
                        setJsonContent(null);
                        return; // Exit after processing for Google Docs Viewer
                    }

                    console.warn("Unsupported file type:", file.filename);
                    setGoogleViewerUrl(null);
                    setIsGridVisible(false);
                    setJsonContent(null);
                } catch (error) {
                    console.error("Error processing file:", error);
                } finally {
                    setLoading(false);
                }
            };

            processFileData();
        }
    }, [fileData]);

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
                    ) : isGridVisible ? (
                        // Render AG Grid for CSV/Excel files
                        <div
                            className="modal-grid-container"
                            style={{ height: 500, width: "100%" }}
                        >
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
                    ) : googleViewerUrl ? (
                        // Render Google Docs Viewer for supported files
                        <iframe
                            src={googleViewerUrl}
                            style={{
                                width: "100%",
                                height: "700px",
                                border: "none",
                            }}
                            title="Google Docs Viewer"
                        ></iframe>
                    ) : jsonContent ? (
                        // Render JSON Viewer
                        <div
                            style={{
                                background: "#f9f9f9",
                                padding: "15px",
                                borderRadius: "8px",
                                overflow: "auto",
                                height: "700px",
                            }}
                        >
                            <SyntaxHighlighter
                                language="json"
                                style={atomDark}
                            >
                                {JSON.stringify(jsonContent, null, 2)}
                            </SyntaxHighlighter>
                        </div>
                    ) : (
                        <p>No details available or unsupported file type.</p>
                    )}
                </div>
                <div className="modal-sidebar">
                    <div className="modal-sidebar-element">
                        <FontAwesomeIcon
                            className="menu-icon"
                            icon={faLightbulbOn as IconProp}
                        />
                        <p>Insights</p>
                    </div>
                    <div className="modal-sidebar-element">
                        <FontAwesomeIcon
                            className="menu-icon"
                            icon={faFileChartPie as IconProp}
                        />
                        <p>Reports</p>
                    </div>
                    <div className="modal-sidebar-element">
                        <FontAwesomeIcon
                            className="menu-icon"
                            icon={faChartLineUp as IconProp}
                        />
                        <p>Graphs</p>
                    </div>
                </div>
            </div>
        </div>
    );
}