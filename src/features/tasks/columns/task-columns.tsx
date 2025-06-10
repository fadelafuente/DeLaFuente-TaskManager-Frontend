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
import { useSession } from '@/features/auth/hooks/use-get-session';
import { useUpdateTask } from '../hooks/use-update-task';
import { TaskDialog } from '../components/task-dialog';
import { useState } from 'react';
import { TaskDeleteDialog } from '../components/task-delete-dialog';

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
      const { data: session, isLoading } = useSession();
      const [openUpdate, setOpenUpdate] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);
      const { mutate: updateTask } = useUpdateTask();

      function copyToClipBoard() {
        navigator.clipboard.writeText(`${ import.meta.env.VITE_URL }/tasks/${ task.id }`);
        toast('Copied task URL to clipboard.');
      }

      if(isLoading) {
        return <div></div>;
      }

      if(!session) {
        return <div></div>;
      }

      return (
        <DropdownMenu>
          <TaskDialog open={ openUpdate } setOpen={ (o) => setOpenUpdate(o) } initialForm={ task } mutateFn={ updateTask } />
          <TaskDeleteDialog open={ openDelete } setOpen={ (o) => setOpenDelete(o) } id={ task.id } />
          <DropdownMenuTrigger>
            <Button variant='outline' className="size-8 rounded-full">
              <Ellipsis />
            </Button>
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
            { session?.username === task.creator.username ?
              <>
                <DropdownMenuItem 
                  onClick={ () => setOpenUpdate(true) }
                >
                  <PencilLine /> Update Task
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={ () => setOpenDelete(true) }
                >
                  <Eraser /> Delete Task
                </DropdownMenuItem>
              </>
            : <></>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
];