import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface UserIconProps {
  username: string;
}

export function UserIcon({ username }: UserIconProps) {
  function truncateUsername(username: string) {
    return username.substring(0, 2).toUpperCase();
  }

  return (
    <Avatar>
      <AvatarFallback>{ truncateUsername(username) }</AvatarFallback>
    </Avatar>
  )
}