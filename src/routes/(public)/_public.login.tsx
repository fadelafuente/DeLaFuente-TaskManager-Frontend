import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authSchema, type authSchemaType } from '@/features/auth/schemas/auth-schema';
import { useLogin } from '@/features/auth/hooks/use-login';

export const Route = createFileRoute('/(public)/_public/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: login } = useLogin();

  const form = useForm<authSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: ''
    },
  });

  function onSubmit(values: authSchemaType) {
    login(values);
  };

  return (
    <div className='flex items-center justify-center h-screen min-w-[300px]'>
      <Card className='w-136'>
        <CardHeader>
          <CardTitle>Log into your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input placeholder='username*' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input placeholder='password*' {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full hover:cursor-pointer'>Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex gap-1'>
          <p>Don't have an account?</p> <Link to='/register' className='underline text-blue-600'>Register</Link>
        </CardFooter>
      </Card>
    </div>
  );
}