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
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router';
import { ArrowLeft, ClipboardX, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { typeMapColors } from '@/features/tasks/enums/type-enum';
import { cn, formatDate } from '@/lib/utils';
import { statusMapColors } from '@/features/tasks/enums/status-enum';

export const Route = createFileRoute('/(auth)/_auth/tasks/$taskid')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = useParams({ from: '/(auth)/_auth/tasks/$taskid' });
  const { history } = useRouter();
  const { data: task, isLoading } = useGetTaskById(params.taskid);

  if(isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    );
  }

  console.log(task);

  return (
    <div className='flex flex-col gap-4 items-center h-full'>
      { task ? 
        <div className='flex flex-col gap-2 w-150'>
          <h1 className='flex gap-2 items-center mb-2'>
            <Button variant='outline' onClick={ () => history.go(-1) }><ArrowLeft /></Button>
            <span className='text-2xl font-bold'>Task</span>
          </h1>
          <div className='flex justify-between'>
            <span>@{ task.creator.username }</span>
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
          </div>
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
