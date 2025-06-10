import { axiosInstance } from '@/lib/axios-instance'
import { useQuery } from '@tanstack/react-query'
import type { PaginationState } from '@tanstack/react-table';

interface useGetTasksProps {
  pagination: PaginationState;
}

export function useGetTasks({ pagination }: useGetTasksProps) {
  return useQuery({
    queryFn: async () => {
      try {
        const query: string = `?page=${pagination.pageIndex}&size=${pagination.pageSize}`;
        const response = await axiosInstance.get(`/tasks${query}`);
        return response.data;
      } catch(e) {
        console.log(e);
        return [];
      }     
    },
    queryKey: ['tasks', pagination],
  });
}