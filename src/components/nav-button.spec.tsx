import React from "react";
import { HashRouter } from "react-router-dom";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { NavButton } from "./nav-button";

describe("<NavButton />", () => {
  afterEach(cleanup);

  test("should render component without icon", () => {
    const text = "Button 123";
    const to = "/path";
    const { getByText, getByTestId, queryByTestId } = render(
      <HashRouter>
        <NavButton to={to}>Button 123</NavButton>
      </HashRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
    expect(getByTestId("nav-button")).toHaveAttribute("href");
    expect(queryByTestId("icon")).not.toBeInTheDocument();
  });

  test("should render component with icon", () => {
    const text = "Button 123";
    const to = "/path";
    const Icon = <svg />;
    const { getByText, getByTestId, queryByTestId } = render(
      <HashRouter>
        <NavButton icon={Icon} to={to}>
          Button 123
        </NavButton>
      </HashRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
    expect(getByTestId("nav-button")).toHaveAttribute("href");
    expect(queryByTestId("icon")).toBeInTheDocument();
  });
});
