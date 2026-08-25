import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus(); 
    } else {
      triggerRef.current?.focus(); 
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      
      if (e.key === "Tab") {
        const focusables = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([-1])'
        );
        if (!focusables || focusables.length === 0) return;
        
        const first = focusables[0] as HTMLElement;
        const last = focusables[focusables.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
    }}>
      <div 
        ref={modalRef} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
        tabIndex={-1}
        style={{ backgroundColor: "white", color: "black", padding: "20px", borderRadius: "8px", maxWidth: "400px", width: "100%" }}
      >
        <h2 id="modal-title">{title}</h2>
        <div style={{ margin: "20px 0" }}>{children}</div>
        <button onClick={onClose} aria-label="Close modal" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Close Dialog
        </button>
      </div>
    </div>
  );
}
