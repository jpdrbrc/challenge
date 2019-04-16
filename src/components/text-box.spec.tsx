import React from "react";

import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { TextBox } from "./text-box";

describe("<TextBox />", () => {
  afterEach(cleanup);

  test("should render component without placeholder", () => {
    const { queryByTestId } = render(<TextBox />);
    expect(queryByTestId("text-box-input")).toBeInTheDocument();
    expect(queryByTestId("text-box-placeholder")).not.toBeInTheDocument();
  });

  test("should render component with placeholder", () => {
    const placeholder = "test 123";
    const { queryByTestId } = render(<TextBox placeholder={placeholder} />);
    expect(queryByTestId("text-box-input")).toBeInTheDocument();
    expect(queryByTestId("text-box-placeholder")).toBeInTheDocument();
  });
});
