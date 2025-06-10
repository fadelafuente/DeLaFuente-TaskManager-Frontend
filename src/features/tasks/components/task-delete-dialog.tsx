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
import { useDeleteTask } from "../hooks/use-delete-task";

interface TaskDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export function TaskDeleteDialog({ open, setOpen, id }: TaskDeleteDialogProps) {
    const { mutate: deleteTask } = useDeleteTask();

  function handleDeleteTask() {
    deleteTask(id);
    setOpen(false);
  }
  
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
          <AlertDialogAction onClick={ handleDeleteTask }>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}