import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../../hooks/useAuth";
import { schemaLogin } from "../../schemas/schemasForm";
interface Login {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaLogin),
  });

  const { mutate: loginMutation, isPending, isError, error } = useLogin();
  const onSubmit = (data: Login) => {
    loginMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>{error?.message}</p>
      <div>
        <input type='email' placeholder='Email' {...register("email")} />
        <span>{errors.email?.message}</span>
      </div>
      <div>
        <input
          type='password'
          placeholder='Password'
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
      </div>
      <button disabled={!isValid || !isDirty || isPending}>
        {isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
