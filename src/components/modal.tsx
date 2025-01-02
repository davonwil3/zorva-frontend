import React, { useState, useEffect } from "react";
import "../css/modal.css";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import * as XLSX from "xlsx";
import { themeQuartz } from "ag-grid-community";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLightbulbOn, faChartLineUp, faFileChartPie } from "@fortawesome/pro-light-svg-icons";
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
    const [jsonContent, setJsonContent] = useState<object | null>(null);
    const [contentType, setContentType] = useState<string>(""); // Determines which content to display

    ModuleRegistry.registerModules([AllCommunityModule]);

    useEffect(() => {
        if (!props.selectedRow || !props.selectedRow.fileID) {
            resetStates();
            return;
        }

        const fetchData = async () => {
            setLoading(true);
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

                if (data?.files?.length > 0) {
                    setFileData(data.files);
                } else {
                    setFileData([]);
                    setContentType("none"); // No content to display
                }
            } catch (error) {
                console.error("Error fetching file data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [props.selectedRow.fileID, props.firebaseUid]);

    useEffect(() => {
        const processFileData = async () => {
            if (fileData.length === 0) {
                setContentType("none");
                return;
            }

            try {
                const file = fileData[0];
                const jsonExtension = [".json"];
                const csvOrExcelExtensions = [".csv", ".xls", ".xlsx"];
                const googleViewerExtensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];

                if (jsonExtension.some((ext) => props.selectedRow.filename.endsWith(ext))) {
                    const response = await fetch(file.data);
                    const jsonData = await response.json();
                    setJsonContent(jsonData);
                    setContentType("json");
                } else if (csvOrExcelExtensions.some((ext) => props.selectedRow.filename.endsWith(ext))) {
                    const response = await fetch(file.data);
                    const arrayBuffer = await response.arrayBuffer();
                    const workbook = XLSX.read(arrayBuffer, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

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
                        setContentType("none");
                    }
                } else if (googleViewerExtensions.some((ext) => props.selectedRow.filename.endsWith(ext))) {
                    setGoogleViewerUrl(
                        `https://docs.google.com/gview?url=${encodeURIComponent(
                            file.data
                        )}&embedded=true`
                    );
                    setContentType("googleViewer");
                } else {
                    setContentType("none");
                }
            } catch (error) {
                console.error("Error processing file data:", error);
                setContentType("none");
            }
        };

        if (fileData.length > 0) processFileData();
    }, [fileData]);

    const resetStates = () => {
        setFileData([]);
        setRowData([]);
        setColumnDefs([]);
        setGoogleViewerUrl(null);
        setJsonContent(null);
        setContentType("");
        setLoading(false);
    };

    useEffect(() => {
        if (!props.isOpen) {
            resetStates();
        }
    }, [props.isOpen]);

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
                    ) : contentType === "googleViewer" ? (
                        <iframe
                            src={googleViewerUrl!}
                            style={{ width: "100%", height: "700px", border: "none" }}
                            title="Google Docs Viewer"
                        ></iframe>
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
