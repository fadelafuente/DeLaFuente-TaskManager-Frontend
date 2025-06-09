import { axiosInstance } from '@/lib/axios-instance'
import { useQuery } from '@tanstack/react-query'

export const useGetTaskById = (id: number) => {
  return useQuery({
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        return response;
      } catch(e) {
        console.log(e);
        return null;
      }
    },
    queryKey: [`task-${id}`],
  });
}