import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface DataProvider {
    id: number;
    proveedor: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    private httpService = inject(HttpClient)
    private provider_end_point = 'http://localhost:3000'

    constructor() { }
  
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Error desconocido';

        if (error.error instanceof ErrorEvent) {
            // Error del cliente
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Error del servidor: usa el mensaje del backend o uno genérico
            switch (error.error.errorCode) {
                case "PRODUCT_NOT_FOUND":
                    errorMessage = error.error.error; // "Producto no encontrado"
                    break;
                case "INVALID_DATA":
                    errorMessage = error.error.error; // "Datos no válidos"
                    break;
                default:
                    errorMessage = error.error.error || 'Error interno del servidor.';
                    break;
            }
        }
        return throwError(() => new Error(errorMessage));
    }

    //Obtener proveedores
    getAllProviders(): Observable<DataProvider[]> {
        return this.httpService
          .get<DataProvider[]>(`${this.provider_end_point}/routes_provider/get_all_providers`)
          .pipe(catchError(this.handleError));
    }
}