import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclipVertical, faArrowUp } from "@fortawesome/pro-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/pro-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { app } from "../index";

const Insights = () => {
    const [messages, setMessages] = useState([
        {
            text: "Hello! Welcome to Zorva! Start by typing a message to your AI assistant.",
            sender: "assistant",
        },
    ]);
    const [input, setInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("Chatbot");
    const [threadID, setThreadID] = useState<string | null>(null);

    // Holds the assistant messages that the user “saves”
    const [savedResponses, setSavedResponses] = useState<string[]>([]);

    // For auto-resizing the textarea
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const auth = getAuth(app);
    const firebaseUid = auth.currentUser?.uid;

    // -- NEW: Modal control & conversations list
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conversations, setConversations] = useState<any[]>([]);

    // Auto-resize the textarea based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [input]);

    // Handle input change for conversation title
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
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
            setSavedResponses((prev) => [...prev, responseText]);
        } catch (error) {
            console.error("Error saving insight:", error);
        }
    };

    // -------------- NEW: fetch list of conversations --------------
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

    // -------------- UPDATED: handle selecting a conversation --------------
    const handleSelectConversation = async (conversation: any) => {
        // 1. Close the modal
        setIsModalOpen(false);

        // 2. Set local thread, title, and any saved insights
        setThreadID(conversation.threadID);
        setTitle(conversation.title || "Untitled Conversation");

        const insights = conversation.savedInsights?.map((insight: any) => insight.text) || [];
        setSavedResponses(insights);

        // 3. Fetch the messages from your updated listMessages endpoint
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
                .reverse()
                .filter((msg: any) => msg.text.trim() !== "" || msg.sender.trim() !== "")
                .map((msg: any) => {
                    // If the backend returns "assistant" or "user" exactly, just map them directly:
                    const sender = msg.sender === "user" ? "user" : "assistant";
                    return {
                        text: msg.text,
                        sender,
                    };
                });

            setMessages(loadedMessages);
        } catch (error) {
            console.error("Error fetching conversation messages:", error);
        }
    };

    // Handle chat send
    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        const userMessage = input.trim();
        setInput("");

        try {
            const response = await fetch("http://localhost:10000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebaseUid,
                    query: userMessage,
                    // Pass threadID only if we already have one
                    threadID: threadID || undefined,
                    title,
                }),
            });

            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }

            const data = await response.json();

            if (data.threadID && !threadID) {
                setThreadID(data.threadID);

                fetch("http://localhost:10000/api/generateTitle", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firebaseUid,
                        query: userMessage,
                    }),
                })
                    .then(async (res) => {
                        if (!res.ok) {
                            throw new Error(
                                `Error generating title, status: ${res.status}`
                            );
                        }
                        const titleData = await res.json();
                        setTitle(titleData.title);
                    })
                    .catch((err) => {
                        console.error("Error fetching title:", err);
                    });
            }

            if (data.title) {
                setTitle(data.title);
            }

            setMessages((prev) => [...prev, { text: data.response, sender: "assistant" }]);
        } catch (error) {
            console.error("Error in sendMessage:", error);
        }
    };

    // -------------- NEW: Show/hide modal --------------
    const openModal = () => {
        setIsModalOpen(true);
        fetchConversations();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-row w-full h-full">
            {/* LEFT SECTION: Generated Insights */}
            <div className="w-[48%] h-full flex flex-col items-start justify-start px-8 pt-12">
                <h2 className="text-[19px] mb-4 ">Generated Insights</h2>
                {savedResponses.map((response, index) => (
                    <div
                        key={index}
                        className="mb-3 p-4 border border-gray-300 rounded-md shadow-sm bg-white w-full"
                    >
                        {response}
                    </div>
                ))}
            </div>

            {/* RIGHT SECTION: Chatbot */}
            <div className="chatbot-container flex flex-col justify-start w-[52%] h-full bg-[#faf9f9] overflow-hidden relative px-12 pt-12">
                {/* Conversation Label */}
                <div className="conversation-label flex flex-row items-center w-full mb-8 ">
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
                        <h3
                            onClick={handleIconClick}
                            className="text-[19px] cursor-pointer truncate max-w-[50%]"
                        >
                            {title}
                        </h3>
                    )}

                    <FontAwesomeIcon
                        className="pen text-[15px] cursor-pointer self-center mt-1 ml-2"
                        icon={faPen}
                        onClick={handleIconClick}
                    />

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out ml-auto"
                        onClick={openModal}
                    >
                        Conversations
                    </button>
                </div>

                {/* Chat View */}
                <div className="chat-view flex flex-col justify-center items-center w-full h-full rounded-[15px] overflow-hidden ">
                    <div className="chatbox flex flex-col w-full h-full rounded-[15px] overflow-hidden">
                        {/* Messages */}
                        <div className="chat-messages flex flex-col items-start w-full h-[82%] rounded-[15px] overflow-y-scroll py-[10px]">
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
                                    {message.sender === "assistant" ? (
                                        <div className="w-full">
                                            <p className="m-0">{message.text}</p>
                                            {/* Save button or additional actions */}
                                            <button
                                                onClick={() => handleSaveResponse(message.text)}
                                                className="text-sm text-blue-600 hover:underline mt-2 ml-auto focus:outline-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="m-0 w-full">{message.text}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="input-container flex flex-col w-full bg-[#e9e9ed] rounded-[15px] overflow-hidden px-4">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message"
                                rows={1}
                                className="chat-input flex items-center w-full bg-[#e9e9ed] border-none outline-none rounded-[15px] px-[30px] py-[15px] text-[15px] resize-none box-border mt-[10px]"
                            />
                            <div className="button-row flex justify-between items-center bg-[#e9e9ed] px-[25px] py-[10px]">
                                <div className="left-button">
                                    <FontAwesomeIcon
                                        icon={faPaperclipVertical as IconProp}
                                        className="text-[22px]"
                                    />
                                </div>
                                <div
                                    className="right-button flex justify-center items-center w-[27px] h-[27px] bg-black text-white rounded-full cursor-pointer"
                                    onClick={sendMessage}
                                >
                                    <FontAwesomeIcon
                                        icon={faArrowUp as IconProp}
                                        className="text-[20px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* -------------- NEW: The Modal for listing conversations -------------- */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={closeModal}
                        ></div>
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg p-6 z-10 w-[400px] max-h-[80%] overflow-auto">
                            <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
                            {conversations.length === 0 && <p>No conversations found</p>}
                            <ul>
                                {conversations.map((conv) => (
                                    <li
                                        key={conv._id}
                                        className="cursor-pointer p-2 border-b hover:bg-gray-100"
                                        onClick={() => handleSelectConversation(conv)}
                                    >
                                        {conv.title || `Untitled (${conv.threadID})`}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {/* -------------- END MODAL -------------- */}
            </div>
        </div>
    );
};

export default Insights;
