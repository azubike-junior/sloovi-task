import React from "react";
import { InputProps, ItemProp, SelectProps } from "../../interfaces";

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

export const SelectField = ({
  name,
  child,
  className,
  label,
  onChange,
  value,
  toggleUpdate,
  options,
  user_id,
}: SelectProps) => {
  return (
    <div className="w-full px-2">
      <label className="py-2 pt-3 flex">{label}</label>
      <div className="bg-white w-full flex justify-between items-center border rounded outline-sky-300">
        {!toggleUpdate ? (
          <select
            name={name}
            onChange={onChange}
            className={className}
            value={child}
          >
            <option value="">---</option>
            {options?.map((item: ItemProp) => (
              <option value={item?.id} key={item?.id}>
                {item.first}
              </option>
            ))}
          </select>
        ) : (
          <select
            name={name}
            onChange={onChange}
            className={className}
            defaultValue={value}
          >
            <option value={user_id}>{value}</option>
            {options?.map((item: ItemProp) => (
              <option key={item?.id} value={item?.id}>
                {item.first}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};
