type ErrorState = {
  error: string;
};
export type ErrorAction =
  | { type: "reset" }
  | { type: "auth/invalid-credentials" }
  | { type: "auth/invalid-password" }
  | { type: "server/error" };

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case "reset":
      return (state = { error: "" });
    case "auth/invalid-credentials":
      return (state = { error: "Podane dane logowania są nie prawidłowe." });
    case "auth/invalid-password":
      return (state = { error: "Podane hasło jest nie prawidłowe." });
    case "server/error":
      return { error: "Wystąpił błąd serwera. Spróbuj ponownie później." };
    default:
      return (state = {
        error: "Coś poszło nie tak. Spróbuj ponownie.",
      });
  }
};

export default errorReducer;
