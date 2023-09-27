"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  fullWidth?: boolean;
}

const Button = ({
  label,
  onClick,
  disabled,
  small,
  outline,
  icon: Icon,
  fullWidth,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
                relative 
                disabled:opacity-70 
                disabled:cursor-not-allowed 
                rounded-lg hover:opacity-30 
                transition
                ${fullWidth ? "w-full" : "px-8"}
                ${
                  outline
                    ? " bg-white"
                    : "bg-gradient-to-r from-rose-500 to-purple-500"
                }
                ${outline ? " border-black" : " "}
                ${outline ? " text-black" : "text-white"}
                ${small ? " py-1" : "py-3"}
                ${small ? " text-sm" : "text-md"}
                ${small ? " font-light" : "font-semibold"}
                ${small ? " border-[1px]" : "border-2"}
            `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
