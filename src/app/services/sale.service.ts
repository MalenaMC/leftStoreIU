import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface DataSale {
    personaID: number;
    tipo_venta:number;
    estadoID: number;
}

export interface DataSaleDetail {
    ventaID: number;
    productoID: string;
    cantidad: number;
}

@Injectable({
    providedIn: 'root'
})
export class SaleService {
    private httpService = inject(HttpClient)
    private sale_end_point = 'http://localhost:3000'

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

    // Crear producto
    createSale(data: DataSale) {
        return this.httpService
            .post(this.sale_end_point + '/routes_venta/register', { ...data })
            .pipe(catchError(this.handleError));
    }

    createSaleDetail(data: DataSaleDetail) {
        return this.httpService
            .post(this.sale_end_point + '/routes_detalle/register', { ...data })
            .pipe(catchError(this.handleError));

    }
}