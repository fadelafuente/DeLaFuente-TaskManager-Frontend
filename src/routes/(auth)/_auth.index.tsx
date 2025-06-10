import { taskColumns } from '@/features/tasks/columns/task-columns';
import { TaskTable } from '@/features/tasks/components/task-table';
import { useGetTasks } from '@/features/tasks/hooks/use-get-tasks'
import { createFileRoute } from '@tanstack/react-router'
import type { PaginationState, SortingState } from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/(auth)/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: tasks, isLoading } = useGetTasks({ pagination, sorting });

  if(isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    )
  }

  return (
    <div className='mx-4 lg:mx-12'>
      <TaskTable 
        columns={ taskColumns } 
        data={ tasks['content'] } 
        paginationState={ { pagination, setPagination } }
        sortingState={ { sorting, setSorting } }
        pageCount={ tasks?.totalPages }
      />
    </div>
  );
}
