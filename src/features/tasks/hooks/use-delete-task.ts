import { axiosInstance } from '@/lib/axios-instance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(`/tasks/${id}`);
      return response;
    },
    onSuccess: () => {
      toast('Task deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data?.message || 'Task failed to delete.');
        return null;
      }
    }
  })
}