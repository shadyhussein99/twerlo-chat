import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppForm } from "../../hooks/useAppForm";
import { useAuthStore } from "../../store/useAuthStore";
import { loginSchema } from "./loginSchema";
import { AppTextField, AppButton } from "../../components/ui";
import { ErrorText } from "../../components/shared";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { form, handleSubmit, isSubmitting } = useAppForm({
    validationSchema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      if (data.email === "test@chat.com" && data.password === "123456") {
        login("this-is-access-token");
        navigate("/");
      } else {
        toast.error("Email or Password is incorrect");
      }
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-light">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl text-center font-display text-primary">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <AppTextField
              inputName="email"
              placeholder="Email"
              register={register}
              label="Email"
            />

            {errors?.email?.message && (
              <ErrorText error={errors.email.message} />
            )}
          </div>

          <div className="mb-4">
            <AppTextField
              inputName="password"
              type="password"
              placeholder="password"
              register={register}
              label="Password"
            />

            {errors?.password?.message && (
              <ErrorText error={errors.password.message} />
            )}
          </div>

          <AppButton
            title="Login"
            type="submit"
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
