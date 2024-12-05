import { Component, inject } from '@angular/core';
import { DashboardSubtitleComponent } from '../../../../components/dashboard/shared-components/dashboard-subtitle/dashboard-subtitle.component';
import { DataProductAll, ProductService } from '../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-direct',
  standalone: true,
  imports: [DashboardSubtitleComponent],
  templateUrl: './direct.component.html',
  styleUrl: './direct.component.css'
})
export class DirectComponent {
  private notifycation = inject(ToastrService);
	private productService = inject(ProductService);

  terminoBusqueda: string = '';

  ngOnInit() {
    this.loadProducts();
  }

  //CARGAR PRODUCTOS
  productos: DataProductAll[] = []

  loadProducts() {
    this.productService.getAllProducts().subscribe({
    next: (productos) => {
      this.productos = productos;
    },
    error: (error) => {
      this.notifycation.error('Error al cargar los productos', 'Error');
      console.error('Error al cargar los productos:', error);
    }
    });
  }

  productosFiltrados = [...this.productos]

  buscarProducto() {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      producto.id.toString().includes(this.terminoBusqueda.toLowerCase())
    );
    if (this.terminoBusqueda === '') {
      console.log("vacio uwu")
    }
  }

  actualizarTerminoBusqueda(event: Event): void {
    this.terminoBusqueda = (event.target as HTMLInputElement).value;
  }
}
