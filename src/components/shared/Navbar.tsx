import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const Navbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleAuthentication = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="w-full h-16 p-4 text-white bg-primary">
      <div className="container flex justify-end mx-auto">
        <button
          onClick={handleAuthentication}
          className="px-4 py-2 text-sm font-medium transition duration-200 bg-white rounded cursor-pointer text-primary hover:bg-primary-tint"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};
