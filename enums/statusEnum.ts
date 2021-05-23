import { BaseEnum } from "../core/baseEnum";

class Type extends BaseEnum {
  public Process = 0;
  public Paused = 1;
  public End = 2;

  public constructor() {
    super();
    this.init(this);
  }
}

export const Status = Object.freeze(new Type());
