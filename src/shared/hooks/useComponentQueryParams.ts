"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type QueryParamOptions<T> = {
  defaults?: Partial<T>;
  formatKey?: (key: keyof T) => string;
  debounceDelay?: number;
};

export function useComponentQueryParams<T extends Record<string, any>>(
  options: QueryParamOptions<T> = {}
) {
  const {
    defaults = {} as Partial<T>,
    formatKey = (key) => key as string,
    debounceDelay = 300,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState<T>(() => {
    const initial: any = {};
    for (const key in defaults) {
      const formattedKey = formatKey(key);
      const value = searchParams?.get(formattedKey);
      initial[key] =
        value !== null && value !== undefined
          ? parseValue(value, defaults[key])
          : defaults[key];
    }
    return initial;
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced sync of state to URL
  useEffect(() => {
    if (!router || !pathname) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!searchParams) return;

      const params = new URLSearchParams(searchParams.toString());

      for (const key in state) {
        const formattedKey = formatKey(key);
        const value = state[key];
        const defaultValue = defaults[key];

        if (value === undefined || value === null || value === defaultValue) {
          params.delete(formattedKey);
        } else {
          params.set(formattedKey, String(value));
        }
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    }, debounceDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state]);

  return useMemo(() => {
    return {
      queryParams: state,
      setQueryParams: (updates: Partial<T>) => {
        setState((prev) => ({ ...prev, ...updates }));
      },
      resetQueryParams: () => setState((prev) => ({ ...prev, ...defaults })),
    };
  }, [state]);
}

function parseValue<T>(value: string, defaultValue: T): any {
  if (typeof defaultValue === "number") return Number(value);
  if (typeof defaultValue === "boolean") return value === "true";
  return value;
}
