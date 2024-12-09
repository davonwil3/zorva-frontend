import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclipVertical, faArrowUp } from '@fortawesome/pro-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import "../chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([{ text : 'Hello welcome to Zorva! start by typing a message to your ai assistant', sender : 'assistant' },
     { text : 'thanks im Davon', sender : 'user' }]);
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

    const sendMessage = () => {
        if (input) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
        }

        fetch("http://localhost:10000/api/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assistantId: "asst_Kwk9RbLgIjL3L1fDB4Ye3md0",
                message: input
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessages([...messages, { text: data.text, sender: 'assistant' }]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <div className="chatbot-container">
            <div className="chat-view">
                <div className="chatbox">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.sender === 'user' ? 'user-message' : 'assistant-message'}`}>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type a message"
                            className='chat-input'
                            rows={1}
                        ></textarea>
                        <div className="button-row">
                            <div className="left-button">
                                <FontAwesomeIcon icon={faPaperclipVertical as IconProp} style={{fontSize : "22px"}} size="lg" />
                            </div>
                            <div className="right-button">
                                <FontAwesomeIcon icon={faArrowUp as IconProp} style={{fontSize : "20px"}} size="lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;