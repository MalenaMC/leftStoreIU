import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover-code',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recover-code.component.html',
  styleUrl: './recover-code.component.css'
})
export class RecoverCodeComponent {

}
