import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImg, uploadImg } from "../api/upload.api";
import { toast } from "react-toastify";

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImg,
    onSuccess: (data) => {
      queryClient.setQueryData(["images"], data);
      toast.success("upload image Successfullly!");
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteImg,
    onSuccess: (id) => {
      queryClient.setQueryData<Image[]>(["images"], (old) =>
        old?.filter((image) => image.public_id !== id)
      );
      toast.success("delete image Successfullly!");
    },
  });
};
