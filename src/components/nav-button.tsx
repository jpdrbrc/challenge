import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import "./nav-button.scss";

interface NavButtonProps {
  to: string;
  icon?: ReactNode;
  children: React.ReactChild;
  className?: string;
}

export const NavButton: React.SFC<NavButtonProps> = props => (
  <Link data-testid="nav-button" className={`nav-button ${props.className || ""}`} to={props.to}>
    {props.icon && (
      <div data-testid="icon" className="icon">
        {props.icon}
      </div>
    )}
    {props.children}
  </Link>
);
