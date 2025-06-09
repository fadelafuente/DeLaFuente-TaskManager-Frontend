import { UserIcon } from '@/components/shared/user-icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react';
import { LogoutDialog } from './logout-dialog';

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserIcon username={ 'Anonymous' } />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={ () => setIsOpen(true) }>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={ isOpen } setOpen={ setIsOpen } />
    </>
  )
}