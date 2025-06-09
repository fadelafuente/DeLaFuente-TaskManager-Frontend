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
import { useLogout } from "../hooks/use-logout";

interface LogoutDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function LogoutDialog({ open, setOpen }: LogoutDialogProps) {
    const { mutate: logout } = useLogout();

  function handleLogout() {
    logout();
    setOpen(false);
  }
  
  return(
    <AlertDialog open={ open } onOpenChange={ setOpen }>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            TAre you absolutely sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={ () => setOpen(false) }>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={ handleLogout }>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}