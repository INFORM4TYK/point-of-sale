// types
type ErrorState = {
  error: string;
};

export type ErrorAction =
  | { type: "reset" }

  | { type: "auth/invalid-credentials" }
  | { type: "auth/invalid-password" }
  | { type: "auth/user-not-found" }
  | { type: "server/error" }

  | { type: "customer/failed-to-fetch" }
  | { type: "customer/failed-to-add" }
  | { type: "customer/failed-to-update" }
  | { type: "customer/failed-to-delete" }
  | { type: "customer/failed-to-search" }

  | { type: "stats/failed-to-fetch" }

  | { type: "orders/failed-to-fetch" }
  | { type: "orders/failed-to-add" }
  | { type: "orders/failed-to-update" }
  | { type: "orders/failed-to-delete" }
  | { type: "orders/failed-to-mark-paid" }
  | { type: "orders/failed-to-assign-user" };

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case "reset":
      return { error: "" };
    case "auth/user-not-found":
      return { error: "Brak użytkownika z podanym adresem e-mail." };
    case "auth/invalid-credentials":
      return { error: "Podane dane logowania są nieprawidłowe." };
    case "auth/invalid-password":
      return { error: "Podane hasło jest nieprawidłowe." };
    case "server/error":
      return { error: "Wystąpił błąd serwera. Spróbuj ponownie później." };

    case "customer/failed-to-fetch":
      return { error: "Nie udało się pobrać klientów." };
    case "customer/failed-to-add":
      return { error: "Nie udało się dodać klienta." };
    case "customer/failed-to-update":
      return { error: "Nie udało się zaktualizować klienta." };
    case "customer/failed-to-delete":
      return { error: "Nie udało się usunąć klienta." };
    case "customer/failed-to-search":
      return { error: "Nie udało się wyszukać klientów." };

    case "stats/failed-to-fetch":
      return { error: "Nie udało się pobrać statystyk." };

    case "orders/failed-to-fetch":
      return { error: "Nie udało się pobrać zamówień." };
    case "orders/failed-to-add":
      return { error: "Nie udało się dodać zamówienia." };
    case "orders/failed-to-update":
      return { error: "Nie udało się zaktualizować zamówienia." };
    case "orders/failed-to-delete":
      return { error: "Nie udało się usunąć zamówienia." };
    case "orders/failed-to-mark-paid":
      return { error: "Nie udało się oznaczyć zamówienia jako opłacone." };
    case "orders/failed-to-assign-user":
      return { error: "Nie udało się przypisać klienta do zamówienia." };

    default:
      return { error: "Coś poszło nie tak. Spróbuj ponownie." };
  }
};

export default errorReducer;
