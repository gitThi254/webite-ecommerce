import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogReq,
  deleteBlogReq,
  getBlogReq,
  getBlogsReq,
  updateBlogReq,
} from "../api/blog.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogsReq,
  });

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBlogReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Blog[]>(["blogs"], (old) => {
        old?.push(data);
        return old;
      });
      queryClient.setQueryData(["images"], null);
      toast.success("Blog create Successfullly!");

      navigate("/blog-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useDelBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Blog[]>(["blogs"], (old) => {
        return old?.filter((Blog) => Blog._id !== data._id);
      });
      toast.success("Blog delete Successfullly!");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useBlog = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getBlogReq(id),
    initialData: () =>
      queryClient
        .getQueryData<Blog[]>(["blogs"])
        ?.find((Blog) => Blog._id === id),
  });
};

export const useUpdateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlogReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Blog[]>(["blogs"], (old) =>
        old?.map((Blog) => (Blog._id === data._id ? { ...data } : Blog))
      );
      queryClient.setQueryData(["blogs", data._id], data);
      toast.success("Blog update Successfullly!");

      navigate("/blog-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};
