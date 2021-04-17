import { BaseEnum } from "../core/baseEnum";

class Type extends BaseEnum {
  public ВС = 0;
  public ПН = 1;
  public ВТ = 2;
  public СР = 3;
  public ЧТ = 4;
  public ПТ = 5;
  public СБ = 6;

  public constructor() {
    super();
    this.init(this);
  }
}

export const DaysWeek = Object.freeze(new Type());
