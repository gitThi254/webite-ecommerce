import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaColor } from "../../schemas/schemasForm";
import { useCreateColor, useUpdateColor } from "../../hooks/useColor";
const ColorForm = ({ Color }: { Color?: Color }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Color>({
    defaultValues: Color
      ? Color
      : {
          title: "",
        },
    resolver: yupResolver(schemaColor),
  });
  const {
    mutate: CreateColorMutation,
    isPending: penC,
    error,
  } = useCreateColor();
  const {
    mutate: updateColorMutation,
    isPending: penU,
    error: errorU,
  } = useUpdateColor();

  const onSubmit = (data: Color) => {
    if (Color) {
      updateColorMutation({ id: data._id, data });
    } else {
      CreateColorMutation(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <span>{errorU?.message}</span>
      <div>
        <input type='text' placeholder='Enter a Color' {...register("title")} />
        <div>{errors?.title?.message}</div>
      </div>
      <button disabled={!isValid || !isDirty || penC || penU}>
        {penC || penU ? "Loading..." : Color ? "Update Color" : "New Color"}
      </button>
    </form>
  );
};

export default ColorForm;
