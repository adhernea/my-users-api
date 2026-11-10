export class SuccessfulMessages {

    public static USER_REGISTERED: string = 'Usuario registrado con éxito.';
    public static USER_LOGGED: string = 'Inicio de sesión exitoso.';

    public static buildValidToken(userId: number): string {
        return `Token válido del usuario ${userId}.`;
    }

    public static buildWelcome(username: string): string {
        return `¡Bienvenido a la aplicación, ${username}!`;
    }
}