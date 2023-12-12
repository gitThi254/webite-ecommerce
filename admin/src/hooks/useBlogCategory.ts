import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import {
  createBlogCategoryReq,
  deleteBlogCategoryReq,
  getBlogCategoriesReq,
  getBlogCategoryReq,
  updateBlogCategoryReq,
} from "../api/blogCategory.api";
import { toast } from "react-toastify";

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: getBlogCategoriesReq,
  });
};

export const useCreateBlogCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBlogCategoryReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>(["blog-categories"], (old) => {
        old?.push(data);
        return old;
      });
      toast.success("Blog category delete Successfullly!");

      navigate("/blog-category-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useDelBlogCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogCategoryReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>(["blog-categories"], (old) => {
        return old?.filter((category) => category._id !== data._id);
      });
      toast.success("Blog delete delete Successfullly!");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useBlogCategory = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getBlogCategoryReq(id),
    initialData: () =>
      queryClient
        .getQueryData<Category[]>(["blog-categories"])
        ?.find((category) => category._id === id),
  });
};

export const useUpdateBlogCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlogCategoryReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>(["blog-categories"], (old) =>
        old?.map((category) =>
          category._id === data._id ? { ...data } : category
        )
      );
      queryClient.setQueryData(["categories", data._id], data);
      toast.success("Blog category update Successfullly!");

      navigate("/blog-category-list");
    },
    onError: (error: any) => {
      error.message = error.response.data;
    },
  });
};
