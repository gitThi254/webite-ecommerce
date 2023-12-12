import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaCategory } from "../../schemas/schemasForm";
import { useCreateCategory, useUpdateCategory } from "../../hooks/useCategory";
const CategoryForm = ({ Category }: { Category?: Category }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Category>({
    defaultValues: Category
      ? Category
      : {
          title: "",
        },
    resolver: yupResolver(schemaCategory),
  });
  const {
    mutate: CreateCategoryMutation,
    isPending: penC,
    error,
  } = useCreateCategory();
  const {
    mutate: updateCategoryMutation,
    isPending: penU,
    error: errorU,
  } = useUpdateCategory();

  const onSubmit = (data: Category) => {
    if (Category) {
      updateCategoryMutation({ id: data._id, data });
    } else {
      CreateCategoryMutation(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <span>{errorU?.message}</span>
      <div>
        <input
          type='text'
          placeholder='Enter a Category'
          {...register("title")}
        />
        <div>{errors?.title?.message}</div>
      </div>
      <button disabled={!isValid || !isDirty || penC || penU}>
        {penC || penU
          ? "Loading..."
          : Category
          ? "Update Category"
          : "New Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
