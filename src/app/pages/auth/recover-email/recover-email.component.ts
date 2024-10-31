import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-recover-email',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recover-email.component.html',
  styleUrl: './recover-email.component.css'
})
export class RecoverEmailComponent {
  //INJECCION DE HERRAMIENTAS
  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);

  formRecover = this.toolsForm.group({
    'correo': ['', [Validators.required, Validators.email]]
  })

  recover() {
    if (this.formRecover.invalid) {
      this.notifycation.error('Debes completar el campo', 'Error');
      return;
    }
    
    this.authService.recover({
      correo: this.formRecover.get('correo')?.value ?? '',
    }).subscribe({
      next: (value: any) => {
        console.log(value),
        this.notifycation.success(`${value.message}`, 'Éxito')
        this.formRecover.reset();
        this.router.navigateByUrl('/auth/recover/code');
      },
      error: (err) => {
        if (err.status === 404) {
          this.notifycation.error('Correo no encontrado.', 'Error',);
        }
        else {
          this.notifycation.error(err.message, 'Error',)
        }
      }
    })
  }

}
