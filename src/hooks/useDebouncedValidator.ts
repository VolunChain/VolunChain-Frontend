import { useEffect, useRef, useState } from 'react';

type ValidatorResult = string | true;
type ValidatorFn<T> = (value: T) => Promise<ValidatorResult> | ValidatorResult;

interface ValidationResult {
  isValid: boolean;
  error: string | null;
  isLoading: boolean;
}

export function useDebouncedValidator<T>(
  value: T,
  validator: ValidatorFn<T>,
  delay: number = 300
): ValidationResult {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestValue = useRef<T>(value);
  const abortControllerRef = useRef<AbortController | null>(null);

  const validate = async (valueToValidate: T) => {
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
  };

  useEffect(() => {
    latestValue.current = value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    timeoutRef.current = setTimeout(() => {
      validate(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [value, delay]);

  return { isValid, error, isLoading };
} 