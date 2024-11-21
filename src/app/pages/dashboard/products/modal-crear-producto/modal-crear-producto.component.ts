import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal-crear-producto',
  standalone: true,
  imports: [],
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

}
