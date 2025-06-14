import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppForm } from "../../hooks/useAppForm";
import { useAuthStore } from "../../store/useAuthStore";
import { loginSchema } from "./loginSchema";
import { Spinner } from "../../components/ui/Spinner";

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
        login();
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
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />

            {errors.password && (
              <p className="mt-1 text-xs text-danger">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white transition duration-200 ease-in-out rounded cursor-pointer bg-primary hover:bg-primary-hover "
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner color="white" size="xs" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
