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
  onYes: () => void;
  onNo: () => void;
}

function RemoveExConfirmationModal({
  isOpen,
  onYes,
  onNo,
}: RemoveExConfirmationProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onNo()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            DO YOU WANT TO REMOVE THE EXERCISE?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-4">
          <AlertDialogAction
            onClick={onYes}
            className="bg-white hover:bg-gray-200 active:bg-gray-300 px-8 py-2 border border-gray-300 hover:border-gray-400 text-gray-900 transition-colors"
          >
            YES
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={onNo}
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
