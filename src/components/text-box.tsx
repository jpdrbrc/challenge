import React, { InputHTMLAttributes } from "react";
import "./text-box.scss";

const TextBoxComponent: React.SFC<InputHTMLAttributes<HTMLInputElement>> = ({ placeholder, ...props }, ref) => (
  <div className="text-box" data-testid="text-box">
    {placeholder && (
      <label data-testid="text-box-placeholder" htmlFor={props.id}>
        {placeholder}
      </label>
    )}
    <input ref={ref} {...props} data-testid="text-box-input" />
  </div>
);

export const TextBox = React.forwardRef(TextBoxComponent);
