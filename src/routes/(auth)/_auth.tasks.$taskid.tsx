import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetTaskById } from '@/features/tasks/hooks/use-get-task-by-id';
import { createFileRoute, useNavigate, useParams, useRouter } from '@tanstack/react-router';
import { ArrowLeft, ClipboardX, Eraser, Loader2, PencilLine } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { typeMapColors } from '@/features/tasks/enums/type-enum';
import { cn, formatDate } from '@/lib/utils';
import { statusMapColors } from '@/features/tasks/enums/status-enum';
import { useContext, useState } from 'react';
import { useUpdateTask } from '@/features/tasks/hooks/use-update-task';
import { TaskDialog } from '@/features/tasks/components/task-dialog';
import { TaskDeleteDialog } from '@/features/tasks/components/task-delete-dialog';
import { useDeleteTask } from '@/features/tasks/hooks/use-delete-task';
import { SessionContext } from '@/features/auth/hooks/use-get-session';

export const Route = createFileRoute('/(auth)/_auth/tasks/$taskid')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = useParams({ from: '/(auth)/_auth/tasks/$taskid' });
  const { history } = useRouter();
  const { data: task, isLoading } = useGetTaskById(params.taskid);
  const session = useContext(SessionContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const navigate = useNavigate();

  function handleDelete(open: boolean) {
    if(!task) return;

    deleteTask(task?.id, {
      onSuccess: () => {
        setOpenDelete(open);
        navigate({ to: '/' })
      }
    });
  }

  if(isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 items-center h-full'>
      { task ? 
        <div className='flex flex-col gap-2 w-150'>
          <TaskDialog open={ openUpdate } setOpen={ setOpenUpdate } initialForm={ task } mutateFn={ updateTask } />
          <TaskDeleteDialog open={ openDelete } setOpen={ setOpenDelete } id={ task.id } onDeleteTask={ handleDelete } />
          <h1 className='flex items-center mb-4 justify-between'>
            <div className='flex gap-4 items-center'>
              <Button variant='outline' onClick={ () => history.go(-1) }><ArrowLeft /></Button>
              <span className='text-2xl font-bold'>Task</span>
            </div>
            { session && task.creator.username === (session as any)?.username ?
              <div className='flex gap-2'>
                <Button variant='destructive' onClick={ () => setOpenDelete(true) }>
                  <Eraser />
                </Button>
                <Button variant='outline' onClick={ () => setOpenUpdate(true) }>
                  <PencilLine />
                </Button>
              </div>
            : <></> }           
          </h1>
          <div className='flex gap-2'>
            <Badge className={
              cn(
                'p-2 rounded-full font-bold',
                statusMapColors.get(task.status)
              )}
            >{ task.status }</Badge>
            <Badge className={ cn(
              'p-2 rounded-full font-bold',
              typeMapColors.get(task.type)
            ) }>{ task.type }</Badge>
          </div>
          <span>@{ task.creator.username }</span>
          <div>
            <p>Start Date:&nbsp;{ formatDate(new Date(task.dateCreated).toLocaleDateString()) }</p>
            <p>Due Date:&nbsp;&nbsp;{ formatDate(new Date(task.dueDate).toLocaleDateString()) }</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ task.description }</p>
            </CardContent>
          </Card>
        </div>
      :
        <>
          <Card className='w-150'>
            <CardHeader className='flex items-center justify-center'>
              <CardTitle className='text-6xl font-bold text-center'>404</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <ClipboardX className='size-32 text-center' />
            </CardContent>
            <CardFooter className='flex items center justify-center'>
              <CardDescription className='text-xl'>Task not be found.</CardDescription>
            </CardFooter>
          </Card>
        </>
      }
    </div>
  );
}
