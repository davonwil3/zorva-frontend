import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridCellParams,
} from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Fuse from 'fuse.js';


interface FileRow {
  fileID: string;      
  filename: string;    
  created_at?: number;  

}

interface FileData {
  fileID: string;
  filename: string;
}

/** Props passed down to this modal */
interface FileExplorerModalProps {
  open: boolean;
  onClose: () => void;
  onFileSelect: (fileData: FileData) => void;  
  firebaseUid?: string;                       
}


const FileExplorerModal: React.FC<FileExplorerModalProps> = ({
  open,
  onClose,
  onFileSelect,
  firebaseUid,
}) => {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [searchResults, setSearchResults] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch files whenever the modal opens
  useEffect(() => {
    const fetchFiles = async () => {
      if (!open) return;  // Only fetch when modal is open
      setLoading(true);

      try {
        const response = await fetch("http://localhost:10000/api/getfiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firebaseUid }), // Adjust if your API requires something else
        });

        if (!response.ok) {
          console.error("Failed to fetch files");
          return;
        }

        const data = await response.json();
        // Map data to FileRow structure
        const fetchedFiles: FileRow[] = data.files.map((file: any) => ({
          fileID: file.id,
          filename: file.filename ?? "Untitled",
          created_at: file.created_at,
        }));

        setFiles(fetchedFiles);
        setSearchResults(fetchedFiles); // Initialize search results with all files
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [open, firebaseUid]);

  // Local search with Fuse.js on `filename`
  useEffect(() => {
    if (!searchQuery.trim()) {
      // If no search query, revert to original full list
      setSearchResults(files);
      return;
    }

    const fuse = new Fuse(files, {
      keys: ["filename"], // Search by filename
      threshold: 0.4,     // Fuzzy match tolerance
    });

    const fuseResults = fuse.search(searchQuery);
    const matchedFiles = fuseResults.map((result) => result.item);
    setSearchResults(matchedFiles);
  }, [searchQuery, files]);

  // Handle double-click on a row
  const handleRowDoubleClick = (params: GridRowParams<FileRow>) => {
    onFileSelect({
      fileID: params.row.fileID,
      filename: params.row.filename,
    });
    onClose();
  };

  // Define DataGrid columns
  const columns: GridColDef<FileRow>[] = [
    {
      field: "filename",
      headerName: "Filename",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      renderCell: (params: GridCellParams<FileRow, number | null>) => {
        if (!params.value) return "N/A";
        const dateObj = new Date(params.value * 1000);
        return dateObj.toLocaleString();
      },
    },
    {
      field: "choose",
      headerName: "Choose",
      width: 80,
      sortable: false,
      renderCell: (params: GridCellParams<FileRow>) => (
        <FontAwesomeIcon
          icon={faCheck as IconProp}
          style={{ cursor: "pointer", color: "green" }}
          onClick={() => {
            onFileSelect({
              fileID: params.row.fileID,
              filename: params.row.filename,
            });
            onClose();
          }}
        />
      ),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Select a File</DialogTitle>

      <DialogContent>
        {/* Search bar */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "0.5rem",
              fontSize: "1rem",
            }}
          />
          <Button
            variant="contained"
            onClick={() => setSearchQuery("")}
            startIcon={<FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />}
          >
            Clear
          </Button>
        </div>

        {/* DataGrid listing of files */}
        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={searchResults}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.fileID}
            onRowDoubleClick={handleRowDoubleClick}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileExplorerModal;
