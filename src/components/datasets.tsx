import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { app } from '../index';

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
      headerName: 'Seq #',
      type: 'number',
      width: 80,
    },
    {
      field: 'filename',
      headerName: 'Filename',
      type: 'string',
      width: 250,
    },
    {
      field: 'bytes',
      headerName: 'File Size',
      type: 'number',
      width: 150,
      // Use GridCellParams<R, V> to define the row & value types
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
      }
      
  ];

  // Convert your data to the FileRow shape
  const rows: FileRow[] = files.map((file, index) => ({
    id: index + 1,
    filename: file.filename ?? 'Untitled',
    bytes: file.usage_bytes ?? null,
    created_at: file.created_at ?? null,
  }));

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid<FileRow>
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pagination
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </Box>
  );
}
