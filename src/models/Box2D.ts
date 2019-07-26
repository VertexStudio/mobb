import Vector2D from "./Vector2D";

class Box2D {
  private _Name: string;
  private _DistanceFromCameraView: number;
  private _Min: Vector2D;
  private _Max: Vector2D;
  private _IsValid: boolean;
  private _TruncationPercentage: number;
  private _OcclusionPercentage: number;
  private _Truncated: boolean;
  private _Occluded: boolean;

  constructor();
  constructor(
    Name: string,
    Min: Vector2D,
    Max: Vector2D,
    DistanceFromCameraView: number
  );
  constructor(Name?: any, Min?: any, Max?: any, DistanceFromCameraView?: any) {
    this._TruncationPercentage = 0;
    this._OcclusionPercentage = 0;
    this._Truncated = false;
    this._Occluded = false;
    this._IsValid = false;
    if (
      typeof Name === "string" &&
      Min instanceof Vector2D &&
      Max instanceof Vector2D
    ) {
      this._Name = Name;
      this._Min = Min;
      this._Max = Max;
      this._DistanceFromCameraView = DistanceFromCameraView;
      this.SetBoxValidity();
    } else {
      this._Name = `${Date.now()}`;
      this._Min = Vector2D.ZeroVector;
      this._Max = Vector2D.ZeroVector;
      this._IsValid = false;
      this._DistanceFromCameraView = 0;
    }
  }

  public get Name(): string {
    return this._Name;
  }

  public get DistanceFromCameraView(): number {
    return this._DistanceFromCameraView;
  }

  public get TruncationPercentage(): number {
    return this._TruncationPercentage;
  }

  public get OcclusionPercentage(): number {
    return this._OcclusionPercentage;
  }

  public get Truncated(): boolean {
    return this._Truncated;
  }

  public get Occluded(): boolean {
    return this._Occluded;
  }

  public set TruncationPercentage(v: number) {
    this._TruncationPercentage = v;
  }

  public set OcclusionPercentage(v: number) {
    this._OcclusionPercentage = v;
  }

  public set Truncated(v: boolean) {
    this._Truncated = v;
  }

  public set Occluded(v: boolean) {
    this._Occluded = v;
  }

  public get Min(): Vector2D {
    return this._Min;
  }

  public get Max(): Vector2D {
    return this._Max;
  }

  public get IsValid(): boolean {
    return this._IsValid;
  }

  public set Name(v: string) {
    this._Name = v;
  }

  public set DistanceFromCameraView(v: number) {
    this._DistanceFromCameraView = v;
  }

  public set Min(v: Vector2D) {
    this._Min.X = v.X;
    this._Min.Y = v.Y;
    this.SetBoxValidity();
  }

  public set Max(v: Vector2D) {
    this._Max.X = v.X;
    this._Max.Y = v.Y;
    this.SetBoxValidity();
  }

  /**
   * Checks if Min and Max points are valid and sets validity.
   */
  private SetBoxValidity(): void {
    this._IsValid = this._Min.X < this._Max.X && this._Min.Y < this._Max.Y;
  }

  /**
   * Checks if boxes are equal.
   * @param Box to compare against
   */
  IsEqual(Box: Box2D): boolean {
    return this._Min.IsEqual(Box.Min) && this._Max.IsEqual(Box.Max);
  }

  /**
   * Calcs overlapping area with the given box.
   * @param Box to check against
   */
  OverlappingAreaWith(Box: Box2D): number {
    const IntersectionX =
      Math.min(this._Max.X, Box._Max.X) - Math.max(this._Min.X, Box.Min.X);
    const IntersectionY =
      Math.min(this._Max.Y, Box.Max.Y) - Math.max(this._Min.Y, Box._Min.Y);

    if (IntersectionX >= 0 && IntersectionY >= 0) {
      return IntersectionX * IntersectionY;
    }

    return 0;
  }

  GetArea(): number {
    const Width = this._Max.X - this._Min.X;
    const Height = this._Max.Y - this._Min.Y;
    return Width * Height;
  }

  Intersect(Box: Box2D): boolean {
    throw "Needs implementation";
  }

  IsInside(Box: Box2D): boolean {
    throw "Needs implementation";
  }
}

export default Box2D;
