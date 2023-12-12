import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import {
  createCategoryReq,
  deleteCategoryReq,
  getCategoriesReq,
  getCategoryReq,
  updateCategoryReq,
} from "../api/category.api";
import { toast } from "react-toastify";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesReq,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createCategoryReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>(["categories"], (old) => {
        old?.push(data);
        return old;
      });
      toast.success("category create Successfullly!");

      navigate("/category-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useDelCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>(["categories"], (old) => {
        return old?.filter((category) => category._id !== data._id);
      });
      toast.success("category delete Successfullly!");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useCategory = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryReq(id),
    initialData: () =>
      queryClient
        .getQueryData<Category[]>(["categories"])
        ?.find((category) => category._id === id),
  });
};

export const useUpdateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>(["categories"], (old) =>
        old?.map((category) =>
          category._id === data._id ? { ...data } : category
        )
      );
      queryClient.setQueryData(["categories", data._id], data);
      toast.success("category update Successfullly!");

      navigate("/category-list");
    },
    onError: (error: any) => {
      error.message = error.response.data;
    },
  });
};
