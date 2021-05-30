import { BaseEnum } from "../core/baseEnum";

class Type extends BaseEnum {
  public Sos = 0;
  public Fall = 1;

  public constructor() {
    super();
    this.init(this);
  }
}

export const AccidentType = Object.freeze(new Type());
