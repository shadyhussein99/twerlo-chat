interface ISpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "accent" | "muted" | "white";
}

const sizeClasses = {
  xs: "h-4 w-4 border-2",
  sm: "h-6 w-6 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-10 w-10 border-[3px]",
  xl: "h-12 w-12 border-4",
};

export const Spinner = ({ size = "md", color = "primary" }: ISpinnerProps) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]} border-${color}`}
      role="status"
    />
  );
};
