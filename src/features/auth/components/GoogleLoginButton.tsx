"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { showError, showSuccess } from "@/shared/utils/toast";
import { useAuthStore } from "@/store/authStore";

export const GoogleLoginButton = () => {
  const login = useAuthStore((state) => state.login);

  const mutation = useMutation({
    mutationFn: async ({ id_token }: { id_token: string }) => {
      // TEMP placeholder – connect to backend when ready
      console.log("Received Google token:", id_token);
      return { token: "mock-token" };
    },
    onSuccess: ({ token }) => {
      login(token);
      showSuccess("Google login successful");
    },
    onError: () => {
      showError("Google login failed");
    },
  });

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          mutation.mutate({ id_token: credentialResponse.credential });
        }
      }}
      onError={() => showError("Google login was cancelled or failed")}
    />
  );
};