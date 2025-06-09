import { UserProfile } from '@/features/auth/components/user-profile';

export function Navbar() {
  return (
    <div className='flex w-full bg-slate-300 absolute p-4 justify-between'>
      <h1 className='text-xl font-bold'>Task Manager</h1>
      <div>
        <UserProfile />
      </div>
    </div>
  );
}