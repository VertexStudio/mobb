import React, { Component } from "react";
import Box from "./Box";
import Vector2D from "../models/Vector2D";

interface IState {
  Mouse: Vector2D;
}

class Viewport extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      Mouse: new Vector2D(0, 0)
    };

    this.OnMouseMove = this.OnMouseMove.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener("mousemove", this.OnMouseMove);
  }

  componentWillUnmount() {
    window.document.removeEventListener("mousemove", this.OnMouseMove);
  }

  render() {
    const { Mouse } = this.state;
    return (
      <div style={{ position: "absolute", width: "100vw", height: "100vh" }}>
        <Box Target Mouse={Mouse} />
        <Box Target Mouse={Mouse} />
      </div>
    );
  }

  OnMouseMove(event: MouseEvent) {
    this.setState({
      Mouse: new Vector2D(event.clientX, event.clientY)
    });
  }
}

export default Viewport;
