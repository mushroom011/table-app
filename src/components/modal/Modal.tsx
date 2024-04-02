import { Dispatch, ReactNode, SetStateAction } from "react";
import "./style.css";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLInputElement;
    if(target.classList.contains('modal')) handleClose();
  };

  const handleClose = () => onClose(false);

  return createPortal(
    <>
      {isOpen && (
        <div className="modal" onMouseDown={handleBackgroundClick} >
          <div className="modal__content">
            <header className="modal__header">
              <span className="modal__title">{title}</span>
              <button className="modal__close-btn" onClick={handleClose}>
                X
              </button>
            </header>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")!
  );
}
