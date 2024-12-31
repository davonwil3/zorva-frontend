import React, { useState, useEffect } from "react";
import "../css/modal.css";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import * as XLSX from "xlsx";



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
    const [loading, setLoading] = useState(true);

    ModuleRegistry.registerModules([AllCommunityModule]);

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

    // Process and display the Excel file
    useEffect(() => {
        if (fileData.length > 0) {
            const processExcelData = async () => {
                try {
                    const file = fileData[0];
                    if (!file.data) return;

                    const response = await fetch(file.data); // Fetch the Excel file
                    const arrayBuffer = await response.arrayBuffer();
                    const workbook = XLSX.read(arrayBuffer, { type: "array" });
                    const sheetName = workbook.SheetNames[0]; // Get the first sheet
                    const sheetData = XLSX.utils.sheet_to_json(
                        workbook.Sheets[sheetName]
                    );

                    // Create dynamic column definitions
                    const columns = Object.keys(sheetData[0] || {}).map((key) => ({
                        field: key,
                        headerName: key.toUpperCase(),
                        sortable: true,
                        filter: true,
                        resizable: true,
                    }));

                    setColumnDefs(columns);
                    setRowData(sheetData);
                    setLoading(false);
                } catch (error) {
                    console.error("Error processing Excel file:", error);
                    setLoading(false);
                }
            };

            processExcelData();
        }
    }, [fileData]);

    if (!props.isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="modal-close" onClick={props.onClose}>
                    &times;
                </button>
                {props.selectedRow && rowData.length > 0 ? (
                    <div
                        className="ag-theme-alpine"
                        style={{ height: 500, width: "100%" }}
                    >
                        <AgGridReact
                            rowData={rowData} // Set the row data
                            columnDefs={columnDefs} // Set the column definitions
                            defaultColDef={{
                                sortable: true,
                                filter: true,
                                resizable: true, // Default options for all columns
                            }}
                        />
                    </div>
                ) : (
                    <p>No details available.</p>
                )}
            </div>
        </div>
    );
}
