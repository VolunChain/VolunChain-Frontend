import { useEffect, useRef, useState, useCallback } from 'react';

type ValidatorResult = string | true;
type ValidatorFn<T> = (value: T) => Promise<ValidatorResult> | ValidatorResult;

interface ValidationResult {
  isValid: boolean | null;
  error: string | null | undefined;
  isLoading: boolean;
  revalidate: () => void;
}

export function useDebouncedValidator<T>(
  value: T,
  validator: ValidatorFn<T>,
  delay: number = 300,
  validateImmediately: boolean = false
): ValidationResult {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestValue = useRef<T>(value);

  const validate = useCallback(async (valueToValidate: T) => {
    try {
      setIsLoading(true);
      const result = await Promise.resolve(validator(valueToValidate));
      
      if (valueToValidate !== latestValue.current) return;

      if (result === true) {
        setIsValid(true);
        setError(null);
      } else {
        setIsValid(false);
        setError(typeof result === 'string' ? result : 'Validation failed');
      }
    } catch (err) {
      if (valueToValidate !== latestValue.current) return;
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Validation failed');
    } finally {
      if (valueToValidate === latestValue.current) {
        setIsLoading(false);
      }
    }
  }, [validator]);

  const revalidate = useCallback(() => {
    validate(value);
  }, [validate, value]);

  useEffect(() => {
    latestValue.current = value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (validateImmediately) {
      validate(value);
    } else {
      timeoutRef.current = setTimeout(() => {
        validate(value);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, validate, validateImmediately]);

  return { isValid, error, isLoading, revalidate };
} 