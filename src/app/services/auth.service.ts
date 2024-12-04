import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface DataRegister {
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    telefono: string,
    correo: string,
    contrasena: string
}

type DataLogin = Pick<DataRegister, "correo" | "contrasena">

type DataRecover = Pick<DataRegister, "correo">

interface DataVerifyCode {
    valorToken: string,
    codigo: string
}

interface DataChangePassword {
    cambioContrasenaToken: string,
    nuevaContrasena: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private httpService = inject(HttpClient)
    private auth_end_point = 'http://localhost:3000'

    constructor() { }

    // Función para manejar errores
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Error desconocido';
    
        if (error.error instanceof ErrorEvent) {
            // Error del cliente
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Error del servidor: se usa el mensaje de error proporcionado por el backend
            switch (error.error.errorCode) {
                case "USER_NOT_FOUND":
                    errorMessage = error.error.error; // "Usuario no encontrado"
                    break;
                case "INVALID_TOKEN":
                    errorMessage = error.error.error; // "Código o token no válido"
                    break;
                case "TOKEN_EXPIRED":
                    errorMessage = error.error.error; // "El token ha expirado"
                    break;
                case "TOKEN_ALREADY_USED":
                    errorMessage = error.error.error; // "El token ya ha sido utilizado"
                    break;
                case "PASSWORD_INCORRECT":
                    errorMessage = error.error.error; // "Contraseña incorrecta. Verifica tus credenciales."
                    break;
                default:
                    // En caso de que no haya un código específico, usa el mensaje del backend o uno genérico
                    errorMessage = error.error.error || 'Error interno del servidor.';
                    break;
            }
        }
        return throwError(() => new Error(errorMessage));
    }
    
    register(data: DataRegister) {
        return this.httpService
        .post(this.auth_end_point+'/routes_person/register', {...data})
        .pipe(catchError(this.handleError));  
    }

    login(data: DataLogin) {
      return this.httpService
      .post(this.auth_end_point+'/routes_person/login', {...data})
      .pipe(catchError(this.handleError));
    }  
  
    recover(data: DataRecover) {
        return this.httpService.post(this.auth_end_point+'/routes_person/recover_password', {...data})
        .pipe(catchError(this.handleError));  
    }

    verifyRecoveryCode(data: DataVerifyCode) {
        return this.httpService.post(this.auth_end_point+'/routes_person/verify_recovery_code', {...data})
        .pipe(catchError(this.handleError));  
    }

    changePassword(data: DataChangePassword) {
        return this.httpService.post(this.auth_end_point+'/routes_person/change_password', {...data})
        .pipe(catchError(this.handleError));
    }
}