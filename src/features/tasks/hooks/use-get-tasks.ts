import { axiosInstance } from '@/lib/axios-instance'
import { useQuery } from '@tanstack/react-query'

export const useGetTasks = () => {
  return useQuery({
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/tasks');
        return response;
      } catch(e) {
        console.log(e);
        return [];
      }     
    },
    queryKey: ['tasks'],
  });
}