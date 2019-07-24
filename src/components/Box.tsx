import React, { Component } from "react";
import "./Box.css";
import Vector2D from "../models/Vector2D";

interface IProps {
  Target?: boolean;
}

interface IState {
  Name: string;
  Min: Vector2D;
  Max: Vector2D;
  Width: number;
  Height: number;
  IsMouseDown: boolean;
  ShiftX: number;
  ShiftY: number;
}

class Box extends Component<IProps, IState> {
  static defaultProps: IProps = {
    Target: false
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      Name: "A",
      Width: 100,
      Height: 100,
      Min: Vector2D.ZeroVector,
      Max: new Vector2D(100, 100),
      IsMouseDown: false,
      ShiftX: 0,
      ShiftY: 0
    };

    this.OnMouseDown = this.OnMouseDown.bind(this);
    this.OnMouseUp = this.OnMouseUp.bind(this);
    this.OnMouseMove = this.OnMouseMove.bind(this);
    this.OnMouseLeave = this.OnMouseLeave.bind(this);
  }

  render() {
    const { Name, Width, Height, Min } = this.state;
    const { Target } = this.props;
    return (
      <div
        data-testid="container-box"
        className={`box ${Target ? "target" : ""}`}
        style={{ width: Width, height: Height, top: Min.Y, left: Min.X }}
        onMouseDown={this.OnMouseDown}
        onMouseUp={this.OnMouseUp}
        onMouseMove={this.OnMouseMove}
      >
        <div className="resizers">
          <div className="resizer top-left" />
          <div className="resizer top-right" />
          <div className="resizer bottom-left" />
          <div className="resizer bottom-right" />
        </div>
        <div className="name">{Name}</div>
        <div
          className="draggable-area"
          onMouseDown={this.OnMouseDown}
          onMouseUp={this.OnMouseUp}
          onMouseMove={this.OnMouseMove}
          onMouseLeave={this.OnMouseLeave}
        />
      </div>
    );
  }

  OnMouseDown(event: React.MouseEvent) {
    const { Min } = this.state;
    const MouseShiftX = event.clientX - Min.X;
    const MouseShiftY = event.clientY - Min.Y;

    this.setState({
      IsMouseDown: true,
      ShiftX: MouseShiftX,
      ShiftY: MouseShiftY
    });
  }

  OnMouseUp() {
    this.setState({
      IsMouseDown: false
    });
  }

  OnMouseLeave() {
    this.setState({
      IsMouseDown: false
    });
  }

  OnMouseMove(event: React.MouseEvent) {
    const { IsMouseDown, ShiftX, ShiftY } = this.state;
    if (IsMouseDown) {
      const MouseX = event.clientX - ShiftX;
      const MouseY = event.clientY - ShiftY;

      this.setState({
        Min: new Vector2D(MouseX, MouseY)
      });
    }
  }
}

export default Box;
