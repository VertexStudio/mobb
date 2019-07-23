import React from "react";
import "./App.css";

import Box from "./components/Box";
import Vector2D from "./models/Vector2D";

const App: React.FC = () => {
  return (
    <div className="App">
      <Box Name="A" Min={new Vector2D()} Max={new Vector2D()} />
    </div>
  );
};

export default App;
