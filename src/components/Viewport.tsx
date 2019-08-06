import React, { Component } from "react";
import "./Viewport.css";
import Box from "./Box";
import Vector2D from "../models/Vector2D";
import Box2D from "../models/Box2D";
import { debounce } from "../utils";

interface IState {
  Mouse: Vector2D;
  TruncationThreshold: number;
  OcclusionThreshold: number;
  Boxes: {
    [Name: string]: Box2D;
  };
  BoxesInViewport: Box2D[];
}

class Viewport extends Component<{}, IState> {
  Frame: Box2D;

  constructor(props: {}) {
    super(props);
    // Frame => Min(350, 100), Max(1250, 700)
    this.Frame = new Box2D(
      "Frame",
      new Vector2D(350, 100),
      new Vector2D(1250, 700),
      0
    );
    this.state = {
      Mouse: Vector2D.ZeroVector,
      TruncationThreshold: 0.15,
      OcclusionThreshold: 0.75,
      Boxes: {},
      BoxesInViewport: []
    };

    this.OnMouseMove = this.OnMouseMove.bind(this);
    this.OnBoxChange = this.OnBoxChange.bind(this);
    this.OnTruncationChange = this.OnTruncationChange.bind(this);
    this.OnOcclusionChange = this.OnOcclusionChange.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener("mousemove", this.OnMouseMove);
  }

  componentDidUpdate(PrevProps: {}, PrevState: IState) {
    if (!PrevState.Mouse.IsEqual(this.state.Mouse)) {
      this.ComputeOccTrunc();
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener("mousemove", this.OnMouseMove);
  }

  render() {
    const {
      Mouse,
      TruncationThreshold,
      OcclusionThreshold,
      BoxesInViewport
    } = this.state;
    const A_InitMin = new Vector2D(200, 10);
    const B_InitMin = new Vector2D(200, 130);
    const C_InitMin = new Vector2D(200, 250);

    return (
      <div className="container">
        {BoxesInViewport.length > 0 ? (
          <div className="details" style={{ zIndex: 5 }}>
            <span className="details-title">Thresholds</span>
            <div className="thresholds">
              <table>
                <tbody>
                  <tr>
                    <td>Truncation:</td>
                    <td>
                      <input
                        type="number"
                        width="100"
                        step={0.01}
                        max="1"
                        min="0"
                        onChange={this.OnTruncationChange}
                        value={TruncationThreshold}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Occlusion:</td>
                    <td>
                      <input
                        type="number"
                        width="100"
                        step={0.01}
                        max="1"
                        min="0"
                        onChange={this.OnOcclusionChange}
                        value={OcclusionThreshold}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr style={{ width: "160px", marginLeft: 0 }} />
            {BoxesInViewport.map((Box, Index) => {
              return (
                <div
                  style={{
                    fontSize: "0.4em",
                    marginBottom: "4px"
                  }}
                  key={Index}
                >
                  <span style={{ fontWeight: "bold" }}>{Box.Name}</span>: <br />
                  Distance from camera:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {Box.DistanceFromCameraView}
                  </span>
                  <br />
                  {Box.Truncated ? (
                    <span style={{ color: "#ff0000" }}>Truncated</span>
                  ) : (
                    "Not Truncated"
                  )}{" "}
                  <br />
                  T. Percentage:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {Box.TruncationPercentage}
                  </span>{" "}
                  <br />
                  {Box.Occluded ? (
                    <span style={{ color: "#ff0000" }}>Occluded</span>
                  ) : (
                    "Not Occluded"
                  )}{" "}
                  <br />
                  O. Percentage:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {Box.OcclusionPercentage}
                  </span>{" "}
                  <br />
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ position: "absolute" }}>Loading...</div>
        )}
        <div className="frame" />
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
        <Box
          Name="C"
          Mouse={Mouse}
          DistanceFromCameraView={50}
          OnChange={this.OnBoxChange}
          InitMin={C_InitMin}
        />
      </div>
    );
  }

  OnTruncationChange(Event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      TruncationThreshold: Number(Event.currentTarget.value)
    });
  }

  OnOcclusionChange(Event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      OcclusionThreshold: Number(Event.currentTarget.value)
    });
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

  ComputeOccTrunc = debounce(50, () => {
    const { Boxes, OcclusionThreshold, TruncationThreshold } = this.state;
    const Names = Object.keys(Boxes);
    const BoxesInViewport = Names.map(Name => Boxes[Name]);
    const OverlappingBoxes: Array<Box2D[]> = [];

    // Check for truncations
    for (let Index = 0; Index < BoxesInViewport.length; Index++) {
      const CurrentBox = BoxesInViewport[Index];
      // Area before clampping
      const OriginalArea = CurrentBox.GetArea();
      const Clone = CurrentBox.Clone(`Clone of ${CurrentBox.Name}`);

      if (Clone.Min.X < this.Frame.Min.X) {
        Clone.Min.X = this.Frame.Min.X;
      } else if (Clone.Min.X > this.Frame.Max.X) {
        Clone.Min.X = this.Frame.Max.X;
      }
      if (Clone.Min.Y < this.Frame.Min.Y) {
        Clone.Min.Y = this.Frame.Min.Y;
      } else if (Clone.Min.Y > this.Frame.Max.Y) {
        Clone.Min.Y = this.Frame.Max.Y;
      }
      if (Clone.Max.X > this.Frame.Max.X) {
        Clone.Max.X = this.Frame.Max.X;
      } else if (Clone.Max.X < this.Frame.Min.X) {
        Clone.Max.X = this.Frame.Min.X;
      }
      if (Clone.Max.Y > this.Frame.Max.Y) {
        Clone.Max.Y = this.Frame.Max.Y;
      } else if (Clone.Max.Y < this.Frame.Min.Y) {
        Clone.Max.Y = this.Frame.Min.Y;
      }

      const TruncatedArea = OriginalArea - Clone.GetArea();
      const TruncatedAreaPercentage = TruncatedArea / OriginalArea;

      if (TruncatedAreaPercentage >= TruncationThreshold) {
        CurrentBox.Truncated = true;
        CurrentBox.TruncationPercentage = TruncatedArea / OriginalArea;
      }
    }

    for (let i = 0; i < BoxesInViewport.length; i++) {
      OverlappingBoxes[i] = [];
      for (let j = 0; j < BoxesInViewport.length; j++) {
        // avoid comparing with itself
        if (i === j) {
          continue;
        }

        // intersects?
        if (BoxesInViewport[i].Intersect(BoxesInViewport[j])) {
          const IsBehind =
            BoxesInViewport[i].DistanceFromCameraView >
            BoxesInViewport[j].DistanceFromCameraView;

          // is comparison box completely inside?
          if (BoxesInViewport[i].IsInside(BoxesInViewport[j])) {
            // is comparison box behind?
            if (!IsBehind) {
              continue;
            }
          }

          // is completely inside?
          if (BoxesInViewport[j].IsInside(BoxesInViewport[i])) {
            // is behind?
            if (IsBehind) {
              BoxesInViewport[i].Occluded = true;
              BoxesInViewport[i].OcclusionPercentage = 1.0;
            }
          }
          // what percentage do they intersect?
          else {
            // is behind?
            if (IsBehind) {
              OverlappingBoxes[i].push(BoxesInViewport[j]);
            }
          }
        }
      }
    }

    OverlappingBoxes.forEach((Occluders, Index) => {
      if (!BoxesInViewport[Index].Occluded) {
        let TotalOverlappedArea = 0;

        Occluders.forEach(Occluder => {
          TotalOverlappedArea += BoxesInViewport[Index].OverlappingAreaWith(
            Occluder
          );
        });

        Occluders.forEach(Occluder => {
          Occluders.forEach((Comparator, CompIndex) => {
            if (
              Occluder.Name !== Comparator.Name &&
              CompIndex < Occluders.length - 1
            ) {
              const Result = Comparator.GetIntersectionBox(
                Occluders[CompIndex + 1]
              );

              // Clamp intersection box
              if (Result.Min.X < BoxesInViewport[Index].Min.X) {
                Result.Min.X = BoxesInViewport[Index].Min.X;
              } else if (Result.Min.X > BoxesInViewport[Index].Max.X) {
                Result.Min.X = BoxesInViewport[Index].Max.X;
              }
              if (Result.Min.Y < BoxesInViewport[Index].Min.Y) {
                Result.Min.Y = BoxesInViewport[Index].Min.Y;
              } else if (Result.Min.Y > BoxesInViewport[Index].Max.Y) {
                Result.Min.Y = BoxesInViewport[Index].Max.Y;
              }
              if (Result.Max.X > BoxesInViewport[Index].Max.X) {
                Result.Max.X = BoxesInViewport[Index].Max.X;
              } else if (Result.Max.X < BoxesInViewport[Index].Min.X) {
                Result.Max.X = BoxesInViewport[Index].Min.X;
              }
              if (Result.Max.Y > BoxesInViewport[Index].Max.Y) {
                Result.Max.Y = BoxesInViewport[Index].Max.Y;
              } else if (Result.Max.Y < BoxesInViewport[Index].Min.Y) {
                Result.Max.Y = BoxesInViewport[Index].Min.Y;
              }

              TotalOverlappedArea -= Result.GetArea();
            }
          });
        });

        BoxesInViewport[Index].OcclusionPercentage =
          TotalOverlappedArea / BoxesInViewport[Index].GetArea();

        // if above the OcclusionThreshold: occluded
        if (
          TotalOverlappedArea / BoxesInViewport[Index].GetArea() >=
          OcclusionThreshold
        ) {
          BoxesInViewport[Index].Occluded = true;
          BoxesInViewport[Index].OcclusionPercentage =
            TotalOverlappedArea / BoxesInViewport[Index].GetArea();
        }
      }
    });

    this.setState({
      BoxesInViewport
    });
  });
}

export default Viewport;
