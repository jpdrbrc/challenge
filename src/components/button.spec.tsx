import React from "react";

import { HashRouter } from "react-router-dom";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { Button, SubmitButton, LinkButton } from "./button";

describe("Buttons", () => {
  afterEach(cleanup);

  test("should render <LinkButton />", () => {
    const text = "Button 123";
    const to = "/path";
    const { getByText } = render(
      <HashRouter>
        <LinkButton to={to}>Button 123</LinkButton>
      </HashRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toHaveAttribute("href", `#${to}`);
  });

  test("should render <Button />", () => {
    const text = "Button 123";
    const { getByTestId } = render(<Button>{text}</Button>);
    expect(getByTestId("button")).toBeInTheDocument();
  });

  test("should render <SubmitButton />", () => {
    const text = "Button 123";
    const { getByTestId } = render(<SubmitButton value={text} />);
    expect(getByTestId("submit-button")).toBeInTheDocument();
    expect(getByTestId("submit-button")).toHaveAttribute("value", text);
  });
});
