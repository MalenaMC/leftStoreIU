import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-modal-crear-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-crear-producto.component.html',
  styleUrl: './modal-crear-producto.component.css'
})
export class ModalCrearProductoComponent {
	// modal
	private modalService = inject(NgbModal);
	@ViewChild('modalCrear') modalCrear!: TemplateRef<ElementRef>;
	openModal() {
		this.modalService.open(this.modalCrear, { centered: true });
	}

	//INYECCION
	private toolsForm = inject(FormBuilder);
	private notifycation = inject(ToastrService);
	private productService = inject(ProductService);
	private router = inject(Router);

	formCreateProduct = this.toolsForm.group({
		'nombre': ['', [Validators.required]],
		'categoria': ['', [Validators.required]],
		'proveedor': ['', [Validators.required]],
		'modelo': ['', [Validators.required]],
		'precio': ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
		'descripcion': ['', [Validators.required]],
		'imagen': ['', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png|gif)$/i)]],
	})

	createProduct() {
		if (this.formCreateProduct.invalid) {
			this.notifycation.error('Debes completar todos los campos correctamente', 'Error');
			return;
		  }
		  this.productService.createProduct({
			nombre: this.formCreateProduct.get('nombre')?.value ?? '',
			categoriaId: this.formCreateProduct.get('categoria')?.value ?? '',
			proveedorId: this.formCreateProduct.get('proveedor')?.value ?? '',
			precio: Number(this.formCreateProduct.get('precio')?.value) ?? 0,
			modelo: this.formCreateProduct.get('modelo')?.value ?? '',
			descripcion: this.formCreateProduct.get('descripcion')?.value ?? '',
			img: this.formCreateProduct.get('imagen')?.value ?? '',
			estado: true //POR DEFECTO "true"
		}).subscribe({
			next: (value: any) => {
				this.notifycation.success(`${value.nombre}.`, 'Éxito')
				this.formCreateProduct.reset();
			  },
			  error: (error: Error) => {
				  this.notifycation.error(error.message, 'Error');
			  }
		})
	}

}
