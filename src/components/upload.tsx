import React, { useState, useCallback, useRef, useEffect } from "react";
import JSZip from "jszip";
import '../css/upload.css';

declare module 'react' {
    interface InputHTMLAttributes<T> extends React.HTMLAttributes<T> {
        webkitdirectory?: boolean;
    }
}
interface FolderStructure {
    [key: string]: FolderStructure | File;
}

function Upload() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileTree, setFileTree] = useState<FolderStructure>({});
    const [displayItems, setDisplayItems] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const files = Array.from(event.dataTransfer.files);
        if (files.length > 0) {
            processFiles(files);
        }
    }, []);

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            processFiles(Array.from(files));
        }
    }, []);

    const processFiles = async (files: File[]) => {
        const zipFiles: File[] = [];
        const otherFiles: File[] = [];
        const folderNames: Set<string> = new Set(); // To track unique root folder names
        const processedFiles: File[] = []; // Flat list of individual files

        // Separate ZIP files and other files
        files.forEach((file) => {
            if (file.name.endsWith('.zip')) {
                zipFiles.push(file);
            } else {
                otherFiles.push(file);
            }
        });

        // Helper function to get the root folder name
        const getRootFolderName = (path: string) => {
            const parts = path.split('/');
            return parts.length > 1 ? parts[0] + '/' : null; 
        };

        // Process ZIP files
        for (const zipFile of zipFiles) {
            const zip = await JSZip.loadAsync(zipFile);

            await Promise.all(
                Object.keys(zip.files).map(async (relativePath) => {
                    const zipEntry = zip.files[relativePath];

                    // Skip system files and folders
                    if (
                        relativePath.startsWith('__MACOSX') ||
                        relativePath.endsWith('.DS_Store') ||
                        relativePath.endsWith('Thumbs.db') ||
                        relativePath.endsWith('desktop.ini')
                    ) {
                        return;
                    }

                    // Extract the root folder name if applicable
                    const rootFolder = getRootFolderName(relativePath);
                    if (rootFolder) {
                        folderNames.add(rootFolder); 
                    }

                    // If it's a file, process it (but don't display it directly in the UI)
                    if (!zipEntry.dir) {
                        const blob = await zipEntry.async('blob');
                        const file = new File([blob], relativePath);
                        processedFiles.push(file); // Add to processed files
                    }
                })
            );
        }

        // Handle non-ZIP files (add them as files at the root level)
        otherFiles.forEach((file) => {
            processedFiles.push(file); 
        });

        // Build display items for the UI
        const displayItemsArray = Array.from(folderNames); // Add folder names
        processedFiles.forEach((file) => {
            if (!file.name.includes('/')) {
                displayItemsArray.push(file.name); // Add file names (if not part of a folder)
            }
        });

        // Update states
        setUploadedFiles(processedFiles); // Actual files for database upload
        setDisplayItems(displayItemsArray); // UI display items
    };


    useEffect(() => {
        console.log('Uploaded Files:', uploadedFiles);
    }, [uploadedFiles]);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`upload-box ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="upload-header">
                <div className="upload-pic"></div>
                <p>Drag and Drop files to upload</p>
                <button className="upload-button" type="button" onClick={handleButtonClick}>
                    Select Files
                </button>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                multiple // Allow multiple file selection
                webkitdirectory // Allow directory upload
            />
            <div className="uploaded-files">
                {displayItems.map((item, index) => (
                    <div key={index} className="uploaded-file">
                        {item.endsWith('/') ? (
                            <span className="uploaded-filename"><img src="/assets/folder.png" alt="" style={{width: "17px", height:"17px"}} /> {item}</span> 
                        ) : (
                            <span className="uploaded-filename"><img src="/assets/file.png" alt="" style={{width: "17px", height:"17px"}} /> {item}</span> 
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Upload;