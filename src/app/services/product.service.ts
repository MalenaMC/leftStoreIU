import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

export interface DataProduct {
	nro: string;
	codigo: string;
	seccion: string;
	nombre: string;
	precio: string;
	promo: string;
	estado: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private httpService = inject(HttpClient)
    private auth_end_point = 'http://localhost:3000'

    constructor() { }
  
    createProduct(data: DataProduct) {
        return this.httpService.post(this.auth_end_point+'/routes_product/register_person', {...data})
    }
}