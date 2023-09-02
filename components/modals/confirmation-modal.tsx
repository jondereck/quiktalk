"use client";


import { Button } from "../ui/button";
import { DialogTitle, Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter } from "../ui/dialog";


interface DeleteConfirmationModalProps {
  title: string;
  isOpen: boolean
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
}

export const DeleteConfirmationModal = ({
  title,
  onCancel,
  onConfirm,
  isOpen,
  disabled = false
}: DeleteConfirmationModalProps) => {

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onCancel} >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
          This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={onCancel}
              variant="ghost">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="ml-2" variant="primary"
              disabled={disabled}
            >
              Confirm
            </Button>
          </div>

        </DialogFooter>
      </DialogContent>
    </Dialog>






  );
}
