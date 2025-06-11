import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface TaskDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDeleteTask: (open: boolean) => void;
  id: number;
}

export function TaskDeleteDialog({ open, setOpen, onDeleteTask }: TaskDeleteDialogProps) {
  
  return(
    <AlertDialog open={ open } onOpenChange={ setOpen }>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={ () => setOpen(false) }>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={ () => onDeleteTask(false) }>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}