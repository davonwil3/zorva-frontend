import React, { useState, useRef } from 'react';
import Modal from './modal';

interface ChatHeaderProps {
    assistants: string[];
    selectedAssistant: string;
    onSelectAssistant: (assistant: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ assistants, selectedAssistant, onSelectAssistant }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAssistantSelect = (assistant: string) => {
        onSelectAssistant(assistant);
        setIsModalOpen(false);
    };

    return (
        <div className="chat-header">
            {assistants.length > 1 ? (
                <>
                    <button ref={toggleRef} onClick={handleModalToggle} className="modal-toggle">
                        {selectedAssistant}
                    </button>
                    <Modal isOpen={isModalOpen} onClose={handleModalToggle} toggleRef={toggleRef}>
                        <p className="modal-title">Assistants</p>
                        <ul className="modal-menu">
                            {assistants.map((assistant) => (
                                <li key={assistant} onClick={() => handleAssistantSelect(assistant)} className="modal-menu-item">
                                    {assistant}
                                </li>
                            ))}
                        </ul>
                    </Modal>
                </>
            ) : (
                <div className="assistant-header">{selectedAssistant}</div>
            )}
        </div>
    );
};

export default ChatHeader;