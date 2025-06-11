import { axiosInstance } from '@/lib/axios-instance'
import { useQuery } from '@tanstack/react-query'
import { createContext } from 'react';

export function useSession() {
  return useQuery({
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/auth/session');
        return response.data;
      } catch(e) {
        console.log(e);
        return null;
      }
    },
    queryKey: [`auth`],
  });
}

export const SessionContext = createContext(null);