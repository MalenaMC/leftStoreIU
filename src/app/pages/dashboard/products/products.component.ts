import { Component, inject, ViewChild } from '@angular/core';
import { TableComponent } from '../../../components/dashboard/table/table.component';
import { ProductService, DataProductAll } from '../../../services/product.service';
import { ModalCrearProductoComponent } from "./modal-crear-producto/modal-crear-producto.component";
import { DashboardTitleComponent } from '../../../components/dashboard/shared-components/dashboard-title/dashboard-title.component';
import { ModalEditarProductoComponent } from './modal-editar-producto/modal-editar-producto.component';
import { ModalEliminarProductoComponent } from "./modal-eliminar-producto/modal-eliminar-producto.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, ModalCrearProductoComponent, ModalEditarProductoComponent, DashboardTitleComponent, ModalEliminarProductoComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private productService = inject(ProductService);

  // COLUMNAS DE LA TABLA
  columns = [
    'ID',
    'CÓDIGO',
    'NOMBRE DEL PRODUCTO',
    'CATEGORÍA',
    'MODELO',
    'PRECIO',
    'DESCRIPCIÓN',
    'IMAGEN',
    'ESTADO'
  ];
  
  // MAPEO PARA COLUMNAS Y FILAS
  columnMappings = {
    'ID': 'id',
    'CÓDIGO': 'codigo',
    'NOMBRE DEL PRODUCTO': 'nombre',
    'CATEGORÍA': 'categoria',
    'MODELO': 'modelo',
    'PRECIO': 'precio',
    'DESCRIPCIÓN': 'descripcion',
    'IMAGEN': 'img',
    'ESTADO': 'estado'
  };

  rows: DataProductAll[] = [];

  @ViewChild('tableProducts') tableProducts?: TableComponent;

  ngOnInit() {
    this.loadProducts();
  }

  @ViewChild('modalEditar') modalEditar!: ModalEditarProductoComponent;

  openModalEditar(row: any) {
    if (row && row.id && !isNaN(row.id)) {
      this.modalEditar.productId = Number(row.id);
      this.modalEditar.openModal();
    } else {
      console.error('ID de producto inválido:', row.id);
    }
  }

  @ViewChild('modalEliminar') modalEliminar!: ModalEliminarProductoComponent;
  openModalEliminar(row: any) {
    if (row && row.id && !isNaN(row.id)) {
      this.modalEliminar.productId = Number(row.id);
      this.modalEliminar.openModal();
    } else {
      console.error('ID de producto inválido:', row.id);
    }
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.rows = products.map((product: any): DataProductAll => ({
          id: product.id,
          codigo: product.codigo,
          nombre: product.nombre,
          categoria: product.categoria?.descripcion || 'Sin categoría',
          modelo: product.modelo,
          precio: product.precio,
          descripcion: product.descripcion,
          img: product.img,
          estado: product.estado,
        }));
        if (this.tableProducts) {
          this.tableProducts.updateTable();
        }
      },
      error: (error) => {
        console.error('Error al cargar productos: ', error);
      }
    });
  }

  applyFilter(event: Event) {
    if (this.tableProducts) {
      this.tableProducts.filterValue = (
        event.target as HTMLInputElement
      ).value;
      this.tableProducts.updateTable();
    }
  }

  onProductCreatedOrEditedOrDeleted() {
    this.loadProducts();
  }

}

