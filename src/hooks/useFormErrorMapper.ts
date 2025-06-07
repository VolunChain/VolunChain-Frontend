import { useCallback } from "react";

// types for backend error formats
type BackendErrorObject = Record<string, string>;
type BackendErrorArray = Array<{ field: string; message: string }>;
type KeyMapper = (key: string) => string;

// Options for the hook
interface UseFormErrorMapperOptions {
  keyMapper?: KeyMapper; // Transform keys (snake_case --> camelCase)
  onUnknownField?: (field: string, message: string) => void; // Handle unknown fields
  knownFields?: string[]; // Optional: List of known form fields to validate against
}

// Expected type for setError (react-hook-form)
type SetErrorFn = (field: string, error: { type: string; message: string }) => void;

const useFormErrorMapper = (
  setError: SetErrorFn,
  options: UseFormErrorMapperOptions = {}
) => {
  const { keyMapper, onUnknownField, knownFields } = options;

  const mapErrors = useCallback(
    (errorResponse: BackendErrorObject | BackendErrorArray) => {
      const mapSingleError = (field: string, message: string) => {
        const mappedField = keyMapper ? keyMapper(field) : field;

        if (knownFields && !knownFields.includes(mappedField)) {
          if (onUnknownField) {
            onUnknownField(mappedField, message); 
          }
          return; 
        }

        setError(mappedField, { type: "manual", message });
      };

      // Handle object format: { email: "Invalid email" }
      if (!Array.isArray(errorResponse)) {
        Object.entries(errorResponse).forEach(([field, message]) => {
          mapSingleError(field, message);
        });
      }
      // Handle array format: [{ field: "email", message: "Invalid email" }]
      else {
        errorResponse.forEach(({ field, message }) => {
          mapSingleError(field, message);
        });
      }
    },
    [setError, keyMapper, onUnknownField, knownFields]
  );

  return mapErrors;
};

export default useFormErrorMapper;