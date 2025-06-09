import { axiosInstance } from '@/lib/axios-instance'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import type { authSchemaType } from '../schemas/auth-schema';
import { useNavigate } from '@tanstack/react-router';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: authSchemaType) => {
      const response = await axiosInstance.post('/auth/register', body);
      return response;
    },
    onSuccess: () => {
      toast('Account created successfully.');
      navigate({ to: '/login' });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data?.message || 'Account failed to create.');
        return null;
      }
    }
  })
}