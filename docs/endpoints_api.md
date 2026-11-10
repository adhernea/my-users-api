# 📌 API Endpoints Specification

Documentación detallada de los contratos de entrada y salida para la integración del cliente con el backend de Autenticación.

---

## 📋 Tabla Resumen de Endpoints

| Método | Endpoint | Autenticación | Status HTTP | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | `201`, `400`, `409`, `500` | Registra un nuevo usuario |
| `POST` | `/login` | Public | `200`, `400`, `409`, `500` | Autentica un usuario y genera el JWT |
| `GET` | `/check-token` | Bearer Token | `200`, `401` | Verifica la validez del token JWT |
| `GET` | `/welcome` | Bearer Token | `200`, `401`, `404` | Obtiene el mensaje de bienvenida |

---

## 📖 Especificación Detallada

### 1. Registrar Usuario (`POST /register`)

- **Headers:**
  - `Content-Type: application/json`

- **Request Body (JSON):**
  ```json
  {
    "fullName": "Alumno Clase",
    "email": "alumno@clase.dev",
    "pwd": "Password123!"
  }
  ```

- **Respuestas (Response):**
  - **`201 Created`** (Éxito):
    ```json
    {
      "message": "Usuario registrado con éxito."
    }
    ```
  - **`400 Bad Request`** (Campos faltantes):
    ```json
    {
      "message": "Todos los campos son obligatorios."
    }
    ```
  - **`409 Conflict`** (Email duplicado):
    ```json
    {
      "message": "Este correo electrónico ya está registrado."
    }
    ```
  - **`500 Internal Server Error`**:
    ```json
    {
      "message": "Error interno del servidor. Disculpe las molestias."
    }
    ```

---

### 2. Iniciar Sesión (`POST /login`)

- **Headers:**
  - `Content-Type: application/json`

- **Request Body (JSON):**
  ```json
  {
    "email": "alumno@clase.dev",
    "pwd": "Password123!"
  }
  ```

- **Respuestas (Response):**
  - **`200 Ok`** (Éxito):
    ```json
    {
      "message": "Inicio de sesión exitoso.",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "fullName": "Alumno Clase",
        "email": "alumno@clase.dev"
      }
    }
    ```
  - **`400 Bad Request`** (Datos incompletos):
    ```json
    {
      "message": "Email y contraseña requeridos."
    }
    ```
  - **`409 Conflict`** (Credenciales erróneas):
    ```json
    {
      "message": "Credenciales de usuario incorrectas."
    }
    ```
  - **`500 Internal Server Error`**:
    ```json
    {
      "message": "Error interno del servidor. Disculpe las molestias."
    }
    ```

---

### 3. Verificar Token (`GET /check-token`)

- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

- **Request Body:**
  - *Ninguno (vacío)*

- **Respuestas (Response):**
  - **`200 OK`** (Token válido):
    ```json
    {
      "message": "Token válido del usuario 1."
    }
    ```
  - **`401 Unauthorized`** (Token ausente o inválido):
    ```json
    {
      "message": "No tiene permisos para esta petición."
    }
    ```

---

### 4. Mensaje de Bienvenida (`GET /welcome`)

- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

- **Request Body:**
  - *Ninguno (vacío)*

- **Respuestas (Response):**
  - **`200 OK`** (Éxito):
    ```json
    {
      "message": "¡Bienvenido a la aplicación, Alumno Clase!"
    }
    ```
  - **`401 Unauthorized`** (Sin autorización):
    ```json
    {
      "message": "No tiene permisos para esta petición."
    }
    ```
  - **`404 Not Found`** (Usuario eliminado de la BD):
    ```json
    {
      "message": "Usuario no encontrado."
    }
    ```