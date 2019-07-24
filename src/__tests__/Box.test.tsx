import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";

import Box from "../components/Box";

it("box renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Box />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("box renders target/non-target bg color", () => {
  const { getByTestId, rerender } = render(<Box />);
  expect(getByTestId("container-box")).not.toHaveClass("target");

  rerender(<Box Target />);
  expect(getByTestId("container-box")).toHaveClass("target");
});
