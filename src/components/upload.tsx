import React, { useState, useCallback, useRef } from "react";
import '../css/upload.css';

function Upload() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);

        const files = Array.from(event.dataTransfer.files);
        if (files.length > 0) {
            setUploadedFiles(prevFiles => [...prevFiles, ...files]);
            console.log('Files dropped:', files);
            // Handle file upload logic here
        }
    }, []);

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setUploadedFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
            console.log('Files selected:', files);
            // Handle file upload logic here
        }
    }, []);

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
            <div className="upload-pic"></div>
            <p>Drag and Drop files to upload</p>
            <button className="upload-button" type="button" onClick={handleButtonClick}>Select Files</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                multiple
            />
            <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                    <div key={index} className="uploaded-file">
                        {file.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Upload;