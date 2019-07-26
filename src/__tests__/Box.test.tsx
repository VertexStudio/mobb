import React from "react";
import ReactDOM from "react-dom";

import Box from "../components/Box";
import Vector2D from "../models/Vector2D";

it("box renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Box
      Name="A"
      DistanceFromCameraView={50}
      Mouse={Vector2D.ZeroVector}
      OnChange={() => {}}
      InitMin={Vector2D.ZeroVector}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
