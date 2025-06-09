import { Requirements } from '@/components/shared/requirements'
import { usePasswordValidation } from '../hooks/use-password-validation';
import { FormDescription } from '@/components/ui/form';

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const { hasMinLength, hasLowerCase, hasUpperCase, hasNumber, hasSpecialCharacter } = usePasswordValidation(password);

  return (
    <FormDescription>
      <span>Password must contain: </span>
      <Requirements hasBoolean={ hasMinLength }>at least 8 characters</Requirements>
      <Requirements hasBoolean={ hasLowerCase }>at least 1 lowercase character</Requirements>
      <Requirements hasBoolean={ hasUpperCase }>at least 1 uppercase character</Requirements>
      <Requirements hasBoolean={ hasNumber }>at least 1 number</Requirements>
      <Requirements hasBoolean={ hasSpecialCharacter }>at least 1 special character (!, @, #, $, %, ^, &, +, =)</Requirements>
    </FormDescription>
  )
}
