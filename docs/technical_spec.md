# Specyfikacja Techniczna: POS

**Wersja:** 1.0
**Data:** 19.09.2025

## 1. Architektura systemu

Opis ogólnej architektury. W tym przypadku będzie to architektura Klient-Serwer. Można tu umieścić diagram architektury.

-   **Frontend:** Aplikacja z interfejsem zbudowana w React.
-   **Backend:** Aplikacja REST API zbudowana w Node.js i Express.
-   **Baza danych:** Relacyjna baza danych PostgreSQL.


## 2. Schemat bazy danych

Poniżej znajduje się opis wszystkich tabel, ich kolumn, typów danych oraz zdefiniowanych ograniczeń i relacji.

---

### **Tabela: `users`**
Przechowuje dane uwierzytelniające dla użytkowników systemu (np. administratorów).

-   `id` (**SERIAL, PRIMARY KEY**): Unikalny, automatycznie zwiększany identyfikator użytkownika.
-   `email` (**VARCHAR(100), UNIQUE, NOT NULL**): Adres e-mail użytkownika, musi być unikalny.
-   `password` (**VARCHAR(100), NOT NULL**): Skrót hasła użytkownika.
-   `created_at` (**TIMESTAMP, DEFAULT NOW()**): Data i czas utworzenia rekordu.
-   `updated_at` (**TIMESTAMP, DEFAULT NOW()**): Data i czas ostatniej modyfikacji rekordu.
-   `deleted_at` (**TIMESTAMP, NULLABLE**): Data i czas usunięcia (soft delete).

---

### **Tabela: `customers`**
Przechowuje informacje o klientach sklepu.

-   `id` (**SERIAL, PRIMARY KEY**): Unikalny, automatycznie zwiększany identyfikator klienta.
-   `name` (**VARCHAR(100), NOT NULL**): Imię i nazwisko lub nazwa klienta.
-   `phone` (**VARCHAR(20), UNIQUE**): Numer telefonu klienta, musi być unikalny.
-   `email` (**VARCHAR(100), UNIQUE**): Adres e-mail klienta, musi być unikalny.
-   `created_at` (**TIMESTAMPTZ, NOT NULL, DEFAULT NOW()**): Data i czas utworzenia rekordu.
-   `updated_at` (**TIMESTAMPTZ, NOT NULL, DEFAULT NOW()**): Data i czas ostatniej modyfikacji rekordu.
-   **Indeksy:** `name`, `email`, `phone` (dla przyspieszenia wyszukiwania).

---

### **Tabela: `categories`**
Słownikowa tabela przechowująca nazwy kategorii produktów.

-   `category` (**VARCHAR(255), PRIMARY KEY, NOT NULL**): Unikalna nazwa kategorii, służąca jako klucz główny.

---

### **Tabela: `products`**
Główna tabela z informacjami o produktach.

-   `id` (**SERIAL, PRIMARY KEY**): Unikalny, automatycznie zwiększany identyfikator produktu.
-   `title` (**VARCHAR(255), NOT NULL**): Nazwa produktu.
-   `price` (**DECIMAL(10, 2), NOT NULL**): Cena produktu.
-   `description` (**TEXT, NULLABLE**): Dłuższy opis produktu.
-   `category` (**VARCHAR(255), NULLABLE**): Nazwa kategorii, do której należy produkt. *Potencjalnie klucz obcy do tabeli `categories`*.
-   `image` (**TEXT, NULLABLE**): URL do zdjęcia produktu.
-   `rating_rate` (**DECIMAL(4, 2), NULLABLE**): Średnia ocena produktu.
-   `rating_count` (**INTEGER, NULLABLE**): Liczba ocen.
-   `stock` (**INTEGER, DEFAULT 0**): Dostępna ilość produktu w magazynie.
-   `created_at` (**TIMESTAMP, DEFAULT NOW()**): Data i czas utworzenia rekordu.
-   **Indeksy:** `title`, `description` (dla przyspieszenia wyszukiwania).

---

### **Tabela: `carts`**
Przechowuje informacje o koszykach na zakupy.

-   `id` (**SERIAL, PRIMARY KEY**): Unikalny, automatycznie zwiększany identyfikator koszyka.
-   `name` (**VARCHAR, NOT NULL**): Nazwa lub identyfikator koszyka (np. sesji użytkownika).
-   `created_at` (**TIMESTAMP, DEFAULT NOW()**): Data i czas utworzenia rekordu.
-   `updated_at` (**TIMESTAMP, DEFAULT NOW()**): Data i czas ostatniej modyfikacji rekordu.

---

### **Tabela: `cart_items`**
Tabela łącząca, która przechowuje produkty znajdujące się w konkretnym koszyku (tabela asocjacyjna).

-   `id` (**SERIAL, PRIMARY KEY**): Unikalny identyfikator wpisu w koszyku.
-   `cart_id` (**INTEGER, NOT NULL, FOREIGN KEY** do `carts.id`): Identyfikator koszyka. **ON DELETE CASCADE** - usunięcie koszyka usunie wszystkie jego pozycje.
-   `product_id` (**INTEGER, NOT NULL, FOREIGN KEY** do `products.id`): Identyfikator produktu. **ON DELETE CASCADE** - usunięcie produktu usunie go ze wszystkich koszyków.
-   `amount` (**INTEGER, NOT NULL, DEFAULT 1**): Ilość danego produktu w koszyku.
-   `category` (**VARCHAR, NOT NULL**): Zduplikowana kategoria produktu (dla ułatwienia dostępu).
-   `created_at` (**TIMESTAMP, DEFAULT NOW()**): Data i czas utworzenia rekordu.
-   `updated_at` (**TIMESTAMP, DEFAULT NOW()**): Data i czas ostatniej modyfikacji rekordu.
-   **Ograniczenie:** **UNIQUE(`cart_id`, `product_id`)** - zapewnia, że ten sam produkt może wystąpić w jednym koszyku tylko raz (jako jedna pozycja, ilość jest modyfikowana).

---

### **Tabela: `orders`**
Przechowuje informacje o złożonych zamówieniach.

-   `id` (**SERIAL, PRIMARY KEY**): Unikalny, automatycznie zwiększany identyfikator zamówienia.
-   `customer_id` (**INTEGER, FOREIGN KEY** do `customers.id`): Identyfikator klienta, który złożył zamówienie. **ON DELETE SET NULL** - jeśli klient zostanie usunięty, zamówienie pozostanie w systemie, ale bez przypisanego klienta.
-   `total` (**DECIMAL(10, 2), NOT NULL**): Całkowita kwota zamówienia.
-   `status` (**ENUM('paid', 'unpaid'), NOT NULL, DEFAULT 'unpaid'**): Status płatności zamówienia.
-   `created_at` (**TIMESTAMPTZ, NOT NULL, DEFAULT NOW()**): Data i czas utworzenia rekordu.
-   `updated_at` (**TIMESTAMPTZ, NOT NULL, DEFAULT NOW()**): Data i czas ostatniej modyfikacji rekordu.

---

### **Tabela: `order_items`**
Tabela łącząca, która przechowuje produkty wchodzące w skład konkretnego zamówienia.

-   `id` (**SERIAL, PRIMARY KEY**): Unikalny identyfikator pozycji w zamówieniu.
-   `order_id` (**INTEGER, FOREIGN KEY** do `orders.id`): Identyfikator zamówienia. **ON DELETE CASCADE** - usunięcie zamówienia usunie wszystkie jego pozycje.
-   `product_id` (**INTEGER, FOREIGN KEY** do `products.id`): Identyfikator produktu. **ON DELETE RESTRICT** - system nie pozwoli na usunięcie produktu, jeśli jest on częścią jakiegokolwiek zamówienia.
-   `amount` (**INTEGER, NOT NULL**): Ilość zamówionego produktu.
-   `price` (**DECIMAL(10, 2), NOT NULL**): Cena produktu w momencie składania zamówienia.
-   `category` (**VARCHAR, NOT NULL**): Kategoria produktu w momencie składania zamówienia.
-   `created_at` (**TIMESTAMPTZ, NOT NULL, DEFAULT NOW()**): Data i czas utworzenia rekordu.
-   `updated_at` (**TIMESTAMPTZ, NOT NULL, DEFAULT NOW()**): Data i czas ostatniej modyfikacji rekordu.

---

## **Podsumowanie Relacji**

-   **Klient-Zamówienie (One-to-Many):** Jeden `customer` może mieć wiele `orders`, ale każde `order` należy do jednego `customer`.
-   **Zamówienie-Produkt (Many-to-Many):** Relacja zrealizowana przez tabelę `order_items`. Jedno `order` może zawierać wiele `products`, a jeden `product` może znajdować się w wielu `orders`.
-   **Koszyk-Produkt (Many-to-Many):** Relacja zrealizowana przez tabelę `cart_items`. Jeden `cart` może zawierać wiele `products`, a jeden `product` może znajdować się w wielu `carts`.
-   **Produkt-Kategoria (One-to-Many, nieformalna):** Kolumna `products.category` wskazuje na relację z tabelą `categories`, jednak nie jest ona wymuszona przez klucz obcy na poziomie bazy danych.

## 3. Projekt API (Endpointy)

Szczegółowa definicja każdego endpointu API.

### API: Uwierzytelnianie (`/api/auth`)
-   **`POST /api/auth/register`**
    - **Opis:** Rejestruje nowego użytkownika w systemie.
    - **Request Body:** `{ "email": "user@example.com", "password": "password123" }`
    - **Response (Success):** `201 Created` `{ "user": { "id": 1, "email": "user@example.com" }, "accessToken": "...", "refreshToken": "..." }`
    - **Response (Error):** `409 Conflict` (jeśli użytkownik już istnieje), `400 Bad Request` (błąd walidacji).

-   **`POST /api/auth/login`**
    - **Opis:** Loguje istniejącego użytkownika i zwraca tokeny.
    - **Request Body:** `{ "email": "user@example.com", "password": "password123" }`
    - **Response (Success):** `200 OK` `{ "user": { "id": 1, "email": "user@example.com" }, "accessToken": "...", "refreshToken": "..." }`
    - **Response (Error):** `401 Unauthorized` (błędne dane logowania).

-   **`POST /api/auth/logout`**
    - **Opis:** Wylogowuje użytkownika, unieważniając jego token odświeżania.
    - **Request Body:** `{ "refreshToken": "..." }`
    - **Response (Success):** `204 No Content`
    - **Response (Error):** `400 Bad Request` (brak tokenu).

-   **`GET /api/auth/me`**
    - **Opis:** Pobiera dane aktualnie zalogowanego użytkownika.
    - **Headers:** `{ "Authorization": "Bearer <accessToken>" }`
    - **Response (Success):** `200 OK` `{ "id": 1, "email": "user@example.com" }`
    - **Response (Error):** `401 Unauthorized` (brak lub nieważny token).

-   **`POST /api/auth/refresh`**
    - **Opis:** Odświeża accessToken przy użyciu ważnego refreshToken.
    - **Request Body:** `{ "refreshToken": "..." }`
    - **Response (Success):** `200 OK` `{ "accessToken": "...", "refreshToken": "..." }`
    - **Response (Error):** `401 Unauthorized` (nieważny refreshToken).

### API: Produkty (`/api/products`)
-   **`GET /api/products`**
    - **Opis:** Pobiera listę wszystkich produktów.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `[ { "id": 1, "title": "Laptop", "price": "4999.99", "category": "electronics" } ]`
    - **Response (Error):** `500 Internal Server Error`.

-   **`GET /api/products/categories`**
    - **Opis:** Pobiera listę wszystkich dostępnych kategorii produktów.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `[ { "category": "electronics" }, { "category": "books" } ]`
    - **Response (Error):** `500 Internal Server Error`.

-   **`GET /api/products/search`**
    - **Opis:** Wyszukuje produkty na podstawie zapytania (np. ?q=laptop).
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Query Params:** `/api/products/search?q=laptop`
    - **Response (Success):** `200 OK` `[ { "id": 1, "title": "Laptop", "price": "4999.99" } ]`
    - **Response (Error):** `400 Bad Request` (brak parametru q).

-   **`GET /api/products/:id`**
    - **Opis:** Pobiera szczegółowe informacje o pojedynczym produkcie.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `{ "id": 1, "title": "Laptop", "price": "4999.99", "description": "..." }`
    - **Response (Error):** `404 Not Found` (produkt o podanym ID nie istnieje).

### API: Klienci (`/api/customers`)
-   **`POST /api/customers`**
    - **Opis:** Dodaje nowego klienta.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Request Body:** `{ "name": "Jan Kowalski", "phone": "123456789", "email": "jan@kowalski.pl" }`
    - **Response (Success):** `201 Created` `{ "id": 1, "name": "Jan Kowalski", ... }`
    - **Response (Error):** `400 Bad Request` (błąd walidacji), `409 Conflict` (email lub telefon już istnieje).

-   **`GET /api/customers`**
    - **Opis:** Pobiera listę wszystkich klientów.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `[ { "id": 1, "name": "Jan Kowalski", "email": "jan@kowalski.pl" } ]`

-   **`GET /api/customers/search`**
    - **Opis:** Wyszukuje klientów po imieniu, emailu lub telefonie (np. ?query=Jan).
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Query Params:** `/api/customers/search?query=Jan`
    - **Response (Success):** `200 OK` `[ { "id": 1, "name": "Jan Kowalski", "email": "jan@kowalski.pl" } ]`

-   **`GET /api/customers/:id`**
    - **Opis:** Pobiera dane konkretnego klienta.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `{ "id": 1, "name": "Jan Kowalski", ... }`
    - **Response (Error):** `404 Not Found`.

-   **`PUT /api/customers/:id`**
    - **Opis:** Aktualizuje dane klienta.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Request Body:** `{ "name": "Janina Kowalska", "phone": "987654321" }`
    - **Response (Success):** `200 OK` `{ "id": 1, "name": "Janina Kowalska", ... }`
    - **Response (Error):** `404 Not Found`, `400 Bad Request`.

-   **`DELETE /api/customers/:id`**
    - **Opis:** Usuwa klienta.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `204 No Content`
    - **Response (Error):** `404 Not Found`.

### API: Koszyk (`/api/cart`)
-   **`POST /api/cart/:cartId`**
    - **Opis:** Dodaje nowy produkt do koszyka.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Request Body:** `{ "productId": 12, "amount": 1, "category": "electronics" }`
    - **Response (Success):** `201 Created` `{ "id": 5, "cart_id": "some-cart-id", "product_id": 12, "amount": 1 }`
    - **Response (Error):** `404 Not Found` (produkt nie istnieje), `409 Conflict` (produkt już jest w koszyku).

-   **`GET /api/cart/:cartId`**
    - **Opis:** Pobiera wszystkie pozycje z danego koszyka.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `[ { "product_id": 12, "title": "Laptop", "amount": 1, "price": "4999.99" } ]`

-   **`PUT /api/cart/:cartId`**
    - **Opis:** Aktualizuje ilość produktu w koszyku.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Request Body:** `{ "productId": 12, "amount": 3 }`
    - **Response (Success):** `200 OK` `{ "id": 5, "cart_id": "some-cart-id", "product_id": 12, "amount": 3 }`
    - **Response (Error):** `404 Not Found` (pozycja koszyka nie istnieje).

-   **`DELETE /api/cart/:cartId/product/:productId`**
    - **Opis:** Usuwa konkretny produkt z koszyka.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `204 No Content`
    - **Response (Error):** `404 Not Found`.

-   **`DELETE /api/cart/:cartId`**
    - **Opis:** Czyści cały koszyk (usuwa wszystkie pozycje).
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `204 No Content`

-   **`GET /api/cart/total/:cartId`**
    - **Opis:** Oblicza i zwraca całkowitą wartość koszyka.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `{ "total": "5129.98" }`

### API: Zamówienia (`/api/orders`)
-   **`POST /api/orders`**
    - **Opis:** Tworzy nowe zamówienie na podstawie koszyka.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Request Body:** `{ "customerId": 1, "cartId": "some-cart-id" }`
    - **Response (Success):** `201 Created` `{ "id": 101, "customer_id": 1, "total": "5129.98", "status": "unpaid" }`
    - **Response (Error):** `404 Not Found` (klient lub koszyk nie istnieje).

-   **`GET /api/orders`**
    - **Opis:** Pobiera listę wszystkich zamówień.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `[ { "id": 101, "customer_id": 1, "total": "5129.98", "status": "unpaid" } ]`

-   **`GET /api/orders/:orderId`**
    - **Opis:** Pobiera szczegóły konkretnego zamówienia wraz z pozycjami.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `{ "id": 101, "status": "unpaid", "items": [ { "product_id": 12, "amount": 1 } ] }`
    - **Response (Error):** `404 Not Found`.

-   **`PUT /api/orders/:orderId`**
    - **Opis:** Aktualizuje dane zamówienia (np. dane klienta, adres).
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Request Body:** `{ "customerId": 2 }`
    - **Response (Success):** `200 OK` `{ "id": 101, "customer_id": 2, ... }`
    - **Response (Error):** `404 Not Found`.

-   **`PUT /api/orders/:orderId/paid`**
    - **Opis:** Oznacza zamówienie jako opłacone.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `200 OK` `{ "id": 101, "status": "paid" }`
    - **Response (Error):** `404 Not Found`.

-   **`DELETE /api/orders/:orderId`**
    - **Opis:** Usuwa zamówienie.
    - **Headers:** `{ "Authorization": "Bearer <token>" }`
    - **Response (Success):** `204 No Content`
    - **Response (Error):** `404 Not Found`.
## 4. Wybrane technologie i biblioteki

### Backend
- **Node.js** + **Express.js** – serwer REST API.
- **PostgreSQL** – relacyjna baza danych.
- **Knex** – query builder dla PostgreSQL.
- **bcrypt** – hashowanie haseł użytkowników.
- **jsonwebtoken (JWT)** – autoryzacja użytkowników.
- **dotenv** – zarządzanie zmiennymi środowiskowymi.
- **cors** – obsługa zapytań cross-origin.
- **cookie-parser** – parsowanie ciasteczek.
- **axios** – wykonywanie zapytań HTTP (opcjonalnie do wewnętrznych API).
- **decimal.js** – precyzyjne operacje na liczbach (np. kwoty zamówień).
- **joi** – walidacja danych wejściowych.

### Frontend
- **React** – budowa SPA.
- **React Router DOM** – routing po aplikacji.
- **Axios** – zapytania HTTP do backendu.
- **React Hook Form** – obsługa formularzy.
- **@tanstack/react-query** – zarządzanie pobieraniem i cache’owaniem danych.
- **Material UI (@mui/material + @mui/icons-material)** – komponenty i ikony do UI.
- **Emotion (@emotion/react + @emotion/styled)** – stylowanie komponentów.
- **Sass** – rozszerzenia CSS dla lepszej organizacji styli.
- **React ApexCharts** – wykresy i statystyki w panelu POS.
- **uuid** – generowanie unikalnych identyfikatorów.
- **decimal.js** – operacje na precyzyjnych liczbach w frontendzie.