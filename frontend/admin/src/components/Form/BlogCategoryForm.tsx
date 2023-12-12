import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  useCreateBlogCategory,
  useUpdateBlogCategory,
} from "../../hooks/useBlogCategory";
import { schemaBlogCategory } from "../../schemas/schemasForm";
const BlogCategoryForm = ({ BlogCategory }: { BlogCategory?: Category }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Category>({
    defaultValues: BlogCategory
      ? BlogCategory
      : {
          title: "",
        },
    resolver: yupResolver(schemaBlogCategory),
  });
  const {
    mutate: BlogCategoryMutation,
    isPending: penC,
    error,
  } = useCreateBlogCategory();
  const {
    mutate: UpdateBlogCategoryMutation,
    isPending: penU,
    error: errorU,
  } = useUpdateBlogCategory();

  const onSubmit = (data: Category) => {
    if (BlogCategory) {
      UpdateBlogCategoryMutation({ id: data._id, data });
    } else {
      BlogCategoryMutation(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <span>{errorU?.message}</span>
      <div>
        <input
          type='text'
          placeholder='Enter a Blog Category'
          {...register("title")}
        />
        <div>{errors?.title?.message}</div>
      </div>
      <button disabled={!isValid || !isDirty || penC || penU}>
        {penC || penU
          ? "Loading..."
          : BlogCategory
          ? "Update Blog Category"
          : "New Blog Category"}
      </button>
    </form>
  );
};

export default BlogCategoryForm;
