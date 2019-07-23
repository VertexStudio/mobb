import Vector2D from "../models/Vector2D";

it("zero vector", () => {
  expect(Vector2D.ZeroVector.X).toBe(0);
  expect(Vector2D.ZeroVector.Y).toBe(0);
});

it("unit vector", () => {
  expect(Vector2D.UnitVector.X).toBe(1);
  expect(Vector2D.UnitVector.Y).toBe(1);
});

it("vector equality", () => {
  const ComparatorVec1 = new Vector2D(2, 5);
  const ComparatorVec2 = new Vector2D(5, 6);
  const ComparatorVec3 = new Vector2D(7, 2);
  const ComparatorVec4 = new Vector2D(2, 5);

  expect(ComparatorVec1.IsEqual(ComparatorVec2)).toBe(false);
  expect(ComparatorVec1.IsEqual(ComparatorVec3)).toBe(false);
  expect(ComparatorVec1.IsEqual(ComparatorVec4)).toBe(true);
});
