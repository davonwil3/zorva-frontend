import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclipVertical, faArrowUp } from "@fortawesome/pro-regular-svg-icons";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/pro-solid-svg-icons";
import { faFile } from "@fortawesome/pro-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/pro-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { app } from "../index";
import { faCirclePlus } from "@fortawesome/pro-regular-svg-icons";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FileExplorerModal from "./fileexplorermodal";
import InsightsToggle from "./insightstoggle";
import '../css/insights.css';


const Insights = () => {
    type Message = {
        text: string;
        sender: "user" | "assistant";
        isLoading?: boolean;
        files?: { name: string; type: string }[];
        filenames?: string[];  // NEW: array of string filenames
    };


    const chatMessagesRef = useRef<HTMLDivElement>(null);


    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("Untitled");
    const [threadID, setThreadID] = useState<string | null>(null);
    const [insightsSection, setInsightSection] = React.useState('chat');
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null); // To store the uploaded file
    // Additional states for file explorer
    const [isFileExplorerOpen, setFileExplorerOpen] = useState(false);
    // Instead of separate `selectedFileID`, store both ID & name
    const [selectedStoredFiles, setSelectedStoredFiles] = useState<
        { fileID: string; filename: string }[]
    >([]);



    // Holds the assistant messages that the user “saves”
    const [savedResponses, setSavedResponses] = useState<{ id: number; text: string }[]>([]);

    // For auto-resizing the textarea
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const auth = getAuth(app);
    const firebaseUid = auth.currentUser?.uid;

    // -- NEW: Modal control & conversations list
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conversations, setConversations] = useState<any[]>([]);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    // Auto-resize the textarea based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [input]);

    // Handle clicks outside the tooltip
    const handleClickOutside = (event: MouseEvent) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
            setShowTooltip(false); // Close tooltip if clicking outside
        }
    };

    // Add and clean up event listener for clicks outside the tooltip
    useEffect(() => {
        if (showTooltip) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showTooltip]);

    // Handle input change for conversation title
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // handle section change
    const handleInsightSection = (event: React.MouseEvent<HTMLElement>, newSection: string | null) => {
        if (newSection) {
            setInsightSection(newSection);
        }
    };

    const handleBlur = async () => {
        setIsEditing(false);
        if (!threadID) return;

        try {
            const response = await fetch("http://localhost:10000/api/saveTitle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebaseUid,
                    threadID,
                    title,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to save title, server returned status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Title saved:", data.title);
            setTitle(data.title);
        } catch (error) {
            console.error("Error saving title:", error);
        }
    };

    const handleIconClick = () => {
        setIsEditing(true);
    };

    // Save insight to backend
    const handleSaveResponse = async (responseText: string) => {
        if (!threadID) return;

        try {
            const res = await fetch("http://localhost:10000/api/saveInsight", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firebaseUid,
                    threadID,
                    text: responseText,
                    data: "",
                    fileReference: "",
                }),
            });

            if (!res.ok) {
                throw new Error(`Server returned status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data.message); // "Insight saved successfully"

            // Update state with saved insight ID and text
            setSavedResponses((prev) => [
                ...prev,
                { id: data.savedInsight.insightID, text: data.savedInsight.text },
            ]);
        } catch (error) {
            console.error("Error saving insight:", error);
        }
    };
    // Handle deleting a saved response
    const handleDeleteResponse = async (insightID: number) => {
        try {
            const res = await fetch("http://localhost:10000/api/deleteInsight", {
                method: "POST", // Must match the server route method
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ threadID, insightID }),
            });

            if (!res.ok) {
                throw new Error(`Failed to delete response with ID: ${insightID}`);
            }

            // Remove the response locally after successful deletion
            setSavedResponses((prev) => prev.filter((response) => response.id !== insightID));
            console.log(`Response with ID: ${insightID} deleted successfully`);
        } catch (error) {
            console.error("Error deleting response:", error);
        }
    };


    // -------------- fetch list of conversations --------------
    const fetchConversations = async () => {
        try {
            const response = await fetch("http://localhost:10000/api/getConversations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firebaseUid }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch conversations, status: ${response.status}`);
            }

            const data = await response.json();
            setConversations(data.conversations || []);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    // --------------  handle selecting a conversation --------------
    const handleSelectConversation = async (conversation: any) => {
        // 1. Close the modal
        setIsModalOpen(false);

        // 2. Set local thread, title, and any saved insights
        setThreadID(conversation.threadID);
        setTitle(conversation.title || "Untitled Conversation");

        // Make sure to map each saved insight to { id, text }
        const insights = conversation.savedInsights?.map((insight: any) => ({
            id: insight.insightID,
            text: insight.text,
        })) || [];
        setSavedResponses(insights);

        // 3. Fetch the messages
        try {
            const response = await fetch("http://localhost:10000/api/listMessages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebaseUid,
                    threadID: conversation.threadID,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch messages, server returned status: ${response.status}`
                );
            }

            const data = await response.json();

            const loadedMessages = data.messages
                .filter((msg: any) => msg.text.trim() !== "" || msg.sender.trim() !== "")
                .map((msg: any) => {
                    const sender = msg.sender === "user" ? "user" : "assistant";
                    return {
                        text: msg.text,
                        sender,
                        filenames: msg.filenames || [],
                    };
                });

            setMessages(loadedMessages);

        } catch (error) {
            console.error("Error fetching conversation messages:", error);
        }
    };

    // Handle chat send

    const sendMessage = async () => {
        try {
            console.log("Send Message Called");

            // 1. Validate input or file selection
            if ((!input || !input.trim()) && !uploadedFile && selectedStoredFiles.length === 0) {
                console.warn("No text or file provided");
                return;
            }

            // Store the original user text before we clear it
            const textInput = input?.trim() || "";

            const combinedMessage = {
                text: textInput,
                sender: "user",
                files: selectedStoredFiles.map((file) => ({ name: file.filename, type: "stored" })),
            };

            // 2. Add user's message to state
            setMessages((prev) => [...prev, combinedMessage as Message]);
            // Clear the text input
            setInput("");

            // Add a "Loading..." placeholder from the assistant
            setMessages((prev) => [
                ...prev,
                { text: "Loading...", sender: "assistant", isLoading: true },
            ]);

            // 3. Build the request
            const formData = new FormData();

            if (uploadedFile) {
                formData.append("file", uploadedFile, uploadedFile.name);
            }

            selectedStoredFiles.forEach((file) => {
                formData.append("fileIDs[]", file.fileID); // Send all selected file IDs
            });

            // Add text query if it exists
            if (textInput) {
                formData.append("query", textInput);
            }

            if (firebaseUid) formData.append("firebaseUid", firebaseUid);
            if (threadID) formData.append("threadID", threadID);
            if (title) formData.append("title", title);

            const filenames = selectedStoredFiles.map((file) => ({ name: file.filename }));
            if (selectedStoredFiles) {
                formData.append("filenames", JSON.stringify(filenames));
            }

            // 4. Send to the backend
            const chatRes = await fetch("http://localhost:10000/api/chat", {
                method: "POST",
                body: formData,
            });

            if (!chatRes.ok) {
                const errorText = await chatRes.text();
                throw new Error(`Server error ${chatRes.status}: ${errorText}`);
            }

            const data = await chatRes.json();

            // 5. Update assistant's response (remove the isLoading message)
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.isLoading
                        ? { text: data.response, sender: "assistant" }
                        : msg
                )
            );

            // 6. If we **did not** have a threadID before, but now the server returned one:
            if (!threadID && data.threadID) {
                // Update local state with the new threadID
                setThreadID(data.threadID);

                // Generate a title based on the original input
                const generatedTitle = await generateTitleFrontend(data.response);

                // If the generation succeeded, save that title to the backend and update local state
                if (generatedTitle) {
                    await saveTitleFrontend(data.threadID, generatedTitle);
                    setTitle(generatedTitle);
                }
            }

            // 7. Clear the locally stored files
            setUploadedFile(null);
            setSelectedStoredFiles([]);

        } catch (error) {
            console.error("Error in sendMessage:", error);
            // If an error occurs, replace the loading message with a generic error message
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.isLoading
                        ? { text: "Something went wrong. Please try again.", sender: "assistant" }
                        : msg
                )
            );
        }
    };


    const generateTitleFrontend = async (query: string): Promise<string | null> => {
        try {
            const res = await fetch("http://localhost:10000/api/generateTitle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firebaseUid, query }),
            });
            if (!res.ok) {
                throw new Error(`Title generation failed with status: ${res.status}`);
            }
            const data = await res.json();
            return data.title;
        } catch (err) {
            console.error("Error generating title:", err);
            return null;
        }
    };
    /**
   * Calls the /api/saveTitle endpoint to store the generated title in the DB.
   */
    const saveTitleFrontend = async (threadID: string, newTitle: string) => {
        try {
            const res = await fetch("http://localhost:10000/api/saveTitle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebaseUid,
                    threadID,
                    title: newTitle,
                }),
            });
            if (!res.ok) {
                throw new Error(`Saving title failed with status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Title saved:", data.title);
        } catch (err) {
            console.error("Error saving title:", err);
        }
    };


    const handleDeleteConversation = async (conversation: any) => {
        try {

            const response = await fetch(`http://localhost:10000/api/deleteConversation`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ threadID: conversation.threadID }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete conversation");
            }

            // Remove the deleted conversation from the state
            setConversations((prev) => prev.filter((conv) => conv.threadID !== conversation.threadID));
            console.log("Conversation deleted successfully");
        } catch (error) {
            console.error("Error deleting conversation:", error);
        }
    };


    // --------------  Show/hide modal --------------
    const openModal = () => {
        console.log("Opening modal");
        setIsModalOpen(true);

        fetchConversations();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // --------------  Start a new conversation --------------
    const startNewConversation = () => {
        setThreadID(null);
        setTitle("Untitled");
        setMessages([]);
        setSavedResponses([]);
    };


    const handleFileExplorerSelect = (fileData: { fileID: string; filename: string }[]) => {
        console.log("Stored files selected:", fileData);
        setSelectedStoredFiles((prev) => {
            const newFiles = fileData.filter(
                (newFile) => !prev.some((file) => file.fileID === newFile.fileID)
            );
            return [...prev, ...newFiles];
        });
    };



    return (
        <div className="flex flex-col w-full h-full ">
            <div className=" flex flex-row w-full ">
                <InsightsToggle />
                <div className=" flex flex-row w-[54%]  border-l border-gray-200 bg-[#faf9f9] relative ">
                    {/* New Conversation Icon */}
                    {messages.length > 0 && (
                        <FontAwesomeIcon
                            icon={faCirclePlus as IconProp}
                            className="absolute top-8 right-8 text-blue-500 text-[25px] cursor-pointer hover:text-blue-600"
                            onClick={startNewConversation} // Define this function for starting a new conversation
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-row w-full h-full">
                {/* LEFT SECTION: Generated Insights */}
                <div className="w-[46%] h-full flex flex-col items-start justify-start px-8 pt-8">
                    <h2 className="text-[17px] font-semibold ">Saved Insights</h2>

                    {savedResponses.length === 0 ? (
                        <div className="flex flex-col items-center justify-start w-full h-full pt-8 px-8">
                            <p className="text-center text-[16px] text-gray-600">
                                No saved responses yet. Saved replies can be included in future reports.
                            </p>
                            <img
                                src={"/assets/savedinsights.png"}
                                alt="Saved Insights"
                                className="w-3/4 h-auto mt-8 opacity-65"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col w-full flex-grow h-0 overflow-hidden mt-4">
                            <div className="flex-grow overflow-y-scroll">
                                {savedResponses.map((response) => (
                                    <div
                                        key={response.id}
                                        className="relative mb-3 p-4 border border-gray-300 rounded-md shadow-sm bg-white w-full whitespace-pre-wrap"
                                    >
                                        {response.text}
                                        {/* Trash icon at the bottom right */}
                                        <FontAwesomeIcon
                                            icon={faTrash as IconProp}
                                            className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
                                            onClick={() => handleDeleteResponse(response.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Fixed space or element at the bottom */}
                            <div className="h-16 w-full mt-4 rounded-md shadow-sm flex items-center justify-center"></div>
                        </div>
                    )}
                </div>


                {/* RIGHT SECTION: Chatbot */}
                <div className="chatbot-container flex flex-col justify-start w-[54%] h-full bg-[#faf9f9] overflow-hidden  relative px-12 pt-4 pb-8 border-l border-gray-200">

                    {/* Conditional Rendering for No Messages */}
                    {messages.length === 0 ? (
                        <div className="no-messages-placeholder flex flex-col justify-start pt-20 items-center w-full h-full relative">
                            {/* Conversation Label */}
                            <div className="conversation-label flex flex-row items-center absolute top-0 right-0 mb-16  mr-4">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
                                    onClick={openModal}
                                >
                                    Conversations
                                </button>
                            </div>
                            <div className="flex flex-col relative bottom-10 w-full items-center justify-center mt-16">
                                <h2 className="text-black text-3xl font-bold mb-6">What can I help with?</h2>
                                <p className="text-md"> You can start by choosing a file or asking about a file in the system</p>
                                <div className="mb-60 flex flex-col w-full bg-[#e9e9ed] rounded-[15px] overflow-visible px-4 mt-[40px]">
                                    {selectedStoredFiles.length > 0 && (
                                        <div className="uploaded-files-container">
                                            {selectedStoredFiles.map((file) => (
                                                <div
                                                    key={file.fileID}
                                                    className="uploaded-file-container flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md p-2 mb-2"
                                                >
                                                    <div className="file-info flex items-center">
                                                        <FontAwesomeIcon icon={faFile} className="text-pink-500 text-[22px] mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium">{file.filename}</p>
                                                        </div>
                                                    </div>
                                                    <FontAwesomeIcon
                                                        icon={faTimesCircle}
                                                        className="text-gray-500 hover:text-red-500 cursor-pointer text-[18px]"
                                                        onClick={() =>
                                                            setSelectedStoredFiles((prev) =>
                                                                prev.filter((selectedFile) => selectedFile.fileID !== file.fileID)
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type a message"
                                        rows={1}
                                        className="chat-input flex items-center w-full bg-[#e9e9ed] border-none outline-none rounded-[15px] px-[30px] py-[30px] text-[15px] resize-none box-border"
                                    />
                                    <div className="button-row flex justify-between items-center bg-[#e9e9ed] px-[25px] py-[10px] relative">
                                        <div className="left-button relative">
                                            {/* Paperclip Icon */}
                                            <FontAwesomeIcon
                                                icon={faPaperclipVertical as IconProp}
                                                className="text-[22px] cursor-pointer"
                                                onClick={() => setFileExplorerOpen(true)}
                                            />
                                        </div>

                                        {/* Send Message Button */}
                                        <div
                                            className="right-button flex justify-center items-center w-[27px] h-[27px] bg-black text-white rounded-full cursor-pointer"
                                            onClick={sendMessage}
                                        >
                                            <FontAwesomeIcon icon={faArrowUp as IconProp} className="text-[20px]" />
                                        </div>
                                    </div>
                                    <FileExplorerModal
                                        open={isFileExplorerOpen}
                                        onClose={() => setFileExplorerOpen(false)}
                                        onFileSelect={handleFileExplorerSelect}
                                        firebaseUid={firebaseUid}
                                    />
                                </div>
                            </div>

                        </div>

                    ) : (
                        // If there are messages, render the chat interface
                        <>

                            {/* Conversation Label */}
                            <div className="conversation-label flex flex-row items-center w-full mb-8">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoFocus
                                        className="rounded-md border border-[#c6c5c5] focus:outline-none text-[19px] h-[30px] px-2 max-w-[50%]"
                                    />
                                ) : (
                                    <>
                                        <h3
                                            onClick={handleIconClick}
                                            className="text-[19px] cursor-pointer truncate max-w-[50%]"
                                        >
                                            {title}
                                        </h3>
                                        <FontAwesomeIcon
                                            className="pen text-[15px] cursor-pointer self-center mt-1 ml-2"
                                            icon={faPen}
                                            onClick={handleIconClick}
                                        />
                                    </>
                                )}
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out ml-auto"
                                    onClick={openModal}
                                >
                                    Conversations
                                </button>
                            </div>

                            {/* Chat Interface */}
                            <div
                                className="chat-messages flex-grow flex flex-col items-start w-full h-0 rounded-[15px] overflow-y-scroll py-[10px]"
                                ref={chatMessagesRef}
                            >
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`
                                        chat-message
                                        ${message.sender === "user"
                                        ? "user-message self-end bg-[#e1e1e3]"
                                        : "assistant-message justify-start"
                                    }
                                        mt-[10px] mb-[10px] rounded-[15px] p-[10px] max-w-[100%] break-words relative
                                        `}
                                    >
                                        {/** * 1) If the message has a `files` array, render it. */}
                                        {message.files && message.files.length > 0 ? (
                                            <div className="file-message flex flex-col items-start">
                                                {message.files.map((file, idx) => (
                                                    <div key={idx} className="file-info flex items-center mb-2">
                                                        <FontAwesomeIcon
                                                            icon={faFile as IconProp}
                                                            className="text-pink-500 text-[22px] mr-2"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium">{file.name}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* Show text if there's also text in this message */}
                                                {message.text && (
                                                    <p className="m-0 text-sm bg-white p-2 rounded-md shadow-sm">
                                                        {message.text}
                                                    </p>
                                                )}
                                            </div>

                                            /**
                                             * 2) If there's a `filenames` array, render each one.
                                             */
                                        ) : message.filenames && message.filenames.length > 0 ? (
                                            <div className="file-message flex flex-col items-start">
                                                {message.filenames.map((filename, idx) => (
                                                    <div key={idx} className="file-info flex items-center mb-2">
                                                        <FontAwesomeIcon
                                                            icon={faFile as IconProp}
                                                            className="text-pink-500 text-[22px] mr-2"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium">{filename}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* If there's text in addition to these filenames */}
                                                {message.text && (
                                                    <p className="m-0 text-sm bg-white p-2 rounded-md shadow-sm">
                                                        {message.text}
                                                    </p>
                                                )}
                                            </div>

                                            /**
                                             * 3) Show the loading spinner if `isLoading`
                                             */
                                        ) : message.isLoading ? (
                                            <div className="flex items-center">
                                                <img
                                                    src="/assets/logosymbol.png"
                                                    alt="Loading..."
                                                    className="spinner h-6 w-6 mr-2"
                                                />
                                                <span className="text-gray-500 text-sm">Thinking...</span>
                                            </div>

                                            /**
                                             * 4) If `sender` is assistant, show assistant bubble
                                             */
                                        ) : message.sender === "assistant" ? (
                                            <div className="w-full flex items-start">
                                                <img
                                                    src="/assets/logosymbol.png"
                                                    alt="Assistant Logo"
                                                    className="h-6 w-6 mr-2"
                                                />
                                                <div>
                                                    <p className="m-0 whitespace-pre-wrap">{message.text}</p>
                                                    <button
                                                        onClick={() => handleSaveResponse(message.text)}
                                                        className="text-sm text-blue-600 hover:underline mt-2 ml-auto focus:outline-none"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>

                                            /**
                                             * 5) Otherwise, it's a standard user text message
                                             */
                                        ) : (
                                            <p className="m-0 whitespace-pre-wrap w-full">{message.text}</p>
                                        )}
                                    </div>
                                ))}
                            </div>



                            {/* Input Area */}
                            <div className="input-container flex flex-col w-full bg-[#e9e9ed] rounded-[15px] px-4 overflow-visible">

                                {selectedStoredFiles.length > 0 && (
                                    <div className="uploaded-files-container pt-4">
                                        {selectedStoredFiles.map((file) => (
                                            <div
                                                key={file.fileID}
                                                className="uploaded-file-container flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md p-2 mb-2"
                                            >
                                                <div className="file-info flex items-center">
                                                    <FontAwesomeIcon icon={faFile} className="text-pink-500 text-[22px] mr-2" />
                                                    <div>
                                                        <p className="text-sm font-medium">{file.filename}</p>
                                                    </div>
                                                </div>
                                                <FontAwesomeIcon
                                                    icon={faTimesCircle}
                                                    className="text-gray-500 hover:text-red-500 cursor-pointer text-[18px]"
                                                    onClick={() =>
                                                        setSelectedStoredFiles((prev) =>
                                                            prev.filter((selectedFile) => selectedFile.fileID !== file.fileID)
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message"
                                    rows={1}
                                    className="chat-input flex items-center w-full bg-[#e9e9ed] border-none outline-none rounded-[15px] px-[30px] py-[30px] text-[15px] resize-none box-border"
                                />
                                <div className="button-row flex justify-between items-center bg-[#e9e9ed] px-[25px] py-[10px] relative">
                                    <div className="left-button relative">

                                        <FontAwesomeIcon
                                            icon={faPaperclipVertical as IconProp}
                                            className="text-[22px] cursor-pointer"
                                            onClick={() => setFileExplorerOpen(true)}
                                        />
                                    </div>

                                    {/* Send Message Button */}
                                    <div
                                        className="right-button flex justify-center items-center w-[27px] h-[27px] bg-black text-white rounded-full cursor-pointer"
                                        onClick={() => {
                                            console.log("Button clicked");
                                            sendMessage(); // Ensure function is called
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faArrowUp as IconProp} className="text-[20px]" />
                                    </div>

                                </div>
                            </div>
                            <FileExplorerModal
                                open={isFileExplorerOpen}
                                onClose={() => setFileExplorerOpen(false)}
                                onFileSelect={handleFileExplorerSelect}
                                firebaseUid={firebaseUid}
                            />

                        </>
                    )}

                    {/* Modal for listing conversations */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-black opacity-50"
                                onClick={closeModal}
                            ></div>
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg p-6 z-10 w-[600px] max-h-[80%] overflow-auto">
                                <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>

                                {conversations.length === 0 ? (
                                    <p className="text-gray-500">No conversations found</p>
                                ) : (
                                    <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {conversations.map((conv) => (
                                                <tr key={conv._id} className="border-t border-gray-200 hover:bg-gray-50">
                                                    {/* Hidden Column for conversation_id */}
                                                    <td
                                                        className="px-4 py-2 text-sm text-gray-800 cursor-pointer"
                                                        onClick={() => handleSelectConversation(conv)}
                                                    >
                                                        {conv.title || "Untitled Conversation"}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-600">
                                                        {new Date(conv.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <FontAwesomeIcon
                                                            icon={faTrash as IconProp}
                                                            className="text-red-500 cursor-pointer hover:text-red-700 text[20px]"
                                                            onClick={() => handleDeleteConversation(conv)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                <button
                                    className="mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 focus:outline-none"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div >
        </div >
    );
};

export default Insights;
