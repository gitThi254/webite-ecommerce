import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { schemaProduct } from "../../schemas/schemasForm";
import { useCreateProduct, useUpdateProduct } from "../../hooks/useProduct";
import { useBrands } from "../../hooks/useBrand";
import { useCategories } from "../../hooks/useCategory";
import "react-widgets/styles.css";
import { Multiselect } from "react-widgets";
import { useColors } from "../../hooks/useColor";
import Dropzone from "react-dropzone";
import { useDeleteImage, useUploadImage } from "../../hooks/useUpload";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const ProductForm = ({ Product }: { Product?: Product }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<Product>({
    defaultValues: Product
      ? Product
      : {
          title: "",
          description: "",
          price: undefined,
          brand: "",
          category: "",
          color: undefined,
          quantity: undefined,
        },
    resolver: yupResolver(schemaProduct),
  });
  const {
    mutate: CreateProductMutation,
    isPending: penC,
    error,
  } = useCreateProduct();
  const {
    mutate: updateProductMutation,
    isPending: penU,
    error: errorU,
  } = useUpdateProduct();

  const onSubmit = (data: Product) => {
    CreateProductMutation({
      ...data,
      color: data.color.map((el: any) => el.id),
    });

    if (Product) {
      updateProductMutation({ id: data._id, data });
    } else {
      CreateProductMutation(data);
    }
  };
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data: colors, isPending: penColor } = useColors();

  const colors_option: any = [];
  colors?.forEach((i) => {
    colors_option?.push({
      _id: i._id,
      title: i.title,
    });
  });

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
      {/* <span>{errorU?.message}</span> */}
      <div>
        <input
          type='text'
          placeholder='Enter a Product'
          {...register("title")}
        />
        <div>{errors?.title?.message}</div>
      </div>
      <div>
        <textarea
          rows={3}
          placeholder='Enter a Description'
          {...register("description")}
        />
        <div>{errors?.description?.message}</div>
      </div>
      <div>
        <input
          type='number'
          placeholder='Enter a Price'
          {...register("price")}
        />
        <div>{errors?.price?.message}</div>
      </div>
      <div>
        <select defaultValue={0} {...register("brand")}>
          <option value=''>--select brand--</option>
          {brands?.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.title}
            </option>
          ))}
        </select>
      </div>
      <div className='my-3'>
        <Controller
          name='color'
          control={control}
          render={({ field }) => (
            <Multiselect
              {...field}
              dataKey='_id'
              textField='title'
              data={colors_option}
            />
          )}
        />
      </div>
      <div>
        <select defaultValue={0} {...register("category")}>
          <option value=''>--select category--</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type='number'
          placeholder='Enter a Quantity'
          {...register("quantity")}
        />
        <div>{errors?.price?.message}</div>
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
        {penC ? "Loading..." : Product ? "Update Product" : "New Product"}
      </button>
    </form>
  );
};

export default ProductForm;
