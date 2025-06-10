import { useSession } from '@/features/auth/hooks/use-get-session';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/(public)/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session, isLoading } = useSession();

  if(isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    );
  } else if(session) {
    return <Navigate to='/' />;
  }
  
  return (
    <div>
      <Outlet />
    </div>
  );
}
