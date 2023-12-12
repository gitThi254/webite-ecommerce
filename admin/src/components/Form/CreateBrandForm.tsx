import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaBrand } from "../../schemas/schemasForm";
import { useCreateBrand, useUpdateBrand } from "../../hooks/useBrand";
import { useLocation } from "react-router-dom";
const CreateBrandForm = ({ brand }: { brand?: Brand }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Brand>({
    defaultValues: brand
      ? brand
      : {
          title: "",
        },
    resolver: yupResolver(schemaBrand),
  });
  const {
    mutate: CreateBrandMutation,
    isPending: penC,
    error,
  } = useCreateBrand();
  const {
    mutate: updateBrandMutation,
    isPending: penU,
    error: errorU,
  } = useUpdateBrand();

  const onSubmit = (data: Brand) => {
    if (brand) {
      updateBrandMutation({ id: data._id, data });
    } else {
      CreateBrandMutation(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <span>{errorU?.message}</span>
      <div>
        <input type='text' placeholder='Enter a brand' {...register("title")} />
        <div>{errors?.title?.message}</div>
      </div>
      <button disabled={!isValid || !isDirty || penC || penU}>
        {penC || penU ? "Loading..." : brand ? "Update brand" : "New brand"}
      </button>
    </form>
  );
};

export default CreateBrandForm;
