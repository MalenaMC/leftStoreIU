import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-recover-code',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recover-code.component.html',
  styleUrl: './recover-code.component.css'
})
export class RecoverCodeComponent {
  //INJECCION DE HERRAMIENTAS
  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  formVerifyCode = this.toolsForm.group({
    'codigo':['', Validators.required]
  });

  valorToken: string = '';

  ngOnInit() {
    this.valorToken = this.route.snapshot.queryParamMap.get('token') || '';
    
    if(!this.valorToken) {
      this.notifycation.error('Tóken inválido', 'Error');
      this.router.navigate(['auth/recover/email']);
    }
  }

  verifyCode() {
    if (this.formVerifyCode.invalid) {
      this.notifycation.error('Debe completar el campo', 'Error');
      return;
    }

    this.authService.verifyRecoveryCode({
      valorToken: this.valorToken,
      codigo: this.formVerifyCode.get('codigo')?.value ?? ''
    }).subscribe({
      next: (value: any) => {
        this.notifycation.success(value.message, 'Éxito');
        this.router.navigate(['/auth/recover/password'], {queryParams: { token: value.cambioContrasenaToken }})
      },
      error: (error: Error) => {
        this.notifycation.error(error.message, 'Error');
      }
    })
  }

}
