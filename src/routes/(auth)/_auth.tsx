import { Navbar } from '@/components/shared/navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth')({
  component: Index,
})

function Index() {
  return (
    <div className='w-full h-screen flex'>
      <Navbar />
      <div className='mt-24 w-full'>
        <Outlet />
      </div>
    </div>
  );
}