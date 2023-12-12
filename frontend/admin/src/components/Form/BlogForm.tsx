import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { schemaBlog } from "../../schemas/schemasForm";
import { useBlogCategories } from "../../hooks/useBlogCategory";
import { useCreateBlog, useUpdateBlog } from "../../hooks/useBlog";
import Dropzone from "react-dropzone";
import { useDeleteImage, useUploadImage } from "../../hooks/useUpload";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const BlogForm = ({ Blog }: { Blog?: Blog }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<Blog>({
    defaultValues: Blog
      ? Blog
      : {
          title: "",
          description: "",
          category: "",
          images: [],
        },
    resolver: yupResolver(schemaBlog),
  });

  const {
    mutate: createBlogMutation,
    isPending: penC,
    error,
  } = useCreateBlog();
  const {
    mutate: updateBlogMutation,
    isPending: penU,
    error: errorU,
  } = useUpdateBlog();

  const { data: categories } = useBlogCategories();

  const onSubmit = (data: Blog) => {
    if (Blog) {
      updateBlogMutation({ id: data._id, data });
    } else {
      createBlogMutation(data);
    }
  };
  const { mutate: uploadMutation, isPending } = useUploadImage();
  const { data: images } = useQuery<Image[]>({ queryKey: ["images"] });
  const { mutate: deleteImageMutation, isPending: penD } = useDeleteImage();
  useEffect(() => {
    if (images) {
      setValue("images", images);
    }
  }, [images]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <span>{errorU?.message}</span>
      <div>
        <input type='text' placeholder='Enter a title' {...register("title")} />
        <div>{errors?.title?.message}</div>
      </div>
      <div>
        <textarea
          rows={3}
          placeholder='Enter a description'
          {...register("description")}
        />
        <div>{errors?.description?.message}</div>
      </div>
      <div>
        <select defaultValue={0} {...register("category")}>
          <option value='' disabled={true}>
            --select option--
          </option>
          {categories?.map((category) => (
            <option key={category._id}>{category.title}</option>
          ))}
        </select>
      </div>
      <div className='bg-white border-1 p-5 text-center'>
        <Dropzone onDrop={(acceptedFiles) => uploadMutation(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  {isPending
                    ? "loading..."
                    : "Drag 'n' drop some files here, or click to select files"}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className='showimages d-flex my-4 flex-wrap gap-3'>
        {images?.map((i, j) => (
          <div key={j} className='position-relative'>
            <button
              type='button'
              className='btn-close position-absolute'
              style={{ top: "5px", right: "5px" }}
              disabled={penD}
              onClick={() => deleteImageMutation(i.public_id)}
            >
              {penD ? "loading" : "delete"}
            </button>
            <img src={i.url} width={200} height={200} alt='' />
          </div>
        ))}
      </div>
      <button disabled={!isValid || penC || penU}>
        {penC || penU ? "Loading..." : Blog ? "Update Blog" : "New Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
