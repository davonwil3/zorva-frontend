import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclipVertical, faArrowUp } from "@fortawesome/pro-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/pro-solid-svg-icons";
import "../css/insights.css";
import { getAuth } from 'firebase/auth';
import { app } from '../index';

// Import MUI Button
import Button from "@mui/material/Button";

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
        <div className="chatbot-container">
            <div className="conversation-label" style={{ display: "flex", alignItems: "center" }}>
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        style={{ marginRight: "12px" }}
                    />
                ) : (
                    <h3 onClick={handleIconClick} style={{ cursor: "pointer", marginRight: "12px" }}>
                        {title}
                    </h3>
                )}

                <FontAwesomeIcon
                    className="pen"
                    icon={faPen}
                    onClick={handleIconClick}
                    style={{ marginRight: "20px" }}
                />
                <Button
                    variant="contained"
                    style={{ marginLeft: "auto" }}
                    onClick={() => console.log("Navigate to conversations or open a drawer, etc.")}
                >
                    Conversations
                </Button>
            </div>

            <div className="chat-view">
                <div className="chatbox">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${message.sender === "user" ? "user-message" : "assistant-message"}`}
                            >
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="input-container">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message"
                            className="chat-input"
                            rows={1}
                        />
                        <div className="button-row">
                            <div className="left-button">
                                <FontAwesomeIcon
                                    icon={faPaperclipVertical as IconProp}
                                    style={{ fontSize: "22px" }}
                                    size="lg"
                                />
                            </div>
                            <div className="right-button" onClick={sendMessage}>
                                <FontAwesomeIcon
                                    icon={faArrowUp as IconProp}
                                    style={{ fontSize: "20px" }}
                                    size="lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;
