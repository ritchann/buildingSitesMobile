import { BaseEnum } from "../core/baseEnum";

class Type extends BaseEnum {
  public Геодезист = 0;
  public Архитектор = 1;
  public "Инженер-строитель" = 2;
  public Технолог = 3;
  public Крановщик = 4;
  public Плотник = 5;
  public Cтоляр = 6;
  public Каменщик = 7;
  public Бетонщик = 8;
  public Кровельщик = 9;
  public Электросварщик = 10;
  public Газосварщик = 11;
  public Облицовщик = 12;

  public constructor() {
    super();
    this.init(this);
  }
}

export const Specialty = Object.freeze(new Type());
