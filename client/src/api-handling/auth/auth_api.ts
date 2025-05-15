"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, logoutUser, User } from "./auth_api_fetcher";

import { loginUser, registerUser } from "./auth_api_fetcher";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useGetProfile = () => {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["profile"] });
    },
  });
};

export const useLoginMutation = (
  setError: (msg: string) => void,
  router: AppRouterInstance
) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.replace("/dashboard"); 
    },
    onError: (err: any) => {
      setError(err.message || "Something went wrong");
    },
  });
};
export const useRegisterMutation = (
  setError: (msg: string) => void,
  setIsLogin: (val: boolean) => void
) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Signup successful! Please login.");
      setIsLogin(true);
    },
    onError: (err) => {
      setError(err.message);
    },
  });
};
