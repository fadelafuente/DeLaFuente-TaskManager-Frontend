import { axiosInstance } from '@/lib/axios-instance'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/auth/logout');
      return response;
    },
    onSuccess: () => {
      toast('Logged out successfully.');
      navigate({ to: '/login' });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data?.message || 'Failed to log out.');
        return null;
      }
    }
  })
}