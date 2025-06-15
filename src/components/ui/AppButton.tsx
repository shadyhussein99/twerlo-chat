import { Spinner } from "./Spinner";

interface IAppButtonProps {
  title: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}
export const AppButton = ({
  title,
  isSubmitting,
  disabled,
  className,
  type,
  onClick,
}: IAppButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 mt-4 text-white transition duration-200 ease-in-out rounded cursor-pointer bg-primary hover:bg-primary-hover disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed ${className}`}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? <Spinner color="white" size="xs" /> : title}
    </button>
  );
};
