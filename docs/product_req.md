## **Product Requirements Document (PRD)**

```markdown
# Product Requirements Document: Nazwa Projektu

**Wersja:** 1.0
**Data:** 19.09.2025

## 1. Wprowadzenie i cel

Opisz cel produktu. Jaki problem rozwiązuje? Jaka jest wizja i dla kogo jest ten produkt?

## 2. Kluczowe funkcjonalności

Wylistuj główne funkcje produktu. Każda funkcja powinna mieć krótki opis.

-   **Rejestracja i logowanie użytkowników:** Umożliwienie logowania się do aplikacji za pomocą wcześniej stworzonego loginu i hasła.
-   **Zarządzanie sprzedażą:** Użyktownik może tworzyć zamówienie oraz przeglądać produkty.
-   **Statystyki** Dostęp do panelu ze statystykami dotyczących sprzedaży oraz klientów.

## 3. Historyjki użytkownika 

- *Jako sprzedawca, chcę móc dodać nowego klienta do systemu, aby przypisać go do zamówienia.*  
- *Jako sprzedawca, chcę wyszukiwać istniejących klientów, aby szybko przypisać ich do zamówienia.*  
- *Jako sprzedawca, chcę tworzyć nowe zamówienia z produktami i ilością, aby obsłużyć klienta.*  
- *Jako sprzedawca, chcę móc oznaczyć zamówienie jako opłacone, aby kontrolować stan płatności.*  
- *Jako właściciel sklepu, chcę mieć dostęp do statystyk sprzedaży, aby monitorować przychody i popularne produkty.*

## 4. Metryki sukcesu

- **Aktywacja:** Liczba nowych klientów dodanych do systemu tygodniowo > 20.  
- **Zaangażowanie:** Średnia liczba zamówień tworzonych dziennie przez sprzedawcę > 5.  
- **Efektywność sprzedaży:** Czas obsługi zamówienia średnio < 3 minut.  
- **Dokładność danych:** Procent poprawnie przypisanych zamówień do klientów > 95%.  
- **Zadowolenie użytkowników:** Pozytywne opinie od sprzedawców i właścicieli sklepów > 80%.

## 5. Założenia i ograniczenia

### Założenia techniczne
- Aplikacja korzysta z architektury Klient-Serwer (frontend w React, backend w Node.js/Express).
- Baza danych to PostgreSQL, zapewniająca relacje między klientami, zamówieniami i produktami.
- System działa w czasie rzeczywistym w obrębie jednego punktu sprzedaży.
- Aplikacja obsługuje jednego sprzedawcę na raz dla danego terminala POS.
- Frontend i backend komunikują się za pomocą REST API.
- Bezpieczeństwo danych klientów zapewnia szyfrowanie haseł (bcrypt) i autoryzacja tokenami JWT.

### Założenia biznesowe
- System przeznaczony jest dla małych i średnich punktów sprzedaży (sklepy, kawiarnie, restauracje).
- Każdy użytkownik systemu (sprzedawca) posiada unikalne konto.
- Aplikacja wspiera raportowanie sprzedaży i przypisywanie zamówień do klientów.

### Ograniczenia
- Projekt zakłada działanie w sieci lokalnej lub w chmurze z dostępem do bazy PostgreSQL.
- Brak integracji z zewnętrznymi systemami płatności w wersji początkowej (poza Stripe w backendzie, jeśli włączone).
- Liczba jednoczesnych użytkowników w terminalu POS jest ograniczona do pojedynczego punktu sprzedaży.
- Aplikacja wymaga przeglądarki obsługującej nowoczesne standardy (ES6+, Fetch API).
- Brak offline mode – aplikacja wymaga połączenia z serwerem.