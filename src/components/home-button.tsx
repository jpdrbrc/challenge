import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "./home-button.scss";

export const HomeButtonComponent: React.SFC<RouteComponentProps> = ({ location }) => {
  const isHome = location.pathname === "/";
  if (isHome) {
    return null;
  }
  return (
    <div className="home-link-container">
      <Link data-testid="home-button" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export const HomeButton = withRouter(HomeButtonComponent);
