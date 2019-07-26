import React, { Component } from "react";
import Box from "./Box";
import Vector2D from "../models/Vector2D";
import Box2D from "../models/Box2D";
import { debounce } from "../utils";

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

  componentDidUpdate() {
    this.ComputeOccTrunc();
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

  ComputeOccTrunc = debounce(100, () => {
    const { Boxes, OcclusionThreshold, TruncationThreshold } = this.state;
    const BoxesInViewport = Object.keys(Boxes).map(Name => Boxes[Name]);

    console.log(
      `Box ${BoxesInViewport[0].Name} `,
      BoxesInViewport[0].OverlappingAreaWith(BoxesInViewport[1])
    );

    // for (let i = 0; i < BoxesInViewport.length; i++) {
    //   for (let j = 0; j < BoxesInViewport.length; j++) {
    //     // avoid comparing with itself
    //     if (i == j) {
    //       continue;
    //     }

    //     // intersects?
    //     if (BoxesInViewport[i].Intersect(BoxesInViewport[j])) {
    //       const IsBehind =
    //         BoxesInViewport[i].DistanceFromCameraView >
    //         BoxesInViewport[j].DistanceFromCameraView;

    //       // is comparison box completely inside?
    //       if (BoxesInViewport[i].IsInside(BoxesInViewport[j])) {
    //         // is comparison box behind?
    //         if (!IsBehind) {
    //           continue;
    //         }
    //       }

    //       // is completely inside?
    //       if (BoxesInViewport[j].IsInside(BoxesInViewport[i])) {
    //         // is behind?
    //         if (IsBehind) {
    //           BoxesInViewport[i].Occluded = true;
    //         }
    //       }
    //       // what percentage do they intersect?
    //       else {
    //         const OverlappedArea = BoxesInViewport[i].OverlappingAreaWith(
    //           BoxesInViewport[j]
    //         );

    //         // is behind?
    //         if (IsBehind) {
    //           // if above the OcclusionThreshold: occluded
    //           if (
    //             OverlappedArea / BoxesInViewport[i].GetArea() >=
    //             OcclusionThreshold
    //           ) {
    //             BoxesInViewport[i].Occluded = true;
    //           }
    //           // if above the TruncationThreshold: truncated
    //           else if (
    //             OverlappedArea / BoxesInViewport[i].GetArea() >=
    //             TruncationThreshold
    //           ) {
    //             BoxesInViewport[i].Truncated = true;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  });
}

export default Viewport;
