import React from "react";

type ButtonProp = {
  type: "button" | "submit" | "reset";
  child: any;
  className: string;
  onClick?: any
  toggleUpdate?: boolean
};

export const Button = ({ type, child, toggleUpdate, className, onClick }: ButtonProp) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {toggleUpdate ? "Edit" : child}
    </button>
  );
};
