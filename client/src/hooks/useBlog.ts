import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dislikesReq,
  getBlogReq,
  getBlogsReq,
  likesReq,
} from "../api/blog.api";

export const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogsReq,
  });

export const useLikes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likesReq,
    onSuccess: (data) => {
      queryClient.setQueryData(["blogs"], (old: any) => {
        old = old.map((blog: any) =>
          blog._id === data._id ? { ...data } : blog
        );
        return old;
      });
    },
  });
};

export const useDisLikes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dislikesReq,
    onSuccess: (data) => {
      queryClient.setQueryData(["blogs"], (old: any) => {
        old = old.map((blog: any) =>
          blog._id === data._id ? { ...data } : blog
        );
        return old;
      });
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
        .getQueryData<any>(["blogs"])
        ?.find((blog: any) => blog._id === id),
  });
};
