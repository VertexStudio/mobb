class Vector2D {
  private _X: number;
  private _Y: number;

  static get ZeroVector(): Vector2D {
    return new Vector2D(0, 0);
  }

  static get UnitVector(): Vector2D {
    return new Vector2D(1, 1);
  }

  constructor();
  constructor(X: number, Y: number);
  constructor(X?: any, Y?: any) {
    if (typeof X == "number" && typeof Y == "number") {
      this._X = X;
      this._Y = Y;
    } else {
      this._X = this._Y = 0;
    }
  }

  public get X(): number {
    return this._X;
  }

  public get Y(): number {
    return this._Y;
  }

  public set X(v: number) {
    this._X = v;
  }

  public set Y(v: number) {
    this._Y = v;
  }

  /**
   * Equality check with the given vector.
   * @param Vector to be compared against
   * @returns boolean
   */
  IsEqual(Vector: Vector2D): boolean {
    return this._X === Vector.X && this._Y === Vector.Y;
  }
}

export default Vector2D;
