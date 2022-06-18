import React from "react";

type ButtonProp = {
  type: "button" | "submit" | "reset";
  child: any;
  className: string;
  onClick?: any
};

export const Button = ({ type, child, className, onClick }: ButtonProp) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {child}
    </button>
  );
};
