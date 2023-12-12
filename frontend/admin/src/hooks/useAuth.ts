import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  deleteCustomerReq,
  getAllCustomer,
  getCustomer,
  loginReq,
  logoutReq,
  registerReq,
  updateCustomerReq,
  verifyReq,
} from "../api/auth.api";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginReq,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("auth", JSON.stringify(data));
      }
      queryClient.setQueryData(["auth"], data);
      navigate("/");
    },
    onError(error: any) {
      error.message = error.response?.data;
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: logoutReq,
    onSuccess: () => {
      localStorage.removeItem("auth");
      queryclient.removeQueries({ queryKey: ["auth"], exact: true });
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useVerify = () => {
  const queryClient = useQueryClient();
  const authDefault = JSON.parse(localStorage.getItem("auth")) ?? null;
  const user = useQuery({
    queryKey: ["auth"],
    queryFn: verifyReq,
    refetchIntervalInBackground: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    initialData: authDefault,
  });
  if (user.error && !user.isLoading) {
    queryClient.setQueryData(["auth"], null);
    localStorage.removeItem("auth");
  }
  if (user.data) {
    localStorage.setItem("auth", JSON.stringify(user.data));
  }

  return user ?? null;
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomer,
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerReq,
    onSuccess: (data) => {
      navigate("/customer-list");
    },
    onError: (error: any) => {
      console.log(error);
      error.message = error.response?.data;
    },
  });
};

export const useCustomer = (id: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Customers", id],
    queryFn: () => getCustomer(id),
    initialData: () => {
      return queryClient
        .getQueryData<Customer[]>(["Customers"])
        ?.find((customer) => customer._id === id);
    },
  });
};

export const useUpdateCustomer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomerReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Customer[]>(["customers"], (old) =>
        old?.map((old) => (old._id === data._id ? { ...data } : old))
      );
      queryClient.setQueryData<Customer>(["customer", data._id], data);
      navigate("/customer-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useDelcustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomerReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Customer[]>(["customers"], (old) => {
        old = old?.filter((customer) => customer._id !== data._id);
        return old;
      });
    },
  });
};
