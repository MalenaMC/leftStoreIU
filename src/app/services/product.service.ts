import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface DataProduct {
    id?: number;
	nombre: string;
    categoriaId: string;
    modelo: string;
	precio: number;
	descripcion: string;
    img: string;
    estado: boolean
}

export interface DataProductAll {
    id: number;
    codigo: string;
    nombre: string;
    categoria: string;
    modelo: string;
    precio: number;
    descripcion: string;
    img: string;
    estado: boolean;
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
    getProductById(id: number) {
        return this.httpService
          .get<DataProduct>(`${this.product_end_point}/routes_product/get_product/${id}`)
          .pipe(catchError(this.handleError));
      }

    // Actualizar un producto
    updateProduct(id: number, data: DataProduct) {
        return this.httpService
        .put(`${this.product_end_point}/routes_product/update/${id}`, { ...data })
        .pipe(catchError(this.handleError));
    }

    // Eliminar un producto
    deleteProduct(id: string) {
        return this.httpService
            .delete(`${this.product_end_point}/routes_product/delete/${id}`)
            .pipe(catchError(this.handleError));
    }
}