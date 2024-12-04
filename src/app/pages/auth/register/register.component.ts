import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //INJECCION DE HERRAMIENTAS
  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);

  formRegister = this.toolsForm.group({
    'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    'apellido_paterno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    'apellido_materno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    'telefono': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)]],
    'correo': ['', [Validators.required, Validators.email]],
    'contrasena': ['', [Validators.required, Validators.minLength(8)]],
    'confirmar_contrasena': ['', [Validators.required, Validators.minLength(8)]]
  });

  register() {
    if (this.formRegister.invalid) {
      this.notifycation.error('Debes completar todos los campos correctamente', 'Error'); 
      return;
    }
    this.authService.register({
      nombre: this.formRegister.get('nombre')?.value ?? '',
      apellido_paterno: this.formRegister.get('apellido_paterno')?.value ?? '',
      apellido_materno: this.formRegister.get('apellido_materno')?.value ?? '',
      telefono: this.formRegister.get('telefono')?.value ?? '',
      correo: this.formRegister.get('correo')?.value ?? '',
      contrasena: this.formRegister.get('contrasena')?.value ?? '',   
    }).subscribe({
      next: (value: any) => {
        this.notifycation.success(`${value.message}, ${value.nombre} ${value.apellido_paterno}, ahora, inicie sesión.`, 'Éxito');
        this.router.navigateByUrl('/auth/login');
        this.formRegister.reset({});
      },
      error: (error: Error) => {
        this.notifycation.error(error.message, 'Error');
      }
    })
  }
}
