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

```text
npm run dev
The server will run at: http://localhost:8888
```

---


## API Endpoints

- POST  /register            - Registers a new user
- POST  /login               - Authenticates a user and returns a JWT token
- GET   /check-token         - Verifies if the token is still valid
- GET   /welcome             - Returns a personalized message with the user's name

More info in spanish --> [here!](./docs/endpoints_api.md) <--

---



## Testing with Bruno



Open the Bruno extension/app and select the project directory to load the preconfigured collection.



1. Environment: Select Local (baseUrl: http://localhost:8888).

2. Testing Order: 1. Register -> 2. Login -> 3. Check Token -> 4. Welcome.



---



## Code Quality (ESLint)



npm run lint      # Checks for formatting issues (such as missing semicolons)

npm run lint:fix  # Automatically fixes formatting issues




For more information, don't contact me and remove your chestnuts from the fire.