import React, { FC } from "react";

type InputProps = {
  name: string;
  type: string;
  child?: string;
  className?: string;
  label: string;
  icon?: JSX.Element;
  onChange?: any;
  placeholder?: string;
  value?: string;
  toggleUpdate?: boolean;
};

export const InputField = ({
  name,
  type,
  child,
  className,
  label,
  icon,
  placeholder,
  onChange,
  value,
  toggleUpdate,
}: InputProps) => {
  return (
    <div className="w-full px-2">
      <label className="py-2 pt-3 flex">{label}</label>
      <div className="bg-white w-full flex justify-between items-center border rounded outline-sky-300">
        {!toggleUpdate ? (
          <input
            type={type}
            onChange={onChange}
            name={name}
            className={className}
            value={child}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            onChange={onChange}
            name={name}
            className={className}
            defaultValue={value}
            placeholder={placeholder}
          />
        )}
        {icon && <span className="pr-2">{icon}</span>}
      </div>
    </div>
  );
};
