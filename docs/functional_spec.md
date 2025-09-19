# Specyfikacja funkcjonalna

## 1. Wprowadzenie

**Cel dokumentu:** Opis funkcji aplikacji POS dla małego butiku, sposób interakcji użytkownika i przepływ danych.  

**Zakres systemu:** Aplikacja POS pozwalająca na logowanie, zarządzanie klientami, produktami i zamówieniami oraz przeglądanie statystyk sprzedaży.

---

## 2. Funkcje systemu

### 2.1 Logowanie użytkownika

**Opis:** Użytkownik musi się zalogować, aby uzyskać dostęp do panelu administratora.  

**Wymagania wejścia:**
- Email (string, obowiązkowy)  
- Hasło (string, obowiązkowe, min. 8 znaków)  

**Wymagania wyjścia:**
- Sesja użytkownika aktywna  
- Dostęp do panelu administratora  

**Interakcja z użytkownikiem:** Formularz logowania z walidacją danych  

**Workflow:**
1. Użytkownik otwiera ekran logowania  
2. Wprowadza dane i klika „Zaloguj”  
3. System weryfikuje dane  
4. Sukces → przekierowanie do panelu administratora  
5. Błąd → wyświetlenie komunikatu  

---

### 2.2 Panel administratora

**Opis:** Główny panel aplikacji dla zalogowanego użytkownika, umożliwiający zarządzanie produktami, zamówieniami i klientami oraz przeglądanie statystyk sprzedaży.  

**Interakcja z użytkownikiem:**
- Widok listy produktów z możliwością filtrowania i sortowania  
- Widok koszyka i tworzenie zamówień  
- Widok klientów i przypisywanie zamówień  
- Statystyki sprzedaży i raporty  

**Workflow:**
1. Po zalogowaniu użytkownik trafia do panelu administratora  
2. Wybiera sekcję: Produkty / Zamówienia / Klienci / Statystyki  
3. System pobiera dane z API zewnętrznego i wyświetla w interaktywnym widoku  

---

### 2.3 Zarządzanie produktami

**Opis:** Użytkownik może przeglądać produkty pobrane z API, dodawać je do koszyka i tworzyć zamówienia.  

**Wymagania wejścia:**
- Lista produktów z API  
- Filtry/sortowanie według kategorii

**Wymagania wyjścia:**
- Wyświetlenie produktów w panelu  
- Dodanie wybranego produktu do koszyka  

**Interakcja z użytkownikiem:**
- Przeglądanie listy produktów  
- Dodawanie do koszyka  
- Aktualizacja ilości produktów w koszyku  

**Workflow:**
1. Użytkownik wybiera produkt z listy  
2. Kliknięcie „Dodaj do koszyka”  
3. System aktualizuje zawartość koszyka  

---

### 2.4 Tworzenie zamówień

**Opis:** Użytkownik może tworzyć zamówienia z produktów w koszyku i przypisywać je do klientów.  

**Wymagania wejścia:**
- Wybrane produkty w koszyku  
- Dane klienta (wybrany z listy lub nowy)  

**Wymagania wyjścia:**
- Nowe zamówienie zapisane w systemie  
- Aktualizacja dostępności produktów  

**Interakcja z użytkownikiem:**
- Formularz zamówienia  
- Przycisk „Złóż zamówienie”  

**Workflow:**
1. Użytkownik wybiera produkty do koszyka  
2. Wybiera klienta lub tworzy nowego  
3. Kliknięcie „Złóż zamówienie”  
4. System zapisuje zamówienie i aktualizuje dane produktów  

---

### 2.5 Zarządzanie klientami

**Opis:** Użytkownik może przeglądać listę klientów, dodawać nowych i przypisywać ich do zamówień.  

**Interakcja z użytkownikiem:**
- Lista klientów z możliwością filtrowania  
- Formularz dodawania klienta  

**Workflow:**
1. Użytkownik otwiera listę klientów  
2. Dodaje nowego klienta lub wybiera istniejącego  
3. Przypisuje klienta do zamówienia  

---

### 2.6 Statystyki sprzedaży

**Opis:** Użytkownik może przeglądać statystyki sprzedaży w panelu administratora.  

**Wymagania wyjścia:**
- Wskaźniki sprzedaży (ilość zamówień, przychód, popularne produkty)  

**Interakcja z użytkownikiem:** Widok wykresów i tabel podsumowujących sprzedaż  

**Workflow:**
1. Użytkownik wybiera sekcję „Statystyki”  
2. System pobiera dane o zamówieniach i sprzedaży  
3. Wyświetlenie danych w formie wykresów i tabel  