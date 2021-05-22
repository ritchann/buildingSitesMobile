import { BaseEnum } from "../core/baseEnum";

class Type extends BaseEnum {
  public "auth/wrong-password" = "Неверный пароль";
  public "auth/user-not-found" = "Пользователь не найден";
  public "auth/invalid-email" = "Неверная электронная почта";
  public "Employee not found" = "Пользователь не найден";

  public constructor() {
    super();
    this.init(this);
  }
}

export const ErrorEnum = Object.freeze(new Type());
