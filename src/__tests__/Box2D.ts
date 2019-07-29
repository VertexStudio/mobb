import Box2D from "../models/Box2D";
import Vector2D from "../models/Vector2D";

it("new uninitialized-box", () => {
  const NewBox = new Box2D();

  expect(NewBox.IsValid).toBe(false);
  expect(NewBox.Min).toEqual(Vector2D.ZeroVector);
  expect(NewBox.Max).toEqual(Vector2D.ZeroVector);
});

it("new valid initialized-box", () => {
  const NewBox = new Box2D("A", new Vector2D(10, 15), new Vector2D(22, 19), 0);

  expect(NewBox.IsValid).toBe(true);
  expect(NewBox.Min).not.toEqual(Vector2D.ZeroVector);
  expect(NewBox.Max).not.toEqual(Vector2D.ZeroVector);
});

it("new invalid initialized-box", () => {
  const NewBox = new Box2D("A", new Vector2D(10, 15), new Vector2D(7, 14), 0);

  expect(NewBox.IsValid).toBe(false);
});

it("box equality", () => {
  const Box1 = new Box2D();
  const Box2 = new Box2D();

  expect(Box1.IsEqual(Box2)).toBe(true);

  Box1.Min = new Vector2D(12, 16);

  expect(Box1.IsEqual(Box2)).toBe(false);

  Box2.Min = new Vector2D(7, 20);

  expect(Box1.IsEqual(Box2)).toBe(false);

  Box1.Max = new Vector2D(15, 22);
  Box2.Max = new Vector2D(15, 22);

  expect(Box1.IsEqual(Box2)).toBe(false);

  Box1.Min = new Vector2D(2, 7);
  Box2.Min = new Vector2D(2, 7);

  expect(Box1.IsEqual(Box2)).toBe(true);
});

it("check box validity", () => {
  const NewBox = new Box2D();

  expect(NewBox.IsValid).toBe(false);

  NewBox.Max = new Vector2D(42, 23);

  expect(NewBox.IsValid).not.toBe(false);

  NewBox.Max = new Vector2D(-42, 23);

  expect(NewBox.IsValid).toBe(false);

  NewBox.Min = new Vector2D(-43, 22);

  expect(NewBox.IsValid).toBe(true);
});

it("overlapping and non-overlapping boxes", () => {
  const BoxA = new Box2D("A", Vector2D.ZeroVector, new Vector2D(20, 20), 0);
  const BoxB = new Box2D("B", new Vector2D(5, 6), new Vector2D(20, 20), 0);

  expect(BoxA.OverlappingAreaWith(BoxB)).toBeGreaterThan(0);

  BoxA.Min = new Vector2D(50, 50);
  BoxA.Max = new Vector2D(60, 60);
  BoxB.Min = new Vector2D(10, 10);
  BoxB.Max = new Vector2D(30, 30);

  expect(BoxA.OverlappingAreaWith(BoxB)).toEqual(0);

  BoxA.Min = new Vector2D(50, 50);
  BoxA.Max = new Vector2D(60, 60);
  BoxB.Min = new Vector2D(50, 50);
  BoxB.Max = new Vector2D(55, 55);

  expect(BoxA.OverlappingAreaWith(BoxB)).toEqual(25);

  BoxA.Min = new Vector2D(0, 0);
  BoxA.Max = new Vector2D(10, 10);
  BoxB.Min = new Vector2D(5, 5);
  BoxB.Max = new Vector2D(15, 15);

  expect(BoxA.OverlappingAreaWith(BoxB)).toEqual(25);
});

it("get overlapping 2D box", () => {
  const BoxA = new Box2D("A", Vector2D.ZeroVector, new Vector2D(10, 10), 0);
  const BoxB = new Box2D("B", new Vector2D(5, 5), new Vector2D(15, 15), 0);

  let Result = BoxA.GetIntersectionBox(BoxB);

  expect(Result.Min.IsEqual(new Vector2D(5, 5))).toBe(true);
  expect(Result.Max.IsEqual(new Vector2D(10, 10))).toBe(true);
  expect(Result.GetArea()).toEqual(25);

  const BoxC = new Box2D("C", new Vector2D(10, 0), new Vector2D(20, 10), 0);

  Result = BoxB.GetIntersectionBox(BoxC);

  expect(Result.Min.IsEqual(new Vector2D(10, 5))).toBe(true);
  expect(Result.Max.IsEqual(new Vector2D(15, 10))).toBe(true);
  expect(Result.GetArea()).toEqual(25);
});
