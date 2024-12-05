import { Component, ElementRef, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService, DataCategory } from '../../../../services/category.service';
import { DataProvider, ProviderService } from '../../../../services/provider.service';
import { DataProduct, ProductService } from '../../../../services/product.service';
import { dataEstado } from '../../../../utility/estados.type';

@Component({
  selector: 'app-modal-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-editar-producto.component.html',
  styleUrl: './modal-editar-producto.component.css'
})

export class ModalEditarProductoComponent {
	@Input() productId!: number;  // ID del producto a editar
  @Output() productUpdated = new EventEmitter<void>();

  // modal
  private modalService = inject(NgbModal);
  @ViewChild('modalEditar') modalEditar!: TemplateRef<ElementRef>;
  openModal() {
    this.modalService.open(this.modalEditar, { centered: true });
    this.loadProductDetails();
    this.loadCategories();
  }

  //INYECCION
  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private productService = inject(ProductService);
	private categoryService = inject(CategoryService);
  
  formEditProduct = this.toolsForm.group({
    'nombre': ['', [Validators.required]],
		'estado': [false, [Validators.required]],
		'categoria': ['', [Validators.required]],
		'modelo': ['', [Validators.required]],
		'precio': [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
		'descripcion': ['', [Validators.required]],
		'imagen': [''],
	})

  loadProductDetails() {
    if (this.productId && !isNaN(this.productId)) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          console.log('Detalles del producto:', product); // Agregar este log
          this.formEditProduct.patchValue({
            nombre: product.nombre,
            estado: this.convertToBoolean(product.estado),
            categoria: product.categoriaId,
            modelo: product.modelo,
            precio: product.precio,
            descripcion: product.descripcion
          });
        },
        error: (error) => {
          this.notifycation.error('Error al cargar los detalles del producto', 'Error');
          console.error('Error al cargar los detalles del producto:', error);
        }
      });
    } else {
    console.error('ID de producto inválido:', this.productId);
    this.notifycation.error('ID de producto inválido', 'Error');
    }
  }

  updateProduct() {
    if (this.formEditProduct.valid && this.productId) {
      const updatedProduct: DataProduct = {
        nombre: this.formEditProduct.get('nombre')?.value ?? '',
        categoriaId: this.formEditProduct.get('categoria')?.value ?? '',
        precio: Number(this.formEditProduct.get('precio')?.value) ?? 0,
        modelo: this.formEditProduct.get('modelo')?.value ?? '',
        descripcion: this.formEditProduct.get('descripcion')?.value ?? '',
        img: this.formEditProduct.get('imagen')?.value ?? '',
        estado: this.convertToBoolean(this.formEditProduct.get('estado')?.value)      };
  
      console.log(this.formEditProduct.getRawValue());
      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: (value: any) => {
          this.notifycation.success(`${value.nombre} actualizado con éxito.`, 'Éxito');
          this.productUpdated.emit();
          this.modalService.dismissAll();
          this.formEditProduct.reset();
        },
        error: (error: Error) => {
          this.notifycation.error(error.message, 'Error');
        }
      });
    } else {
      this.notifycation.error('Debes completar todos los campos correctamente', 'Error');
    }
  }

  estados: dataEstado[] = [
    {
      id: 0,
      estado: 'ACTIVO',
      value: true
    },
    {
      id: 1,
      estado: 'INACTIVO',
      value: false
    }
  ]
  
  compareById(item1: any, item2: any): boolean {
    return item1 && item2 && item1.id === item2.id;
  }
    // Método para convertir el valor a booleano
  convertToBoolean(value: any): boolean {
    if (value === null || value === undefined || value === 'false') {
      return false; // O lo que desees como valor por defecto
    }
    if (typeof value === 'boolean') {
      return value;
    }
    return value === 'true'; // Si es una cadena, convertirla a booleano
  }

  //CARGAR CATEGORIAS EN EL MODAL
	categorias: DataCategory[] = []

	loadCategories() {
		this.categoryService.getAllCategories().subscribe({
		next: (categorias) => {
			this.categorias = categorias;
		},
		error: (error) => {
			this.notifycation.error('Error al cargar las categorías', 'Error');
			console.error('Error al cargar las categorías:', error);
		}
		});
	}

}