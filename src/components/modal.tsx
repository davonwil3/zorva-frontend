import React, { useEffect, useRef } from 'react';
import '../Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    toggleRef: React.RefObject<HTMLButtonElement>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, toggleRef }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, toggleRef]);

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="modal-content">
            {children}
        </div>
    );
};

export default Modal;