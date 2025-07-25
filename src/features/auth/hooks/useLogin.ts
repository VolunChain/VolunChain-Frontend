import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Auth, AuthCredentials } from "../types";
import { useAuthStore } from "../../../shared/utils/zustand/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const { data } = await axios.post<Auth>("/api/auth/login", credentials);
      return data;
    },
    onSuccess: ({ user, token }) => {
      authStore.login(user, token);
      router.push("/wallet-connect");
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });

  return mutation;
};
