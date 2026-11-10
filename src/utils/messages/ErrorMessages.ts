export class ErrorMessages {

    public static DEFAULT_UNAUTHORIZED: string = 'No tiene permisos para esta petición.';

    public static DEFAULT_CONFLICT: string = 'Existe un conflicto en esta petición.';
    public static EMAIL_CONFLICT: string = 'Este correo electrónico ya está registrado.';
    public static CREDENTIALS_CONFLICT: string = 'Credenciales de usuario incorrectas.';

    public static DEFAULT_BAD_REQUEST: string = 'Todos los campos son obligatorios.';
    public static BAD_REQUEST_LOGIN: string = 'Email y contraseña requeridos.';

    public static DEFAULT_NOT_FOUND: string = 'No se ha encontrado el recurso solicitado.';
    public static USER_NOT_FOUND: string = 'Usuario no encontrado.';

    public static INTERNAL_SERVER_ERROR: string = 'Error interno del servidor. Disculpe las molestias';
}