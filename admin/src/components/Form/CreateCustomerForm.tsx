import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaCustomer, schemaLogin } from "../../schemas/schemasForm";
import { useRegister, useUpdateCustomer } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
const CreateCustomerForm = ({ customer }: { customer?: Customer }) => {
  const pathname = location.pathname.split("/")[2];
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<newCustomer>({
    defaultValues: pathname
      ? customer
      : {
          firstname: "",
          lastname: "",
          email: "",
          mobile: "",
          role: "",
          password: "",
        },
    resolver: yupResolver(schemaCustomer),
  });

  const {
    mutate: registerMutation,
    isPending: penRi,
    error: errorRi,
  } = useRegister();
  const {
    mutate: updateMutation,
    isPending: penUp,
    error: errorUp,
  } = useUpdateCustomer();
  const onSubmit = (data: newCustomer) => {
    if (pathname) {
      updateMutation({ id: pathname, data });
    } else {
      registerMutation(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[300px]'>
      <Link to='/customer-list'>go to list Customer</Link>

      <div>{errorRi?.message}</div>
      <div>{errorUp?.message}</div>

      <div>
        <input type='text' placeholder='Firstname' {...register("firstname")} />
        <span>{errors.firstname?.message}</span>
      </div>
      <div>
        <input type='text' placeholder='Lastname' {...register("lastname")} />
        <span>{errors.lastname?.message}</span>
      </div>
      <div>
        <input type='email' placeholder='Email' {...register("email")} />
        <span>{errors.email?.message}</span>
      </div>
      <div>
        <input type='text' placeholder='Mobile' {...register("mobile")} />
        <span>{errors.mobile?.message}</span>
      </div>
      <div>
        <select {...register("role")}>
          <option value='' disabled>
            --select role--
          </option>
          <option value='user'>user</option>
          <option value='admin'>admin</option>
        </select>
      </div>

      <div>
        <input
          type='password'
          placeholder='password'
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
      </div>
      <button disabled={penUp}>
        {penRi || penUp ? "Loading..." : pathname ? "update User" : "new User"}
      </button>
    </form>
  );
};

export default CreateCustomerForm;
