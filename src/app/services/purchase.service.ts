import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface DataPurchase {
    productoId: string;
    proveedorId: string;
    cantidad: number;
	precio_unitario: number;
    descripcion: string;
}

export interface DataPurchaseAll {
    id?: number;
	nombre: string;
    proveedor: string;
    fecha_hora: Date;
    cantidad: number;
    precio_unitario: number;
	subtotal: number;
	igv: number;
    total: number;
    descripcion: string;
}

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    private httpService = inject(HttpClient)
    private product_end_point = 'http://localhost:3000'

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
                case "PROVIDER_NOT_FOUND":
                    errorMessage = error.error.error; // "Producto no encontrado"
                    break;
                case "INVALID_DATA":
                    errorMessage = error.error.error; // "Datos no válidos"
                    break;
                case "PRODUCT_HAS_PURCHASES":
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
    createPurchase(data: DataPurchase) {
        return this.httpService
            .post(this.product_end_point + '/routes_compra/register', { ...data })
            .pipe(catchError(this.handleError));
    }

    // Obtener todos los productos
    getAllPurchases() {
        return this.httpService
            .get<DataPurchaseAll[]>(this.product_end_point + '/routes_compra/get_all_purchases')
            .pipe(catchError(this.handleError));
    }
}