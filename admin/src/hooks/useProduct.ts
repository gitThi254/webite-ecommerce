import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  getProductReq,
  getProducts,
  updateProductReq,
} from "../api/product.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(["products"], (old) => {
        old?.push(data);
        return old;
      });
      toast.success("product create Successfullly!");

      navigate("/product-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useProduct = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductReq(id),
    initialData: () =>
      queryClient
        .getQueryData<Product[]>(["products"])
        ?.find((Product) => Product._id === id),
  });
};

export const useUpdateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(["products"], (old) =>
        old?.map((Product) =>
          Product._id === data._id ? { ...data } : Product
        )
      );
      queryClient.setQueryData(["products", data._id], data);
      toast.success("product update Successfullly!");

      navigate("/product-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};
