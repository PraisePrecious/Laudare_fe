// // src/hooks/useAuth.ts
// 'use client'

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { authService } from '@/services/auth';


// export const useRegister = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

 
// };

// export const useLogin = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: authService.login,
//     onSuccess: (data) => {
//       setAuthTokens({
//         accessToken: data.accessToken,
//         refreshToken: data.refreshToken ?? '',
//       });

//       queryClient.setQueryData(['auth'], data.user);

//       if (data.user.__t === 'Admin') {
//         router.push(`/dashboard`);
//       } else if (data.user.__t === 'User') {
//         router.push(`/member/${data.user._id}`);
//       }else {
//         router.push('/unauthorized');
//       }
      
//       if (data.user.status === 'Pending') {
//         router.push(`/register/pending-approval`);
//       }
//     },
//     onError: (error: Error) => {
//       if (error.message.includes('pending approval')) {
//         router.push('/');
//       }
//     },
//   });
// };

// // export const useAdminLogin = () => {
// //   const router = useRouter();
// //   const queryClient = useQueryClient();

// //   return useMutation({
// //     mutationFn: authService.AdminLogin,
// //     onSuccess: (data) => {
// //       setAdminAuthTokens({
// //         accessToken: data.accessToken,
// //         refreshToken: data.refreshToken ?? '',
// //       });

// //       queryClient.setQueryData(['auth'], data.user);

// //       if (data.user.__t === 'Admin') {
// //         router.push(`/dashboard`);
// //       } else {
// //         router.push(`/unauthorized`);
// //       }
// //     },
// //     onError: (error: Error) => {
// //       if (error.message.includes('pending approval')) {
// //         router.push('/');
// //       }
// //     },
// //   });
// // };

// export const useLogout = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   return () => {
//     clearAuthTokens();
//     queryClient.removeQueries({ queryKey: ['auth'] });
//     router.push('/register');
//   };
// };











import type {SignUpInputs, LoginInputs} from "@/types/auth"

import axios from "axios";
import { useState } from "react";

export const api = axios.create({
    baseURL: "https://laudare-be.onrender.com/",
    headers: {
        "Content-Type": "application/json",
    }
})


export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: SignUpInputs) => {
        setLoading(true);
        setError(null);

        try{
            const payload = {
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                email: data.email.toLowerCase(),
                password: data.password,
                phone: data.phone,
                role: "User",
            };

            const response = await api.post("/register", payload);
            return response.data
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginInputs) => {
        setLoading(true);
        setError(null);

        try {
            const credentials = {
                email: data.email.toLowerCase(),
                password: data.password,
            };

            const response = await api.post("/login", credentials);
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed")
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        login,
        loading,
        error,
    }

}