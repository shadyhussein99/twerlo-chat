import type { InputHTMLAttributes, Ref } from "react";
import type { UseFormRegister, Path } from "react-hook-form";

interface IAppInputProps<
  T extends Record<string, string> = Record<string, string>
> extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<T>;
  label?: string;
  inputName?: Path<T>;
  className?: string;
  type?: "text" | "password" | "email" | "number";
  ref?: Ref<HTMLInputElement> | undefined;
}

export const AppTextField = <T extends Record<string, string>>({
  register,
  placeholder,
  label,
  inputName,
  className,
  type,
  ref,
  ...rest
}: IAppInputProps<T>) => {
  return (
    <>
      {label && (
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor={inputName}
        >
          {label}
        </label>
      )}

      <input
        {...(register && inputName ? register(inputName) : {})}
        id={inputName}
        type={type}
        className={`w-full px-3 py-2  text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    </>
  );
};
