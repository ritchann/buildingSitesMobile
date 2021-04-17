import { BaseEnum } from "../core/baseEnum";

class Type extends BaseEnum {
  public Геодезист = 0;
  public Архитектор = 1;
  public "Инженер-строитель" = 2;
  public Технолог = 3;
  public Крановщик = 4;
  public "Мастер монтажных и строительных работ" = 5;
  public Плотник = 6;
  public Cтоляр = 7;
  public Каменщик = 8;
  public Бетонщик = 9;
  public Кровельщик = 10;
  public Электросварщик = 11;
  public Газосварщик = 12;
  public Облицовщик = 13;

  public constructor() {
    super();
    this.init(this);
  }
}

export const Specialty = Object.freeze(new Type());
