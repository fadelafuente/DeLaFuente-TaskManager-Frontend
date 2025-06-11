import { Navbar } from '@/components/shared/navbar'
import { useSession } from '@/features/auth/hooks/use-get-session';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react';
import { SessionContext } from '@/features/auth/hooks/use-get-session';

export const Route = createFileRoute('/(auth)/_auth')({
  component: Index,
})

function Index() {
  const { data: session, isLoading } = useSession();

  if(isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    );
  } else if(!session) {
    return <Navigate to='/login' />;
  }

  return (
    <SessionContext value={ session }>
      <div className='w-full h-screen flex'>
        <Navbar />
        <div className='mt-24 w-full'>
          <Outlet />
        </div>
      </div>
    </SessionContext>
  );
}