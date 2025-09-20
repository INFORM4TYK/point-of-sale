## Strona Frontend

Możesz odwiedzić działającą wersję pod tym adresem:  

[**Point of Sale – Frontend**](https://point-of-sale-sable-two.vercel.app/)

# Dane logowania



```
Email: admin@gmail.com
Password: 123456
```

# POS

To jest aplikacja POS (Point of Sale) umożliwiająca zarządzanie zamówieniami, klientami i produktami w punktach sprzedaży stacjonarnej, automatyzując proces sprzedaży i raportowania, co przyspiesza obsługę klientów i ułatwia kontrolę sprzedaży.

### Opis

Projekt to pełnoprawna aplikacja POS (Point of Sale) przeznaczona dla małych i średnich punktów sprzedaży, takich jak sklepy, kawiarnie czy restauracje. Jej głównym celem jest usprawnienie procesu sprzedaży, automatyzacja zarządzania zamówieniami oraz kontrola nad klientami i produktami oraz statystykami.

### Instalacja

```bash
# Sklonuj repozytorium
git clone [https://github.com/INFORM4TYK/point-of-sale.git](https://github.com/INFORM4TYK/point-of-sale.git)
cd nazwa-projektu

# Instalacja zależności dla serwera (backend)
 Dev
cd backend
npm install
npm run migrate:dev
npm run dev

 Prod
cd backend
npm install
npm run migrate:prod
npm run build
npm run prod

# Instalacja zależności dla klienta (frontend)
cd frontend
npm install
npm run dev
```

### Konfiguracja środowiska

Aby uruchomić projekt lokalnie, potrzebujesz plików `.env` w katalogach `backend` i `frontend`.

#### Backend (`backend/.env`)

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
BASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=

```

#### Backend (`backend/.env.production`)

```env production
BASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
DATABASE_URL=
```

#### Frontend (`frontend/.env`)

```env
VITE_BASE_URL=
```

#### Frontend (`frontend/.env.production`)

VITE_BASE_URL=
