import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { taskSchema, type TaskSchemaType } from '../schemas/task-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutateFunction } from '@tanstack/react-query';
import { typeEnumValues } from '../enums/type-enum';
import { statusEnumValues } from '../enums/status-enum';
import { DatePicker } from '@/components/shared/date-picker';
import { AutosizeTextarea } from '@/components/ui/auto-textarea';
import { DialogDescription } from '@radix-ui/react-dialog';

interface TaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialForm: TaskSchemaType;
  mutateFn: UseMutateFunction<any, Error, TaskSchemaType, unknown>;
}

export function TaskDialog({ open, setOpen, initialForm, mutateFn }: TaskDialogProps) {  
  const form = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialForm,
  });

  function onSubmit(values: TaskSchemaType) {
    mutateFn(values, {
      onSuccess: () => {
        setOpen(false);
        if(values.id === undefined)
          form.reset();
      }
    });
  };

  return (
    <Dialog open={ open } onOpenChange={ setOpen }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Input the details for your new task.
        </DialogDescription>
        <ScrollArea className='max-h-150 w-full rounded-md pr-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Type*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='min-w-[50%]'>
                          <SelectValue placeholder='Select a task type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          typeEnumValues.map((taskType) => (
                            <SelectItem value={ taskType } key={ taskType }>{ taskType }</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='dueDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date*</FormLabel>
                    <FormControl>
                      <DatePicker value={ new Date(field.value) } onChange={ field.onChange } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='min-w-[50%]'>
                          <SelectValue placeholder='Select a status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          statusEnumValues.map((taskStatus) => (
                            <SelectItem value={ taskStatus } key={ taskStatus }>{ taskStatus }</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <AutosizeTextarea className='ml-1 w-[98%]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full hover:cursor-pointer'>Submit</Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}