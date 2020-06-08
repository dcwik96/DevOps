# Uruchomienie:
```
docker-compose up --build
```
## Adres
[localhost:8080](localhost:8080)

## Przykład
![Preview](/Docker/my-full-app/.preview/preview.png)


# Aplikacja składająca się z:
## 1. Backend (ExpressJS)
* Dockerfile
* keys.js
    * zmienne potrzebne do połaczenia z bazami
* index.js
    * połączenie z bazą Postgres
    * połączenie z bazą Redis
    * funkcjonalność aplikacji (liczenie silni)
## 2. Frontend (React.js with Axios)
* Dockerfile
* App.js
    * widok z polem do wysłania liczby, której silnie obliczyć oraz miejsce z wynikiem
## 3. Reverse PROXY (Nginx)
* Dockerfile
* default.conf
    * upstream backend 4000
    * upstream frontend 3000
    * /api/*  =>  backend
    * /*     =>  frontend
    * port 80
## 4. Konteneryzacja
* docker-compose
    * postgres
    * redis
    * Dockerfile (backend)
        * volumes
    * Dockerfile (frontend)
        * volumes
    * Dockerfile (nginx)

