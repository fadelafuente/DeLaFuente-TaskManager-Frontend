import { Button } from '@/components/ui/button';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/(auth)/_auth/tasks/$taskid')({
  component: RouteComponent,
})

function RouteComponent() {
  const { history } = useRouter();

  return <div>
    <Button variant='outline' onClick={ () => history.go(-1) }><ArrowLeft /></Button>
  </div>
}
