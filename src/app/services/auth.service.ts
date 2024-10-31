import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

interface DataLogin {
    correo: string,
    contrasena: string
}

interface DataRegister {
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    telefono: string,
    correo: string,
    contrasena: string
}

interface DataRecover {
    correo: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private httpService = inject(HttpClient)
    private auth_end_point = 'http://localhost:3000'

    constructor() { }
    
    login(data: DataLogin) {
      return this.httpService.post(this.auth_end_point+'/routes_person/login_person', {...data});
    }
  
    register(data: DataRegister) {
        return this.httpService.post(this.auth_end_point+'/routes_person/register_person', {...data})
    }

    recover(data: DataRecover) {
        return this.httpService.post(this.auth_end_point+'/routes_person/recover_password', {...data})
    }
}