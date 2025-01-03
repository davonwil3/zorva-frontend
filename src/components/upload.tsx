import React, { useState, useCallback, useRef, useEffect } from "react";
import JSZip from "jszip";
import "../css/upload.css";
import { getAuth } from "firebase/auth";
import { app } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

declare module "react" {
    interface InputHTMLAttributes<T> extends React.HTMLAttributes<T> {
        webkitdirectory?: boolean;
    }
}

interface FolderStructure {
    [key: string]: FolderStructure | File;
}

const ALLOWED_EXTENSIONS = [
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".json",
    ".csv",
    ".xls",
    ".xlsx",
];

function Upload() {
    const auth = getAuth(app);
    const user = auth.currentUser?.uid;
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileTree, setFileTree] = useState<FolderStructure>({});
    const [displayItems, setDisplayItems] = useState<string[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [uploadComplete, setUploadComplete] = useState(false); // New upload status

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
            validateAndProcessFiles(files);
        }
    }, []);

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            validateAndProcessFiles(Array.from(files));
        }
    }, []);

    const validateAndProcessFiles = (files: File[]) => {
        const validFiles: File[] = [];
        const invalidFiles: string[] = [];

        files.forEach((file) => {
            const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
            if (ALLOWED_EXTENSIONS.includes(extension)) {
                validFiles.push(file);
            } else {
                invalidFiles.push(file.name);
            }
        });

        if (invalidFiles.length > 0) {
            setErrorMessages((prevErrors) => [
                ...prevErrors,
                ...invalidFiles.map((name) => `${name} is not a supported file type.`),
            ]);
        }

        if (validFiles.length > 0) {
            processFiles(validFiles);
        }
    };

    const processFiles = async (files: File[]) => {
        const zipFiles: File[] = [];
        const otherFiles: File[] = [];
        const folderNames: Set<string> = new Set();
        const processedFiles: File[] = [];

        files.forEach((file) => {
            if (file.name.endsWith(".zip")) {
                zipFiles.push(file);
            } else {
                otherFiles.push(file);
            }
        });

        const getRootFolderName = (path: string) => {
            const parts = path.split("/");
            return parts.length > 1 ? parts[0] + "/" : null;
        };

        for (const zipFile of zipFiles) {
            const zip = await JSZip.loadAsync(zipFile);

            await Promise.all(
                Object.keys(zip.files).map(async (relativePath) => {
                    const zipEntry = zip.files[relativePath];

                    if (
                        relativePath.startsWith("__MACOSX") ||
                        relativePath.endsWith(".DS_Store") ||
                        relativePath.endsWith("Thumbs.db") ||
                        relativePath.endsWith("desktop.ini")
                    ) {
                        return;
                    }

                    const rootFolder = getRootFolderName(relativePath);
                    if (rootFolder) {
                        folderNames.add(rootFolder);
                    }

                    if (!zipEntry.dir) {
                        const blob = await zipEntry.async("blob");
                        const file = new File([blob], relativePath);
                        processedFiles.push(file);
                    }
                })
            );
        }

        otherFiles.forEach((file) => {
            processedFiles.push(file);
        });

        const displayItemsArray = Array.from(folderNames);
        processedFiles.forEach((file) => {
            if (!file.name.includes("/")) {
                displayItemsArray.push(file.name);
            }
        });

        setUploadedFiles(processedFiles);
        setDisplayItems(displayItemsArray);

        setErrorMessages([]); // Clear errors
        setUploadComplete(true); // Mark upload complete

        setTimeout(() => {
            setUploadComplete(false); // Hide after 3 seconds
        }, 3000);

        uploadFiles(processedFiles);
    };

    const uploadFiles = async (filesToUpload?: File[]) => {
        const files = filesToUpload || uploadedFiles;

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const firebaseUid = user;
        if (firebaseUid) {
            formData.append("firebaseUid", firebaseUid);
        }

        try {
            const response = await fetch("http://localhost:10000/api/uploadfiles", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log("Upload result:", result);
        } catch (error) {
            console.log("Error uploading files:", error);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`upload-box ${isDragging ? "dragging" : ""}`}
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
                style={{ display: "none" }}
                onChange={handleFileSelect}
                multiple
                webkitdirectory
            />
            <div className="upload-status">
                {uploadComplete && (
                    <div className="upload-complete">
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                        <span>Upload Complete</span>
                    </div>
                )}
                {errorMessages.map((message, index) => (
                    <div key={index} className="error-message">
                        <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />
                        {message}
                    </div>
                ))}
            </div>
            <div className="uploaded-files">
                {displayItems.map((item, index) => (
                    <div key={index} className="uploaded-file">
                        {item.endsWith("/") ? (
                            <span className="uploaded-filename">
                                <img src="/assets/folder.png" alt="" style={{ width: "17px", height: "17px" }} /> {item}
                            </span>
                        ) : (
                            <span className="uploaded-filename">
                                <img src="/assets/file.png" alt="" style={{ width: "17px", height: "17px" }} /> {item}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Upload;
