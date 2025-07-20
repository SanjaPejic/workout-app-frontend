import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface ToastProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

function Toast({ visible, message, onClose, duration = 1500 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="right-4 bottom-4 slide-in-from-bottom-2 z-50 fixed bg-white shadow-lg p-4 border border-gray-200 rounded-lg animate-in">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-900">{message}</span>
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 p-0 rounded-full w-6 h-6"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default Toast;
