import { Check, X } from 'lucide-react'
import type React from 'react';

interface RequirementsProps {
  hasBoolean: boolean;
  children: React.ReactNode;
}

export function Requirements({ hasBoolean, children }: RequirementsProps) {
  return (
    <span className='flex flex-row gap-1'>
      { hasBoolean ? <Check className='text-green-500' /> : <X className='text-red-500' /> }
      { children }
    </span>
  );
}
