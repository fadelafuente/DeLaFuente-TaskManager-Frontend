import { useMemo } from "react";

export function usePasswordValidation(password: string) {
  const hasMinLength = useMemo(() => { 
    return password.length >=8;
    }, [password]);

  const hasLowerCase = useMemo(() => { 
    const regex = /(?=.*[a-z])/
    return regex.test(password);
    }, [password]);

    const hasUpperCase = useMemo(() => { 
    const regex = /(?=.*[A-Z])/
    return regex.test(password);
    }, [password]);

    const hasNumber = useMemo(() => { 
    const regex = /(?=.*[0-9])/
    return regex.test(password);
    }, [password]);

    const hasSpecialCharacter = useMemo(() => { 
    const regex = /(?=.*[!@#$%^&+=])/
    return regex.test(password);
    }, [password]);

    return { hasMinLength, hasLowerCase, hasUpperCase, hasNumber, hasSpecialCharacter }
}