import React, { useState, useCallback, useRef, useEffect } from "react";
import JSZip from "jszip";
import { getAuth } from "firebase/auth";
import { app } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import '../css/index.css'

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
            className={`flex flex-col mt-40 bg-white items-center justify-center w-full max-w-xl lg:max-w-3xl h-[409px] border-2 border-dashed border-gray-300 p-5 text-center transition-colors rounded-lg overflow-hidden ${isDragging ? "bg-gray-100" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}

        >
            {/* Header */}
            <div className="flex flex-col items-center justify-center">
                <div
                    className="w-[130px] h-[120px] bg-cover"
                    style={{ backgroundImage: "url('/assets/uploadicon.png')" }}
                />
                <p className="mt--20 text-md text-gray-700">Drag and Drop files to upload</p>
                <button
                    className="w-[100px] h-[40px] mt-4 border border-gray-400 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 ease-in-out  cursor-pointer"
                    type="button"
                    onClick={handleButtonClick}
                >
                    Select Files
                </button>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                multiple
                webkitdirectory
            />

            {/* Upload Status */}
            <div className="mt-3 text-center">
                {uploadComplete && (
                    <div className="flex items-center justify-center text-green-600 font-bold mb-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        <span>Upload Complete</span>
                    </div>
                )}
                {errorMessages.map((message, index) => (
                    <div key={index} className="flex items-center justify-center text-red-600 mb-2">
                        <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                        {message}
                    </div>
                ))}
            </div>

            {/* Uploaded Files */}
            <div className="mt-5 flex flex-wrap gap-3 overflow-y-auto max-h-[calc(60vh-120px)]">
                {displayItems.map((item, index) => (
                    <div
                        key={index}
                        className="p-2 border border-gray-300 rounded-md max-w-[160px] whitespace-nowrap overflow-hidden text-ellipsis text-sm text-gray-800"
                    >
                        {item.endsWith("/") ? (
                            <span className="flex items-center gap-2">
                                <img
                                    src="/assets/folder.png"
                                    alt="Folder"
                                    className="w-4 h-4"
                                />
                                {item}
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <img
                                    src="/assets/file.png"
                                    alt="File"
                                    className="w-4 h-4"
                                />
                                {item}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
      
    );
}

export default Upload;
