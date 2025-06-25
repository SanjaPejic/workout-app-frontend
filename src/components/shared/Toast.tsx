import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ToastProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

function Toast({ visible, message, onClose }: ToastProps) {
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
