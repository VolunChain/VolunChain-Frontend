"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center" />
        {children}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
