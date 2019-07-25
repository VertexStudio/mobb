import React, { Component } from "react";
import "./Box.css";
import Vector2D from "../models/Vector2D";

interface IProps {
  Mouse: Vector2D;
  Target?: boolean;
}

enum E_ResizerType {
  NONE,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT
}

interface IState {
  Name: string;
  Min: Vector2D;
  Max: Vector2D;
  Width: number;
  Height: number;
  ShiftX: number;
  ShiftY: number;
  IsBoxMouseDown: boolean;
  ActiveResizer: E_ResizerType;
}

class Box extends Component<IProps, IState> {
  static defaultProps: IProps = {
    Mouse: new Vector2D(0, 0),
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
      ShiftX: 0,
      ShiftY: 0,
      IsBoxMouseDown: false,
      ActiveResizer: E_ResizerType.NONE
    };

    this.OnBoxMouseDown = this.OnBoxMouseDown.bind(this);
    this.OnBoxMouseUp = this.OnBoxMouseUp.bind(this);
    this.OnResizerMouseDown = this.OnResizerMouseDown.bind(this);
    this.OnResizerMouseUp = this.OnResizerMouseUp.bind(this);
  }

  componentDidUpdate(prevProps: IProps) {
    const { ActiveResizer } = this.state;
    if (!prevProps.Mouse.IsEqual(this.props.Mouse)) {
      this.OnBoxMouseMove();
    }
  }

  render() {
    const { Name, Width, Height, Min } = this.state;
    const { Target } = this.props;
    return (
      <div
        data-testid="container-box"
        className={`box ${Target ? "target" : ""}`}
        style={{ width: Width, height: Height, left: Min.X, top: Min.Y }}
      >
        <div
          className="draggable-area"
          onMouseDown={this.OnBoxMouseDown}
          onMouseUp={this.OnBoxMouseUp}
        />
        <div className="resizers">
          <div
            className="resizer top-left"
            onMouseDown={this.OnResizerMouseDown(E_ResizerType.TOP_LEFT)}
            onMouseUp={this.OnResizerMouseUp}
          />
          <div
            className="resizer top-right"
            onMouseDown={this.OnResizerMouseDown(E_ResizerType.TOP_RIGHT)}
            onMouseUp={this.OnResizerMouseUp}
          />
          <div
            className="resizer bottom-left"
            onMouseDown={this.OnResizerMouseDown(E_ResizerType.BOTTOM_LEFT)}
            onMouseUp={this.OnResizerMouseUp}
          />
          <div
            className="resizer bottom-right"
            onMouseDown={this.OnResizerMouseDown(E_ResizerType.BOTTOM_RIGHT)}
            onMouseUp={this.OnResizerMouseUp}
          />
        </div>
        <div className="name">{Name}</div>
      </div>
    );
  }

  OnBoxMouseDown() {
    const { Min } = this.state;
    const { Mouse } = this.props;

    const MouseShiftX = Mouse.X - Min.X;
    const MouseShiftY = Mouse.Y - Min.Y;

    this.setState({
      IsBoxMouseDown: true,
      ShiftX: MouseShiftX,
      ShiftY: MouseShiftY
    });
  }

  OnBoxMouseUp() {
    this.setState({
      IsBoxMouseDown: false
    });
  }

  OnBoxMouseMove() {
    const { IsBoxMouseDown, ShiftX, ShiftY } = this.state;
    const { Mouse } = this.props;
    if (IsBoxMouseDown) {
      const MouseX = Mouse.X - ShiftX;
      const MouseY = Mouse.Y - ShiftY;

      this.setState({
        Min: new Vector2D(MouseX, MouseY)
      });
    }
  }

  OnResizerMouseDown(Resizer: E_ResizerType) {
    return () => {
      this.setState({ ActiveResizer: Resizer });
    };
  }

  OnResizerMouseUp() {
    this.setState({ ActiveResizer: E_ResizerType.NONE });
  }

  OnResizerMouseMove(ActiveResizer: E_ResizerType) {
    if (ActiveResizer !== E_ResizerType.NONE) {
      const { Min } = this.state;
      switch (ActiveResizer) {
        case E_ResizerType.BOTTOM_RIGHT:
          const { Mouse } = this.props;
          const MouseX = Mouse.X;

          this.setState({
            Width: MouseX - Min.X
          });
          break;
      }
    }
  }
}

export default Box;
