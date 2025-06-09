import { axiosInstance } from '@/lib/axios-instance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import type { TaskSchemaType } from '../schemas/task-schema';

interface useUpdateTaskProps {
  id: number;
  body: TaskSchemaType; 
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: useUpdateTaskProps) => {
      const response = await axiosInstance.post(`/tasks/${id}`, body);
      return response;
    },
    onSuccess: () => {
      toast('Task updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data?.message || 'Task failed to update.');
        return null;
      }
    }
  })
}