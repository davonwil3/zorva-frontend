import React, { useState, useEffect } from "react";
import "../css/modal.css";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import * as XLSX from "xlsx";
import { themeQuartz } from "ag-grid-community";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLightbulbOn } from '@fortawesome/pro-light-svg-icons';
import { faArrowUpFromBracket, faChartLineUp, faFileChartPie } from '@fortawesome/pro-light-svg-icons';

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

    const myTheme = themeQuartz.withParams({
        /* Low spacing = very compact */
        spacing: 2,
        /* Changes the color of the grid text */
        foregroundColor: 'rgb(14, 68, 145)',
        /* Changes the color of the grid background */
        backgroundColor: 'rgb(241, 247, 255)',
        /* Changes the header color of the top row */
        headerBackgroundColor: 'rgb(228, 237, 250)',
        /* Changes the hover color of the row*/
        rowHoverColor: 'rgb(216, 226, 255)',
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
            <div className="modal-and-sidebar">
                <div className="modal-container">
                    <button className="modal-close" onClick={props.onClose}>
                        &times;
                    </button>
                    {props.selectedRow && rowData.length > 0 ? (
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
                    ) : (
                        <p>No details available.</p>
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
