import React from "react";

import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { Loading } from "./loading";

describe("<Loading />", () => {
  afterEach(cleanup);

  test("should render component without placeholder", () => {
    const { queryByTestId } = render(<Loading />);
    expect(queryByTestId("spinner")).toBeInTheDocument();
  });
});
