import React from "react";
import { useState, useEffect } from "react";
import "../chatbot.css";

const Chatbot = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

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



    return (
        <div className="chatbot-container">
            <div className="chat-view">
                <div className="chatbox">
                    <div className="chat-messages">

                    </div>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        className='chat-input'
                    />
                </div>


            </div>

        </div>
    );
}

export default Chatbot;

