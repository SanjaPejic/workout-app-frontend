import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface RemoveExConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function RemoveExConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}: RemoveExConfirmationProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            DO YOU WANT TO REMOVE THE EXERCISE?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-4">
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-white hover:bg-gray-200 active:bg-gray-300 px-8 py-2 border border-gray-300 hover:border-gray-400 text-gray-900 transition-colors"
          >
            YES
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={onCancel}
            className="hover:bg-gray-200 active:bg-gray-300 px-8 py-2 transition-colors"
          >
            NO
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveExConfirmationModal;
