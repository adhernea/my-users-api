# MY USERS API
This API is only used for learning purposes.

A lightweight and modular backend designed for learning JWT authentication integration with **Flutter** applications.

## 🛠️ Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **Base de Datos:** SQLite (`better-sqlite3`)
- **Seguridad:** JWT (`jsonwebtoken`) + Hashing (`bcrypt`)

---

## 🏛️ 3-Layer Architecture

```text
Request ──> Controller ──> Service ──> Repository ──> SQLite Database
```
- Repository (src/repositories/): Executes pure SQL queries.
- Service (src/services/): Handles business logic, password hashing, and token generation.
- Controller (src/controllers/): Manages HTTP requests and responses (req, res).

---

## Quick Start

### 1. Installation

> npm install

### 2. Environment Variables
Create a .env file in the root directory with the following content:
```text
PORT=8888
JWT_SECRET=your_development_secret_key
```

### 3. Run Server

The server will run at: http://localhost:8888 when executing:

```text
npm run dev
```

### 4. Code Quality (ESLint)

Checks for formatting issues (such as missing semicolons)
> npm run lint

Automatically fixes formatting issues
> npm run lint:fix

---

## API Endpoints

- POST  /register            - Registers a new user
- POST  /login               - Authenticates a user and returns a JWT token
- GET   /check-token         - Verifies if the token is still valid
- GET   /welcome             - Returns a personalized message with the user's name

More info in spanish --> [here!](./docs/endpoints_api.md) <--

---

## Arquitectura de Gestión de Errores

El proyecto utiliza una estrategia **centralizada y basada en excepciones** para garantizar que todas las respuestas de error sean consistentes en formato JSON y sigan la especificación HTTP correspondiente.

### Jerarquía de Excepciones Custom (`AppError`)

Todos los errores conocidos del dominio extienden de una clase base `AppError` que encapsula el código de estado HTTP (`statusCode`) y el mensaje descriptivo.

* `BadRequestError` (`400`): Validación de campos obligatorios u opcionales.
* `UnauthorizedError` (`401`): Token no enviado, caducado o firma no válida.
* `NotFoundError` (`404`): Recurso o usuario no encontrado en la base de datos.
* `ConflictError` (`409`): Duplicación de datos (email existente) o credenciales incorrectas.

### Formato Unificado de Respuesta JSON

Independientemente de la ruta o el tipo de fallo, la API responde siempre con la estructura:

```json
{
  "message": "Mensaje descriptivo del error."
}
```

### Middlewares Globales

1. **`notFoundHandler`**: Captura cualquier petición a un endpoint no registrado (ej. `GET /ruta-inexistente`) y la redirige al manejador global lanzando un `NotFoundError (404)` en lugar de devolver la página HTML por defecto de Express.
2. **`errorHandler`**: Registrado como último middleware en `app.ts` con la firma de 4 parámetros `(err, req, res, next)`. Captura todas las excepciones propagadas por `next(error)` en los controladores y estructura la respuesta JSON adecuada.

---


> For more information, don't contact me and remove your chestnuts from the fire.