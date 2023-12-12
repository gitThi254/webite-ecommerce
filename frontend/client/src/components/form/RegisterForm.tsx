import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";
import { registerSchema } from "../../schemas/formSchema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const { mutate: loginMutation, isPending, error } = useRegister();
  const onSubmit = (data: Register) => {
    loginMutation(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <div>
        <input type='text' placeholder='Firstname' {...register("firstname")} />
        <div>{errors?.firstname?.message}</div>
      </div>
      <div>
        <input type='text' placeholder='Lastname' {...register("lastname")} />
        <div>{errors?.lastname?.message}</div>
      </div>

      <div>
        <input type='text' placeholder='Email' {...register("email")} />
        <div>{errors?.email?.message}</div>
      </div>
      <div>
        <input type='text' placeholder='mobile' {...register("mobile")} />
        <div>{errors?.mobile?.message}</div>
      </div>
      <div>
        <input
          type='password'
          placeholder='Password'
          {...register("password")}
        />
        <div>{errors?.password?.message}</div>
      </div>
      <button disabled={isPending}>
        {isPending ? "Loading..." : "Register"}{" "}
      </button>
    </form>
  );
};

export default RegisterForm;
