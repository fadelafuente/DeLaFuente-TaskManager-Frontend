import { createFileRoute, Link } from '@tanstack/react-router';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form';
import { authSchema, type authSchemaType } from '@/features/auth/schemas/auth-schema';
import { useRegister } from '@/features/auth/hooks/use-register';
import { PasswordRequirements } from '@/features/auth/components/password-requirements';

export const Route = createFileRoute('/(public)/_public/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: register } = useRegister();

  const form = useForm<authSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: ''
    },
  });

  const password = useWatch({ control: form.control, name: "password" });

  function onSubmit(values: authSchemaType) {
    register(values);
  };

  return (
    <div className='flex items-center justify-center h-screen min-w-[300px]'>
      <Card>
        <CardHeader>
          <CardTitle>Register a new account</CardTitle>
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
                    <FormDescription>
                      This is your public display name. Must be alphanumeric and at least 5 characters.
                    </FormDescription>
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
                      <Input placeholder='password*' {...field} />
                    </FormControl>
                    <PasswordRequirements password={ password } />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full hover:cursor-pointer'>Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex gap-1'>
          <p>Already have an account?</p> <Link to='/login' className='underline text-blue-600'>login</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
