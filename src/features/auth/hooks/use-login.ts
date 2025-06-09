import { axiosInstance } from '@/lib/axios-instance'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import type { authSchemaType } from '../schemas/auth-schema';
import { useNavigate } from '@tanstack/react-router';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: authSchemaType) => {
      const response = await axiosInstance.post('/auth/login', body);
      return response;
    },
    onSuccess: () => {
      toast('Logged in successfully.');
      navigate({ to: '/' });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data?.message || 'Failed to log in.');
        return null;
      }
    }
  })
}