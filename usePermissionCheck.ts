import { useContext } from "react";

// Example context shape
interface AuthContextType {
  roles?: string[];
  permissions?: string[];
}
const AuthContext = React.createContext<AuthContextType>({});

// Hook options
interface UsePermissionCheckOptions {
  throwOnUnauthorized?: boolean;
}

// Main hook
export function usePermissionCheck(
  required: string | string[],
  source?: { roles?: string[]; permissions?: string[] },
  options?: UsePermissionCheckOptions
): boolean {
  const context = useContext(AuthContext);
  const userRoles = source?.roles ?? context.roles ?? [];
  const userPermissions = source?.permissions ?? context.permissions ?? [];

  const requiredArr = Array.isArray(required) ? required : [required];

  // Check roles and permissions
  const hasAccess =
    requiredArr.some((r) => userRoles.includes(r)) ||
    requiredArr.some((p) => userPermissions.includes(p));

  if (!hasAccess && options?.throwOnUnauthorized) {
    throw new Error("Unauthorized");
  }

  return hasAccess;
}