import { axiosInstance } from '@/lib/axios-instance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import type { TaskSchemaType } from '../schemas/task-schema';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: TaskSchemaType) => {
      const response = await axiosInstance.post('/tasks', body);
      return response;
    },
    onSuccess: () => {
      toast('Task created successfully.');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data?.message || 'Task failed to create.');
        return null;
      }
    }
  })
}