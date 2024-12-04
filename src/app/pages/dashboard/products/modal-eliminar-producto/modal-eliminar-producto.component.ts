import { Component, ElementRef, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-eliminar-producto',
  standalone: true,
  imports: [],
  templateUrl: './modal-eliminar-producto.component.html',
  styleUrl: './modal-eliminar-producto.component.css'
})
export class ModalEliminarProductoComponent {
	@Input() productId!: number;  // ID del producto a eliminar
  @Output() productDeleted = new EventEmitter<void>();

  private productService = inject(ProductService);
  private notifycation = inject(ToastrService);
  
  private modalService = inject(NgbModal);
  @ViewChild('modalEliminar') modalEliminar!: TemplateRef<ElementRef>;
  openModal() {
    this.modalService.open(this.modalEliminar, { centered: true });}

  deleteProduct() {
    if (this.productId) {
      this.productService.deleteProduct(this.productId.toString()).subscribe({
        next: (value: any) => {
          this.notifycation.success(`${value.nombre} eliminado con éxito.`, 'Éxito');
          this.productDeleted.emit();
          this.modalService.dismissAll();
        },
        error: (error: Error) => {
          this.notifycation.error(error.message, 'Error');
        }
      });
    } else {
      this.notifycation.error('ID de producto no válido', 'Error');
    }
  }

}
