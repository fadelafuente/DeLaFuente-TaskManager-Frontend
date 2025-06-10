import { axiosInstance } from '@/lib/axios-instance'
import { useQuery } from '@tanstack/react-query'
import type { Task } from '../models/task';

export function useGetTaskById(id: string) {
  return useQuery<Task>({
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        return response.data;
      } catch(e) {
        console.log(e);
        return null;
      }
    },
    queryKey: [`task-${id}`],
  });
}