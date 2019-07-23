import React, { Component } from "react";
import Vector2D from "../models/Vector2D";
import "./Box.css";

interface IProps {
  Min: Vector2D;
  Max: Vector2D;
  Name: string;
}

interface IState {
  _Min: Vector2D;
  _Max: Vector2D;
  _IsValid: boolean;
}

class Box extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const InitValidity = this.GetBoxValidity(props.Min, props.Max);

    this.state = {
      _Min: props.Min,
      _Max: props.Max,
      _IsValid: InitValidity
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      !prevProps.Max.IsEqual(this.props.Max) ||
      !prevProps.Min.IsEqual(this.props.Min)
    ) {
      this.setState((prevState, props) => ({
        ...prevState,
        _IsValid: this.GetBoxValidity(props.Min, props.Max)
      }));
    }
  }

  render() {
    const { _IsValid } = this.state;
    const { Name } = this.props;

    return (
      <div className="box">
        <div className="resizers">
          <div className="resizer top-left" />
          <div className="resizer top-right" />
          <div className="resizer bottom-left" />
          <div className="resizer bottom-right" />
        </div>
        <div className="name">{Name}</div>
        {!_IsValid && <div className="validity-message">Invalid!</div>}
      </div>
    );
  }

  /**
   * Checks if Min and Max points are valid.
   */
  private GetBoxValidity(Min: Vector2D, Max: Vector2D): boolean {
    return Min.X < Max.X && Min.Y < Max.Y;
  }
}

export default Box;
