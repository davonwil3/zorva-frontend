import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridCellParams,
} from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Fuse from "fuse.js";

interface FileRow {
  fileID: string;
  filename: string;
  created_at?: number;
}

interface FileExplorerModalProps {
  open: boolean;
  onClose: () => void;
  onFileSelect: (fileData: { fileID: string; filename: string }[]) => void;
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
  const [selectedFile, setSelectedFile] = useState<FileRow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch files whenever the modal opens
  useEffect(() => {
    const fetchFiles = async () => {
      if (!open) return;
      setLoading(true);

      try {
        const response = await fetch("http://localhost:10000/api/getfiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firebaseUid }),
        });

        if (!response.ok) {
          console.error("Failed to fetch files");
          return;
        }

        const data = await response.json();
        const fetchedFiles: FileRow[] = data.files.map((file: any) => ({
          fileID: file.id,
          filename: file.filename ?? "Untitled",
          created_at: file.created_at,
        }));

        setFiles(fetchedFiles);
        setSearchResults(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [open, firebaseUid]);

  // Local search with Fuse.js
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(files);
      return;
    }

    const fuse = new Fuse(files, {
      keys: ["filename"],
      threshold: 0.4,
    });

    const fuseResults = fuse.search(searchQuery);
    const matchedFiles = fuseResults.map((result) => result.item);
    setSearchResults(matchedFiles);
  }, [searchQuery, files]);

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
  ];

  // Handle file row click to select a file
  const handleRowClick = (params: GridRowParams<FileRow>) => {
    setSelectedFile(params.row);
  };

  // Handle selecting a file
  const handleSelect = () => {
    if (selectedFile) {
      onFileSelect([{ fileID: selectedFile.fileID, filename: selectedFile.filename }]);
      onClose();
    } else {
      alert("Please select a file.");
    }
  };

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
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSelect} variant="contained" color="primary">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileExplorerModal;

