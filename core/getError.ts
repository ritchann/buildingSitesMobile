export const getError = (value: string) => {
  switch (value) {
    case "auth/wrong-password":
      return "Неверный пароль";
    case "auth/user-not-found":
      return "Пользователь не найден";
    case "auth/invalid-email":
      return "Неверная электронная почта";
    case "Employee not found":
      return "Пользователь не найден";
    case "auth/email-already-in-use":
      return "Email уже используется";
    case "auth/weak-password":
       return "Ненадежный пароль";
    default:
      return "Системная ошибка";
  }
};
