import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import {
  createColorReq,
  deleteColorReq,
  getColorReq,
  getColorsReq,
  updateColorReq,
} from "../api/color.api";
import { toast } from "react-toastify";

export const useColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColorsReq,
  });
};

export const useCreateColor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createColorReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Color[]>(["colors"], (old) => {
        old?.push(data);
        return old;
      });
      toast.success("color create Successfullly!");

      navigate("/color-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useDelColor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteColorReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Color[]>(["colors"], (old) => {
        return old?.filter((Color) => Color._id !== data._id);
      });
      toast.success("color delete Successfullly!");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useColor = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Colors", id],
    queryFn: () => getColorReq(id),
    initialData: () =>
      queryClient
        .getQueryData<Color[]>(["colors"])
        ?.find((Color) => Color._id === id),
  });
};

export const useUpdateColor = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateColorReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Color[]>(["colors"], (old) =>
        old?.map((Color) => (Color._id === data._id ? { ...data } : Color))
      );
      queryClient.setQueryData(["Colors", data._id], data);
      navigate("/color-list");
      toast.success("color update Successfullly!");
    },
    onError: (error: any) => {
      error.message = error.response.data;
    },
  });
};
