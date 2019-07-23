import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";

import Box from "../components/Box";
import Vector2D from "../models/Vector2D";

it("box renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Box Name="A" Min={new Vector2D()} Max={new Vector2D()} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("rendering invalid box", () => {
  const { getByText, queryByText, rerender, debug } = render(
    <Box Name="A" Min={new Vector2D()} Max={new Vector2D()} />
  );

  expect(getByText("Invalid!")).toBeInTheDocument();

  rerender(<Box Name="A" Min={new Vector2D()} Max={new Vector2D(10, 10)} />);

  expect(queryByText("Invalid!")).toBeNull();

  rerender(<Box Name="A" Min={new Vector2D(10, 15)} Max={new Vector2D()} />);
  expect(getByText("Invalid!")).toBeInTheDocument();
});
