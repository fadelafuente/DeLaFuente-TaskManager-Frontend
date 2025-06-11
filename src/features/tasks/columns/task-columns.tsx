'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Task } from '../models/task'
import type { Creator } from '../models/creator';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Ellipsis, Eye, Clipboard, Eraser, PencilLine } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateTask } from '../hooks/use-update-task';
import { TaskDialog } from '../components/task-dialog';
import { useContext, useState } from 'react';
import { TaskDeleteDialog } from '../components/task-delete-dialog';
import { useDeleteTask } from '../hooks/use-delete-task';
import { SessionContext } from '@/features/auth/hooks/use-get-session';

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'creator',
    header: 'Creator',
    cell: ({ row }) => {
      const creator: Creator = row.getValue('creator');

      return (
        <div>{ creator.username }</div>
      )
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Task Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Task Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dueDate: string = formatDate((new Date(row.getValue('dueDate'))).toLocaleDateString());

      return (
        <div>{ dueDate }</div>
      )
    }
  },
  {
    id: 'Options',
    cell: ({ row }) => {
      const task: Task = row.original;
      const navigate = useNavigate();
      const session = useContext(SessionContext);
      const [openUpdate, setOpenUpdate] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);
      const { mutate: updateTask } = useUpdateTask();
      const { mutate: deleteTask } = useDeleteTask();

      function handleDeleteTask() {
        deleteTask(task.id);
        setOpenDelete(false);
      }

      function copyToClipBoard() {
        navigator.clipboard.writeText(`${ import.meta.env.VITE_URL }/tasks/${ task.id }`);
        toast('Copied task URL to clipboard.');
      }

      if(!session) {
        return <div></div>;
      }

      return (
        <div className='w-full flex justify-end'>
          <DropdownMenu>
            <TaskDialog open={ openUpdate } setOpen={ (o) => setOpenUpdate(o) } initialForm={ task } mutateFn={ updateTask } />
            <TaskDeleteDialog open={ openDelete } setOpen={ (o) => setOpenDelete(o) } id={ task.id } onDeleteTask={ handleDeleteTask } />
            <DropdownMenuTrigger className="size-8 rounded-full flex items-center justify-center">
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => copyToClipBoard()}
              >
                <Clipboard /> Copy Task URL
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={ () => navigate({ to: `/tasks/${task.id}` }) }
              >
                <Eye /> View Task
              </DropdownMenuItem>
              { session && (session as any)?.username === task.creator.username ?
                <>
                  <DropdownMenuItem 
                    onClick={ () => setOpenUpdate(true) }
                  >
                    <PencilLine /> Update Task
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={ () => setOpenDelete(true) }
                    variant='destructive'
                  >
                    <Eraser /> Delete Task
                  </DropdownMenuItem>
                </>
              : <></>
              }
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    }
  },
];