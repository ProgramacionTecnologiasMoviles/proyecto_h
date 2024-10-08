# Dolar Fury

### Integrantes

- Joseph Felipe Grijalva Lozano
- Juan Daniel Gonzalez Gonzalez

## Como correr el proyecto

1. Copiar el `.env.example` en .env
2. Correr los siguientes comandos

```
$ docker composer build
$ docker composer up -d
$ docker exec -it backend-web-1 php artisan migrate
```

3. El servidor esta corriendo en el puerto 8000

   Para correr el resto de servicios se debe instalar las depencias y correr la app con el comando `npx expo start` y a su vez se debe agregar una variable de entorno donde se indiquie la ip del backend `EXPO_PUBLIC_BASE_IP` para el microservicio se debe instalar fastapi `pip install "fastapi[standard]" `y se ejecuta con el comando `uvicorn main:app --host 0.0.0.0 --port 3000`

## Modelo Relacional

El modelo consiste de 4 tablas, user, bank_account, matches y games, tanto las tablas de partidas como de la cuenta de banco estan relacionas con el usuario, en el caso de la cuenta de banco el usuario podra tener varias de estas, y de igual manera para las partidas, pero estas solo corresponden a un usuario, el proceso de autenticación para el usuario se realiza a partir de sanctum.

Algunas de las rutas se podran observar en la documentación siguiente:

## Rutas API

Rutas disponibles en la API, incluyendo los métodos HTTP soportados, parámetros esperados, y formatos de respuesta.

### User

- POST (Registrar usuario)

  URL : ` http://localhost:8000/api/users`

  Body:

  ```
   {
    "username": "juan",
    "fullname": "juan",
    "email": "juan@gmail.com",
    "password": "123",
    "age": 2,
    "national_id": "213",
    "credits": 2,
  }
  ```

  Retorna:

  ```
  {
    "message": "El Usuario ha sido creado exitosamente",
    "status": 200
  }
  ```
- GET (Obtener usuario actual)

  Necesita el token dado al realizar el login.

  URL : ` http://127.0.0.1:8000/api/users`

  Retorna:

  ```
  {
    "id": 1,
    "username": "juan",
    "fullname": "juan",
    "email": "juan@gmail.com",
    "national_id": "213",
    "age": 2,
    "bankaccount_id": null,
    "credits": 2,
    "created_at": "2024-09-01T21:24:29.000000Z",
    "updated_at": "2024-09-02T02:41:20.000000Z"
  }
  ```
- PUT (Actualiza el usuario)

  Necesita el token dado al realizar el login.

  URL : ` http://localhost:8000/api/users/{id}`

  ```
      {
        "username": "juan22",
        "fullname": "juan perez",
        "email": "juan@gmail.com",
        "password": 1234,
        "age": 2
      }
  ```

  Retorna:

  ```
    "El Usuario se ha actualizado exitosamente"
  ```
- DELETE ( Elimina usuario)

  Necesita el token dado al realizar el login.

  URL : ` http://localhost:8000/api/users/{id}`

  Retorna:

  ```
   "El Usuario se ha eliminado exitosamente"
  ```

### Cuenta de banco

Todas las peticiones necesitan el token dado al realizar el login.

- POST (Crear cuenta de banco)

  URL : ` http://localhost:8000/api/bank_accounts`

  Body:

  ```
   {
    "bank_name": "BBVA",
    "date_of_use": "2023-04-02",
    "account_number": "1231"
    }

  ```

  Retorna:

  ```
   "El Registro Bancario se ha agregado exitosamente"
  ```
- GET (Retorna cuentas de banco del usario)

  URL : ` http://localhost:8000/api/bank_accounts`

  Retorna:

  ```
   [
    {
        "id": 1,
        "bank_name": "BBVA",
        "date_of_use": "2023-04-02",
        "account_number": "1231",
        "created_at": "2024-09-02T03:22:11.000000Z",
        "updated_at": "2024-09-02T03:22:11.000000Z"
    }
  ]
  ```
- PUT (Actualiza cuenta de banco en especifico)

  URL : ` http://localhost:8000/api/bank_accounts/{id}`

  Body:

  ```
    {
    "bank_name": "BBVA2",
    "date_of_use": "2023-04-02",
    "account_number": "1231"
    }
  ```

  Retorna:

  ```
   "El Registro Bancario se ha actualizado exitosamente"
  ```
- DELETE (Elimina la cuenta de banco )

  URL : ` http://localhost:8000/api/bank_accounts/{id}`

  Retorna:

  ```
   "El Registro bancario se ha eliminado exitosamente"
  ```

### Game

- POST (Crea juego)

  URL : ` http://localhost:8000/api/Game`

  Body:

  ```
   {
    "name": "Flappy Bird",
    "description": "Fly over the pipes"
  }
  ```

  Retorna:

  ```
   [
        {
            "id": 1,
            "name": "Flappy Bird",
            "description": "Fly over the pipes",
            "created_at": "2024-09-01T21:25:37.000000Z",
            "updated_at": "2024-09-01T21:25:37.000000Z"
        }
    ]
  ```
- GET (Lista juegos)

  URL : ` http://localhost:8000/api/Game`

  Retorna:

  ```
   [
    {
        "id": 1,
        "name": "Flappy Bird",
        "description": "Fly over the pipes",
        "created_at": "2024-09-01T21:25:37.000000Z",
        "updated_at": "2024-09-01T21:25:37.000000Z"
    },
    {
        "id": 2,
        "name": "Flappy Bird",
        "description": "Fly over the pipes",
        "created_at": "2024-09-02T03:43:20.000000Z",
        "updated_at": "2024-09-02T03:43:20.000000Z"
    }
  ]
  ```
- DELETE (Eliminar juego)

  URL : ` http://localhost:8000/api/Game/{id}`

  Retorna:

  ```
  "El Registro del juego se ha eliminado exitosamente"
  ```
- PUT (Actualizar juego especifico)

  URL : ` http://localhost:8000/api/Game/{id}`

  Body:

  ```
    {
        "name": "Flappy Bird2",
        "description": "Fly over the pipes"
    }

  ```

  Retorna:

  ```
   "El Registro del juego se ha actualizado exitosamente"
  ```

### Match

- POST (Crea partida)

  URL : ` http://localhost:8000/api/match`

  Body:

  ```
   {
    "hostUser": 1,
    "guessUser": 3,
    "creditsbetted": 200,
    "game": 1
    }

  ```

  Retorna:

  El id del juego

  ```
   {
    "id": 5
    }
  ```
- GET (Lista partidas)

  URL : ` http://localhost:8000/api/match`

  Retorna:

  ```
   [
    {
        "id": 4,
        "hostUser": 1,
        "guessUser": 3,
        "creditsbetted": 2,
        "game": 1,
        "winner": null,
        "loser": null,
        "score": null,
        "created_at": "2024-09-01T21:27:23.000000Z",
        "updated_at": "2024-09-01T21:27:23.000000Z"
    },
    {
        "id": 5,
        "hostUser": 1,
        "guessUser": 3,
        "creditsbetted": 200,
        "game": 1,
        "winner": null,
        "loser": null,
        "score": null,
        "created_at": "2024-09-02T03:49:56.000000Z",
        "updated_at": "2024-09-02T03:49:56.000000Z"
    }
  ]
  ```
- DELETE (Elimina partida)

  URL : ` http://localhost:8000/api/match/{id}`

  Retorna:

  ```
  "El Registro de la partida se ha eliminado exitosamente"
  ```
- PUT (Actualizar partida especifica)

  URL : ` http://localhost:8000/api/match/{id}`

  Body:

  ```
    {
        "hostUser": 1,
        "guessUser": 3,
        "creditsbetted": 200,
        "game": 1,
        "winner": 1,
        "loser": 3,
        "score": "2-1"
    }

  ```

  Retorna:

  ```
    "El Registro de la partida se ha actualizado exitosamente"
  ```

### Algunos otros endpoints

- Obtener Leaderboard

  GET: ` http://localhost:8000/api/leaderboard`

  Retorna:

  ```
    [
    {
        "id": 1,
        "fullname": "juan perez",
        "credits": 2,
        "matches_won_count": 0
    },
    {
        "id": 3,
        "fullname": "juan",
        "credits": -2,
        "matches_won_count": 0
    },
    {
        "id": 4,
        "fullname": "juan",
        "credits": 0,
        "matches_won_count": 0
    }
    ]
  ```
