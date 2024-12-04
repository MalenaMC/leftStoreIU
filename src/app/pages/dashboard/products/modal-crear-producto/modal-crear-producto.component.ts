import { Component, ElementRef, inject, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../services/product.service';
import { CategoryService, DataCategory } from '../../../../services/category.service';
import { DataProvider, ProviderService } from '../../../../services/provider.service';

@Component({
  selector: 'app-modal-crear-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-crear-producto.component.html',
  styleUrl: './modal-crear-producto.component.css'
})
export class ModalCrearProductoComponent {
	//Actualizar tabla
	@Output() productCreated = new EventEmitter<void>();

	// modal
	private modalService = inject(NgbModal);
	@ViewChild('modalCrear') modalCrear!: TemplateRef<ElementRef>;
	openModal() {
		this.modalService.open(this.modalCrear, { centered: true });
		this.loadCategories();
	}

	//INYECCION
	private toolsForm = inject(FormBuilder);
	private notifycation = inject(ToastrService);
	private productService = inject(ProductService);
	private categoryService = inject(CategoryService);
	private providerService = inject(ProviderService);

	//CARGAR CATEGORIAS EN EL MODAL
	categorias: DataCategory[] = []

	loadCategories() {
		this.categoryService.getAllCategories().subscribe({
		next: (categorias) => {
			this.categorias = categorias;
			if (this.formCreateProduct.get('categoria')?.value) {
				this.formCreateProduct.patchValue({
				  categoria: this.formCreateProduct.get('categoria')?.value,
				});
			}
		},
		error: (error) => {
			this.notifycation.error('Error al cargar las categorías', 'Error');
			console.error('Error al cargar las categorías:', error);
		}
		});
	}

	formCreateProduct = this.toolsForm.group({
		'nombre': ['', [Validators.required]],
		'categoria': ['', [Validators.required]],
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
			precio: Number(this.formCreateProduct.get('precio')?.value) ?? 0,
			modelo: this.formCreateProduct.get('modelo')?.value ?? '',
			descripcion: this.formCreateProduct.get('descripcion')?.value ?? '',
			img: this.formCreateProduct.get('imagen')?.value ?? '',
			estado: true //POR DEFECTO "true"
		}).subscribe({
			next: (value: any) => {
				this.notifycation.success(`${value.nombre}.`, 'Éxito')
				this.productCreated.emit();
				this.modalService.dismissAll();
				this.formCreateProduct.reset();
			  },
			  error: (error: Error) => {
				  this.notifycation.error(error.message, 'Error');
			  }
		})
	}

}
