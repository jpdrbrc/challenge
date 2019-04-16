import React from "react";

import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { HomeButton } from "./home-button";
import { HashRouter, MemoryRouter } from "react-router-dom";

describe("<HomeButton />", () => {
  afterEach(cleanup);

  test("should render component", () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/home"]}>
        <HomeButton />
      </MemoryRouter>
    );
    expect(queryByTestId("home-button")).toBeInTheDocument();
  });

  test("should not render component", () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeButton />
      </MemoryRouter>
    );
    expect(queryByTestId("home-button")).not.toBeInTheDocument();
  });
});
