import React, { useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { app } from '../index';
import '../css/datasets.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


interface FileRow {
    id: number;
    filename: string;
    bytes: number | null;
    created_at: number | null;
}

export default function Datasets() {
    const auth = getAuth(app);
    const firebaseUid = auth.currentUser?.uid;
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
                setFiles(data.files || []);
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, [firebaseUid]);

    const columns: GridColDef<FileRow>[] = [
        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            width: 80,
            renderCell: (params: GridCellParams<FileRow, number>) => {
                // Extract the file extension
                const filename = params.row.filename;
                const extension = filename.split('.').pop()?.toLowerCase();
    
                // Map extensions to icons
                const getIconForExtension = (ext: string | undefined) => {
                    switch (ext) {
                        case 'pdf':
                            return <img src="/assets/pdf.png" alt="PDF Icon" className='file-icon' />
                        case 'csv':
                            return <img src="/assets/csv.png" alt="CSV Icon" className='file-icon' />
                        case 'xlsx' || 'xls':
                            return <img src="/assets/excel.png" alt="Excel Icon" className='file-icon' />
                        case 'json' || 'jsonl':
                            return <img src="/assets/json.png" alt="JSON Icon" className='file-icon'/>
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
            width: 390,
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
            width: 180,
            renderCell: (params: GridCellParams<FileRow, number | null>) => {
                if (!params.row || !params.row.created_at) {
                    return 'N/A';
                }
                const dateObj = new Date(params.row.created_at * 1000);
                return dateObj.toLocaleString();
            },
        },
    ];
    // Convert your data to the FileRow shape
    const rows: FileRow[] = files.map((file, index) => ({
        id: index + 1,
        filename: file.filename ?? 'Untitled',
        bytes: file.usage_bytes ?? null,
        created_at: file.created_at ?? null,
    }));

    return (
        <div className='datasets-page'>
            <div className="search-container">
                <input type="text" placeholder="Search for a file or search by content" className="search-box" />
                <button className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
                </button>
            </div>
            <Box sx={{ height: 650, width: '82%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
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
                    }}
                />
            </Box>
        </div>
    );
}
