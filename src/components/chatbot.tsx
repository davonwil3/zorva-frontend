import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclipVertical, faArrowUp } from '@fortawesome/pro-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import "../chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        fetch("http://localhost:10000/api/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assistantId: "asst_Kwk9RbLgIjL3L1fDB4Ye3md0",
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset the height
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set the height to the scroll height
        }
    }, [input]);

    return (
        <div className="chatbot-container">
            <div className="chat-view">
                <div className="chatbox">
                    <div className="chat-messages">
                        {/* Render chat messages here */}
                    </div>
                    <div className="input-container">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type a message"
                            className='chat-input'
                            rows={2}
                        ></textarea>
                        <div className="button-row">
                            <FontAwesomeIcon icon={faPaperclipVertical as IconProp} size="lg"  />
                            <FontAwesomeIcon icon={faArrowUp as IconProp} size="lg"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;