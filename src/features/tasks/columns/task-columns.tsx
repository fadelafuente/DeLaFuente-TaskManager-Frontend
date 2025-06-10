'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Task } from '../models/task'
import type { Creator } from '../models/creator';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

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
    header: 'Task Type',
  },
  {
    accessorKey: 'status',
    header: 'Task Status',
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
      const dueDate: Date = new Date(row.getValue('dueDate'));
      const formattedDate = dueDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });

      return (
        <div>{ formattedDate }</div>
      )
    }
  },
];