import React, { Component } from "react";
import Box from "./Box";
import Vector2D from "../models/Vector2D";
import Box2D from "../models/Box2D";

interface IState {
  Mouse: Vector2D;
  TruncationThreshold: number;
  OcclusionThreshold: number;
  Boxes: {
    [name: string]: Box2D;
  };
}

class Viewport extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      Mouse: Vector2D.ZeroVector,
      TruncationThreshold: 0.15,
      OcclusionThreshold: 0.95,
      Boxes: {}
    };

    this.OnMouseMove = this.OnMouseMove.bind(this);
    this.OnBoxChange = this.OnBoxChange.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener("mousemove", this.OnMouseMove);
  }

  componentWillUnmount() {
    window.document.removeEventListener("mousemove", this.OnMouseMove);
  }

  render() {
    const { Mouse, TruncationThreshold, OcclusionThreshold } = this.state;
    const A_InitMin = new Vector2D(200, 10);
    const B_InitMin = new Vector2D(200, 130);
    return (
      <div style={{ position: "absolute", width: "100vw", height: "100vh" }}>
        <div style={{ position: "absolute", marginLeft: "4px", width: "auto" }}>
          <span style={{ fontSize: "0.5em", fontWeight: "bold" }}>
            Thresholds
          </span>
          <div style={{ fontSize: "0.4em" }}>
            Truncation: <strong>{TruncationThreshold}</strong>
            <br />
            Occlusion: <strong>{OcclusionThreshold}</strong>
          </div>
        </div>
        <Box
          Name="A"
          Mouse={Mouse}
          DistanceFromCameraView={100}
          OnChange={this.OnBoxChange}
          InitMin={A_InitMin}
        />
        <Box
          Name="B"
          Mouse={Mouse}
          DistanceFromCameraView={10}
          OnChange={this.OnBoxChange}
          InitMin={B_InitMin}
        />
      </div>
    );
  }

  OnMouseMove(event: MouseEvent) {
    this.setState({
      Mouse: new Vector2D(event.clientX, event.clientY)
    });
  }

  OnBoxChange(Box: Box2D) {
    this.setState(prevState => ({
      ...prevState,
      Boxes: {
        ...prevState.Boxes,
        [Box.Name]: Box
      }
    }));
  }
}

export default Viewport;
