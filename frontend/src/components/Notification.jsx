import { useEffect, useState } from "react";
import "./Notification.css";

export default function Notification({ message, type = "info", visible, onClose }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!show) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}
