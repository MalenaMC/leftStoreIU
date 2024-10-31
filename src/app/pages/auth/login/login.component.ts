import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //INJECCION DE HERRAMIENTAS
  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);

  formLogin = this.toolsForm.group({
    'correo': ['', [Validators.required, Validators.email]],
    'contrasena': ['', [Validators.required, Validators.minLength(8)]]
  })

  login() {
    if (this.formLogin.invalid) {
      this.notifycation.error('Debes completar todos los campos correctamente', 'Error');
      return;
    }
    this.authService.login({
      correo: this.formLogin.get('correo')?.value ?? '',
      contrasena: this.formLogin.get('contrasena')?.value ?? '',
    }).subscribe({
      next: (value: any) => {
        this.notifycation.success(`${value.message}, ${value.nombre} ${value.apellido_paterno}.`, 'Éxito')
        this.formLogin.reset();
        this.router.navigateByUrl('/dashboard/home');
      },
      error: (err) => {
        if (err.status === 404) {
          this.notifycation.error('Usuario no encontrado.', 'Error',);
        }
        else if (err.status === 403) {
          this.notifycation.error('Contraseña incorrecta. Verifique sus credenciales.', 'Error',);
        }
        else {
          this.notifycation.error(err.message, 'Error',);
        }
      }
    })
  }
}
