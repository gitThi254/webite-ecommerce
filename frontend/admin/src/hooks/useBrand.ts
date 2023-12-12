import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBrandReq,
  deleteBrandReq,
  getBrandReq,
  getBrandsReq,
  updateBrandReq,
} from "../api/brand.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrandsReq,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBrandReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Brand[]>(["brands"], (old) => {
        old?.push(data);
        return old;
      });
      toast.success("Brand Added Successfullly!");
      navigate("/brand-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useDelBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBrandReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Brand[]>(["brands"], (old) => {
        return old?.filter((brand) => brand._id !== data._id);
      });
      toast.success("Brand Delete Successfullly!");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useBrand = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["brands", id],
    queryFn: () => getBrandReq(id),
    initialData: () =>
      queryClient
        .getQueryData<Brand[]>(["brands"])
        ?.find((brand) => brand._id === id),
  });
};

export const useUpdateBrand = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBrandReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Brand[]>(["brands"], (old) =>
        old?.map((brand) => (brand._id === data._id ? { ...data } : brand))
      );
      queryClient.setQueryData(["brands", data._id], data);
      toast.success("Brand update Successfullly!");

      navigate("/brand-list");
    },
    onError: (error: any) => {
      error.message = error.response.data;
    },
  });
};
