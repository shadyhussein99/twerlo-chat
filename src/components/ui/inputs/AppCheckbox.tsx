import React from "react";

interface AppCheckboxProps {
  isChecked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppCheckbox = ({ isChecked, handleChange }: AppCheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
    />
  );
};
