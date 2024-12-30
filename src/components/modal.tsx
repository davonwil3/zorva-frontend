import React from 'react';
import { useState, useEffect } from 'react';
import '../css/modal.css';
import Prism from "prismjs"; // Syntax highlighter
import { Document, Page } from "react-pdf"; // For PDFs
import "prismjs/themes/prism.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import ReactMarkdown from "react-markdown"; // For Markdown
import Mammoth from "mammoth"; // For DOCX

interface FileMetadata {
    id: string;
    filename: string;
    created_at: string;
    usage_bytes: number;
    data: any;
  }

export default function Modal(props: any) {

    const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(null);
    const [fileData, setFileData] = useState<FileMetadata[]>([]);

    const getFileExtension = (fileName: string) => {
        return (fileName?.split(".").pop()?.toLowerCase() ?? '');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:10000/api/getfilesbyID', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileIDs: props.selectedRow.fileID, firebaseUid: props.firebaseUid }),
                });
                const data = await response.json();
                setFileData(data.files);
                console.log(data.files);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [props.selectedRow.fileID]);


    useEffect(() => {
        if (!props.selectedRow?.fileID || !fileData?.length) return;
    
        const extension = getFileExtension(props.selectedRow.fileName);
    
        switch (extension) {
            case "pdf":
                setRenderedContent(
                    <Document file={fileData[0].data}>
                        <Page pageNumber={1} />
                    </Document>
                );
                break;
            case "c":
            case "cpp":
            case "cs":
            case "css":
            case "html":
            case "java":
            case "js":
            case "json":
            case "go":
            case "py":
            case "rb":
            case "sh":
            case "php":
            case "ts":
            case "txt":
            case "tex":
                setRenderedContent(
                    <pre>
                        <code className={`language-${extension}`}>
                            {fileData[0].data.toString("utf8")} {/* Convert buffer to string */}
                        </code>
                    </pre>
                );
                Prism.highlightAll(); // Highlight syntax after rendering
                break;
            case "md":
                setRenderedContent(
                    <ReactMarkdown>
                        {fileData[0].data.toString("utf8")} 
                    </ReactMarkdown>
                );
                break;
            case "docx":
                Mammoth.extractRawText({ arrayBuffer: fileData[0].data })
                    .then((result) => {
                        setRenderedContent(<div>{result.value}</div>);
                    })
                    .catch(() => {
                        setRenderedContent(<p>Unable to render DOCX file</p>);
                    });
                break;
            case "pptx":
                setRenderedContent(
                    <p>PPTX files are not yet supported directly in this implementation.</p>
                );
                break;
            default:
                setRenderedContent(<p>Unsupported file type</p>);
                break;
        }
    }, [props.selectedRow?.fileID, fileData]);
    
    if (!props.isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="modal-close" onClick={props.onClose}>
                    &times;
                </button>
                {props.selectedRow ? (
                    <div className="modal-content">
                        {renderedContent}
                    </div>
                ) : (
                    <p>No details available.</p>
                )}
            </div>
        </div>
    );
};


