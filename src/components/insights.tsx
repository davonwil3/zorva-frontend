import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclipVertical, faArrowUp } from "@fortawesome/pro-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/pro-solid-svg-icons";
import { getAuth } from 'firebase/auth';
import { app } from '../index';

const Insights = () => {
    // Sample messages for demonstration
    const [messages, setMessages] = useState([
        { text: "Hello! Welcome to Zorva! Start by typing a message to your AI assistant.", sender: "assistant" }
    ]);
    const [input, setInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("Chatbot");
    const [threadID, setThreadID] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const auth = getAuth(app);
    const firebaseUid = auth.currentUser?.uid;

    // Adjust text area height automatically
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [input]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleIconClick = () => {
        setIsEditing(true);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Temporarily add user’s message to UI
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);

        const userMessage = input.trim();
        setInput("");

        try {
            // Make the request to your chat endpoint
            // If threadID is null, don't send it. Otherwise, include it.
            const response = await fetch("http://localhost:10000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firebaseUid,
                    query: userMessage,
                    threadID: threadID || undefined, // if threadID is null, omit
                    title,
                }),
            });

            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }

            const data = await response.json();

            // If the server returns a threadID (on first request or subsequent ones), store it
            if (data.threadID && !threadID) {
                setThreadID(data.threadID);
            }

            // Add assistant’s response to the conversation
            setMessages((prev) => [...prev, { text: data.response, sender: "assistant" }]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex flex-row w-full h-full">

            <div className="w-[44%] h-full flex flex-col items-start justify-start ">
                <h2> Generated Insights</h2>

            </div>
            <div className="chatbot-container flex flex-col justify-center w-[56%] h-full bg-[#faf9f9] overflow-hidden relative px-8 pt-8">
                {/* Conversation Label */}
                <div className="conversation-label flex flex-row items-center w-full mb-4">
                    {isEditing ? (
                        <input
                            type="text"
                            value={title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                            className="rounded-md border border-[#c6c5c5] focus:outline-none text-[19px] h-[30px] px-2"
                        />
                    ) : (
                        <h3
                            onClick={handleIconClick}
                            className="text-[19px] cursor-pointer"
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
                        onClick={() => console.log("Navigate to conversations or open a drawer, etc.")}
                    >
                        Conversations
                    </button>
                </div>

                {/* Chat View */}
                <div className="chat-view flex flex-col justify-center items-center w-full h-full rounded-[15px] overflow-hidden">
                    <div className="chatbox flex flex-col w-full h-full rounded-[15px] overflow-hidden">
                        {/* Messages */}
                        <div className="chat-messages flex flex-col items-start w-full h-[82%] rounded-[15px] overflow-y-scroll py-[10px] px-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${message.sender === "user"
                                            ? "user-message self-end bg-[#e1e1e3]"
                                            : "assistant-message justify-start"
                                        } mt-[10px] mb-[10px] rounded-[15px] p-[10px] max-w-[80%] break-words`}
                                >
                                    <p className="m-0 inline">{message.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="input-container flex flex-col w-full bg-[#e9e9ed] rounded-[15px] overflow-hidden">
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
            </div>

        </div>

    );
};

export default Insights;
