import React, { Component } from "react";
import "./Box.css";

import Vector2D from "../models/Vector2D";
import Box2D from "../models/Box2D";

interface IProps {
  Name: string;
  Mouse: Vector2D;
  DistanceFromCameraView: number;
  Target?: boolean;
  OnChange: (Box: Box2D) => void;
  InitMin: Vector2D;
}

enum E_ResizerType {
  NONE,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT
}

interface IState {
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
  constructor(props: IProps) {
    super(props);
    this.state = {
      Width: 100,
      Height: 100,
      Min: props.InitMin,
      Max: new Vector2D(props.InitMin.X + 100, props.InitMin.Y + 100),
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
    const { ActiveResizer, IsBoxMouseDown } = this.state;
    if (!prevProps.Mouse.IsEqual(this.props.Mouse)) {
      if (IsBoxMouseDown) {
        this.OnBoxMouseMove();
      }
      this.OnResizerMouseMove(ActiveResizer);

      const { Min, Max } = this.state;
      const { OnChange, DistanceFromCameraView, Name } = this.props;
      OnChange(new Box2D(Name, Min, Max, DistanceFromCameraView));
    }
  }

  render() {
    const { Width, Height, Min } = this.state;
    const { Name, Target, DistanceFromCameraView } = this.props;
    return (
      <div style={{ position: "absolute", width: "100vw", height: "100vh" }}>
        <div
          data-testid="container-box"
          className={`box ${Target ? "target" : ""}`}
          style={{ width: Width, height: Height, left: Min.X, top: Min.Y }}
        >
          <div
            className="draggable-area"
            style={{ zIndex: DistanceFromCameraView }}
            onMouseDown={this.OnBoxMouseDown}
            onMouseUp={this.OnBoxMouseUp}
          />
          <div className="resizers">
            <div
              style={{ zIndex: DistanceFromCameraView! + 1 }}
              className="resizer top-left"
              onMouseDown={this.OnResizerMouseDown(E_ResizerType.TOP_LEFT)}
              onMouseUp={this.OnResizerMouseUp}
            />
            <div
              style={{ zIndex: DistanceFromCameraView! + 1 }}
              className="resizer top-right"
              onMouseDown={this.OnResizerMouseDown(E_ResizerType.TOP_RIGHT)}
              onMouseUp={this.OnResizerMouseUp}
            />
            <div
              style={{ zIndex: DistanceFromCameraView! + 1 }}
              className="resizer bottom-left"
              onMouseDown={this.OnResizerMouseDown(E_ResizerType.BOTTOM_LEFT)}
              onMouseUp={this.OnResizerMouseUp}
            />
            <div
              style={{ zIndex: DistanceFromCameraView! + 1 }}
              className="resizer bottom-right"
              onMouseDown={this.OnResizerMouseDown(E_ResizerType.BOTTOM_RIGHT)}
              onMouseUp={this.OnResizerMouseUp}
            />
          </div>
          <div className="name">{Name}</div>
        </div>
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
    const { IsBoxMouseDown, ShiftX, ShiftY, Width, Height } = this.state;
    const { Mouse } = this.props;
    if (IsBoxMouseDown) {
      const MouseX = Mouse.X - ShiftX;
      const MouseY = Mouse.Y - ShiftY;

      this.setState({
        Min: new Vector2D(MouseX, MouseY),
        Max: new Vector2D(MouseX + Width, MouseY + Height)
      });
    }
  }

  OnResizerMouseDown(Resizer: E_ResizerType) {
    return () => {
      this.setState({
        ActiveResizer: Resizer
      });
    };
  }

  OnResizerMouseUp() {
    this.setState({ ActiveResizer: E_ResizerType.NONE });
  }

  OnResizerMouseMove(ActiveResizer: E_ResizerType) {
    if (ActiveResizer !== E_ResizerType.NONE) {
      const { Min } = this.state;
      const { Mouse } = this.props;

      switch (ActiveResizer) {
        case E_ResizerType.TOP_LEFT: {
          const { Max } = this.state;

          const NewWidth = Max.X - Mouse.X;
          const NewHeight = Max.Y - Mouse.Y;

          this.setState({
            Width: NewWidth,
            Height: NewHeight,
            Min: new Vector2D(Mouse.X, Mouse.Y)
          });
          break;
        }
        case E_ResizerType.TOP_RIGHT: {
          const { Max } = this.state;

          const NewWidth = Mouse.X - Min.X;
          const NewHeight = Max.Y - Mouse.Y;

          this.setState(prevState => ({
            ...prevState,
            Width: NewWidth,
            Height: NewHeight,
            Min: new Vector2D(prevState.Min.X, Mouse.Y),
            Max: new Vector2D(Mouse.X, prevState.Max.Y)
          }));
          break;
        }
        case E_ResizerType.BOTTOM_RIGHT: {
          const NewWidth = Mouse.X - Min.X;
          const NewHeight = Mouse.Y - Min.Y;

          this.setState({
            Width: NewWidth,
            Height: NewHeight,
            Max: new Vector2D(Mouse.X, Mouse.Y)
          });
          break;
        }
        case E_ResizerType.BOTTOM_LEFT: {
          const { Max } = this.state;

          const NewWidth = Max.X - Mouse.X;
          const NewHeight = Mouse.Y - Min.Y;

          this.setState(prevState => ({
            ...prevState,
            Width: NewWidth,
            Height: NewHeight,
            Min: new Vector2D(Mouse.X, prevState.Min.Y),
            Max: new Vector2D(prevState.Max.X, Mouse.Y)
          }));
          break;
        }
      }
    }
  }
}

export default Box;
