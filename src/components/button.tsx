import React, { ButtonHTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";
import "./button.scss";

export const Button: React.SFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button data-testid="button" className={`button ${className}`} {...props} />
);

export const SubmitButton: React.SFC<ButtonHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input data-testid="submit-button" type="submit" className={`button ${className}`} {...props} />
);

export const LinkButton: React.SFC<LinkProps> = ({ className, ...props }) => (
  <Link data-testid="link-button" className={`button ${className}`} {...props} />
);
