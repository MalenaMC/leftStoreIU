import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  //INJECCION DE HERRAMIENTAS
  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  formChangePassword = this.toolsForm.group({
    'contrasena': ['', [Validators.required, Validators.minLength(8)]],
    'confirmar_contrasena': ['', [Validators.required, Validators.minLength(8)]]
  });

  cambioContrasenaToken: string = '';

  ngOnInit() {
    this.cambioContrasenaToken = this.route.snapshot.queryParamMap.get('token') || '';
    
    if(!this.cambioContrasenaToken) {
      this.notifycation.error('Tóken inválido', 'Error');
      this.router.navigate(['auth/recover/email']);
    }
  }
  
  changePassword() {
    if (this.formChangePassword.invalid) {
      this.notifycation.error('Debes completar todos los campos correctamente', 'Error'); 
      return;
    }

    this.authService.changePassword({
      cambioContrasenaToken: this.cambioContrasenaToken,
      nuevaContrasena: this.formChangePassword.get('contrasena')?.value ?? ''
    }).subscribe({
      next: (value: any) => {
        this.notifycation.success(value.message, 'Éxito');
        this.router.navigate(['/auth/login'])
      },
      error: (error: Error) => {
        this.notifycation.error(error.message, 'Error');
      }
    })
  }
}
