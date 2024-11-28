import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface DataProduct {
	nombre: string;
    categoriaId: string;
    proveedorId: string;
    modelo: string;
	precio: number;
	descripcion: string;
    img: string;
    estado: boolean
}

export interface DataProductAll {
    codigo: string,
    nombre: string;
    categoriaId: string;
    proveedorId: string;
    modelo: string;
	precio: number;
	descripcion: string;
    img: string;
    estado: boolean
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
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
    createProduct(data: DataProduct) {
        return this.httpService
            .post(this.product_end_point + '/routes_product/register', { ...data })
            .pipe(catchError(this.handleError));
    }

    // Obtener todos los productos
    getAllProducts() {
        return this.httpService
            .get<DataProductAll[]>(this.product_end_point + '/routes_product/get_all_products')
            .pipe(catchError(this.handleError));
    }

    // Obtener un producto por su código
    getProductByCode(codigo: string) {
        return this.httpService
            .get<DataProduct>(this.product_end_point + `/routes_product/get_product/${codigo}`)
            .pipe(catchError(this.handleError));
    }

    // Actualizar un producto
    updateProduct(codigo: string, data: Partial<DataProduct>) {
        return this.httpService
            .put(this.product_end_point + `/routes_product/update_product/${codigo}`, { ...data })
            .pipe(catchError(this.handleError));
    }

    // Eliminar un producto
    deleteProduct(codigo: string) {
        return this.httpService
            .delete(this.product_end_point + `/routes_product/delete_product/${codigo}`)
            .pipe(catchError(this.handleError));
    }
}