import { UserProfile } from '@/features/auth/components/user-profile';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { TaskDialog } from '@/features/tasks/components/task-dialog';
import { useCreateTask } from '@/features/tasks/hooks/use-create-task';

export function Navbar() {
  const [isCreateDialogOpen, setiIsCreateDialogOpen] = useState(false);
  const { mutate: createTask } = useCreateTask();

  return (
    <>
      <TaskDialog 
        open={ isCreateDialogOpen } 
        setOpen={ (open: boolean) => setiIsCreateDialogOpen(open) } 
        initialForm={ { type: 'TASK', description: '', dueDate: new Date(), status: 'TO_DO' } }
        mutateFn={ createTask }
      />
      <div className='flex w-full bg-slate-300 fixed p-4 justify-between'>
        <h1 className='text-xl font-bold'>Task Manager</h1>
        <div className='flex gap-4'>
          <Button 
            className='bg-green-400 hover:bg-green-500'
            onClick={ () => setiIsCreateDialogOpen(true) }
          >
            <Plus /> Create
          </Button>
          <UserProfile />
        </div>
      </div>
    </>
  );
}