import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { app } from '../index';
import '../css/datasets.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Fuse from 'fuse.js';
import { Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import Modal from './modal'; // Ensure the path is correct
import { DotLottieReact } from '@lottiefiles/dotlottie-react';  // Keep only one import

interface FileRow {
    id: number;
    filename: string;
    bytes: number | null;
    created_at: number | null;
    fileID: string;
}

export default function Datasets() {
    const auth = getAuth(app);
    const firebaseUid = auth.currentUser?.uid;
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<FileRow | null>(null);
    const [searchResults, setSearchResults] = useState<FileRow[]>([]); // State for search results
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
    const [searchByContent, setSearchByContent] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<FileRow[]>([]);
    const [uniqueModalKey, setUniqueModalKey] = useState(0);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<FileRow | null>(null);
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]); // Controlled selectionModel

    // Overlay state to control the darkened screen + loading icon
    const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:10000/api/getfiles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firebaseUid }),
                });
                const data = await response.json();
                console.log('Files:', data.files);

                const formattedRows: FileRow[] = data.files.map((file: any, index: number) => {
                    let correctedFilename = file.filename ?? 'Untitled';

                    if (correctedFilename.endsWith('.json')) {
                        const parts = correctedFilename.split('.');
                        if (parts.length > 2) {
                            correctedFilename = parts.slice(0, -1).join('.');
                        }
                    }

                    return {
                        id: index + 1,
                        filename: correctedFilename,
                        bytes: file.usage_bytes ?? null,
                        created_at: file.created_at ?? null,
                        fileID: file.id,
                    };
                });

                setRows(formattedRows); // Capture initial rows
                setSearchResults(formattedRows); // Initialize search results
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [firebaseUid]);

    const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
        if (selectionModel.length > 0) {
            const selectedId = selectionModel[0];
            const row = rows.find((row) => row.id === selectedId);
            setSelectedRow(row || null); // Update selectedRow state
            console.log("Selected Row:", row);

            // Increment the unique key to force modal remount
            setUniqueModalKey((prevKey) => prevKey + 1);

            setModalOpen(true);
        } else {
            setSelectedRow(null); // Clear selection if no rows are selected
        }
    };

    const handleDeleteClick = (file: FileRow) => {
        setFileToDelete(file);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!fileToDelete) return;

        try {
            const response = await fetch("http://localhost:10000/api/deletefile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileID: fileToDelete.fileID, firebaseUid }),
            });

            if (!response.ok) {
                console.error("Failed to delete file");
                return;
            }

            // Update rows and search results after deletion
            const updatedRows = rows.filter((row) => row.fileID !== fileToDelete.fileID);
            setRows(updatedRows);
            setSearchResults((prevResults) =>
                prevResults.filter((result) => result.fileID !== fileToDelete.fileID)
            );
        } catch (error) {
            console.error("Error deleting file:", error);
        } finally {
            setDeleteModalOpen(false);
            setFileToDelete(null);
        }
    };

    const columns: GridColDef<FileRow>[] = [
        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            width: 80,
            renderCell: (params: GridCellParams<FileRow, number>) => {
                const filename = params.row.filename;

                // Determine if the file is an originally JSON file or converted
                let originalName = filename;
                if (!filename.endsWith('.json') || filename.split('.').length > 2) {
                    // If not a simple `.json` file, remove the `.json` extension to find the original file type
                    originalName = filename.replace(/\.json$/, '');
                }

                const extension = originalName.split('.').pop()?.toLowerCase(); // Extract the actual extension

                // Map extensions to icons
                const getIconForExtension = (ext: string | undefined) => {
                    switch (ext) {
                        case 'pdf':
                            return <img src="/assets/pdf.png" alt="PDF Icon" className='file-icon' />;
                        case 'csv':
                            return <img src="/assets/csv.png" alt="CSV Icon" className='file-icon' />;
                        case 'xlsx':
                        case 'xls':
                            return <img src="/assets/excel.png" alt="Excel Icon" className='file-icon' />;
                        case 'json':
                            return <img src="/assets/json.png" alt="JSON Icon" className='file-icon' />;
                        case 'pptx':
                            return <img src="/assets/ppt.png" alt="PPT Icon" className='file-icon' />;
                        default:
                            return <img src="/assets/doc.png" alt="File Icon" className='file-icon' />;
                    }
                };

                return getIconForExtension(extension);
            },
        },
        {
            field: 'filename',
            headerName: 'Filename',
            type: 'string',
            width: 400,
        },
        {
            field: 'bytes',
            headerName: 'File Size',
            type: 'number',
            width: 150,
            renderCell: (params: GridCellParams<FileRow, number | null>) => {
                if (!params.value) return 'N/A';
                const sizeInKB = params.value / 1024;
                return `${sizeInKB.toFixed(2)} KB`;
            },
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 300,
            renderCell: (params: GridCellParams<FileRow, number | null>) => {
                if (!params.row || !params.row.created_at) {
                    return 'N/A';
                }
                const dateObj = new Date(params.row.created_at * 1000);
                return dateObj.toLocaleString();
            },
        },
        {
            field: 'fileID',
            headerName: 'File ID',
            type: 'string',
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 100,
            renderCell: (params: GridCellParams<FileRow>) => (
                <FontAwesomeIcon
                    icon={faTrash as IconProp}
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row selection
                        handleDeleteClick(params.row);
                    }}
                />
            ),
        },
    ];

    // Fuse.js search
    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]); // Reset search results
            return;
        }

        if (searchByContent) {
            // Display overlay when searching by content
            setOverlayVisible(true);
            try {
                const response = await fetch("http://localhost:10000/api/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firebaseUid, query }),
                });

                if (!response.ok) {
                    console.error("Error fetching search results from API");
                    return;
                }

                const data = await response.json();
                const fileIDs = data.fileIDs || [];
                const matchedRows = rows.filter((row) => fileIDs.includes(String(row.fileID)));
                setSearchResults(matchedRows);
            } catch (error) {
                console.error("Error during content-based search:", error);
            } finally {
                // Hide after 3 seconds (simulate some processing/loading time)
                setTimeout(() => {
                    setOverlayVisible(false);
                }, 3000);
            }
        }
    };

    // Perform local filename search on the go
    const handleLocalSearch = (query: string) => {
        console.log('Performing filename search with Fuse.js');
        setSearchQuery(query);

        if (!query.trim()) {
            console.log('Empty query, resetting search results to original rows');
            setSearchResults(rows);
            return;
        }

        const fuse = new Fuse(rows, {
            keys: ['filename'], // Specify the fields to search in
            threshold: 0.4,     // Adjust for tolerance of fuzzy matching
        });

        console.log('Rows passed to Fuse:', rows);

        const results = fuse.search(query);
        console.log('Fuse.js results:', results);

        const matchedRows = results.map((result) => result.item);
        console.log('Matched rows (filename-based):', matchedRows);

        setSearchResults(matchedRows); // Update search results
    };

    return (
        <div className="datasets-page">
            <div className="complete-search-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={`Search by ${searchByContent ? 'Content' : 'File name'}`}
                        className="search-box"
                        value={searchQuery}
                        onChange={(e) => {
                            if (!searchByContent) {
                                handleLocalSearch(e.target.value); // Perform local filename search
                            } else {
                                setSearchQuery(e.target.value); // Update query for backend search
                            }
                        }}
                    />
                    <button
                        className="search-button"
                        onClick={() => handleSearch(searchQuery)} // Trigger content-based search
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
                    </button>
                </div>
                <div className="switch-container">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={searchByContent}
                                onChange={(e) => {
                                    console.log('Search mode toggled:', e.target.checked);
                                    setSearchByContent(e.target.checked);

                                    // Clear the search box and reset the results
                                    setSearchQuery(''); // Clear the search input
                                    setSearchResults(rows); // Reset rows to all data
                                }}
                            />
                        }
                        label={`Search by content`}
                        sx={{
                            margin: 0,
                        }}
                    />
                </div>
            </div>
            <Box sx={{ height: 650, width: '90%' }}>
                <DataGrid
                    rows={searchResults}
                    columns={columns}
                    loading={loading}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick={false}
                    pagination
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 25, page: 0 },
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-root': {
                            border: 'none',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            borderBottom: 'none',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none',
                        },
                        '& .MuiDataGrid-row': {
                            borderBottom: 'none',
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            border: 'none',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: 'none',
                        },
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                    }}
                    columnVisibilityModel={{
                        fileID: false, // Hide the 'fileID' column
                    }}
                    rowSelectionModel={selectionModel} // Controlled selectionModel
                    onRowSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                        handleRowSelection(newSelectionModel);
                    }}
                />
            </Box>

            {/* Modal for row details */}
            {selectedRow && (
                <Modal
                    key={`${selectedRow.fileID}-${uniqueModalKey}`} // Ensures the modal reinitializes when `selectedRow` changes
                    isOpen={isModalOpen}
                    firebaseUid={firebaseUid}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedRow(null); // Reset selectedRow to unmount Modal
                        setSelectionModel([]); // Clear the selection
                    }}
                    selectedRow={selectedRow}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                aria-labelledby="delete-confirmation-title"
                aria-describedby="delete-confirmation-description"
            >
                <DialogTitle id="delete-confirmation-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-confirmation-description">
                        Are you sure you want to delete the file{" "}
                        <strong>{fileToDelete?.filename}</strong>? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Overlay with Lottie animation + message (only shows when isOverlayVisible is true) */}
            {isOverlayVisible && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        color: '#fff'
                    }}
                >
                    <h2 style={{position: 'relative', top: '23px'}}>Searching for file by content</h2>
                    <iframe
                        src="https://lottie.host/embed/6184f9b9-4887-4c03-9f6c-7fd810ab2199/NvGHmd2p7f.lottie"
                        width="400"   // Adjust the width as needed
                        height="350"  // Adjust the height as needed
                        style={{ border: 'none', marginBottom: '10px' }} // Removes iframe border
                    />
                </div>

            )}
        </div>
    );
}
