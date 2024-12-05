import { Component, inject } from '@angular/core';
import { DashboardSubtitleComponent } from '../../../../components/dashboard/shared-components/dashboard-subtitle/dashboard-subtitle.component';
import { DataProductAll, ProductService } from '../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaleService } from '../../../../services/sale.service';

@Component({
  selector: 'app-direct',
  standalone: true,
  imports: [DashboardSubtitleComponent, ReactiveFormsModule],
  templateUrl: './direct.component.html',
  styleUrl: './direct.component.css'
})
export class DirectComponent {
  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
	private productService = inject(ProductService);
  private saleService = inject(SaleService);

  terminoBusqueda: string = '';

  //VALOR DEL ID DE LA SESION
  personaID: number = 1;
  //VALOR POR DEFECTO EN VENTA DIRECTA
  tipo_venta: number = 1;
  //VALOR POR DEFECTO EN VENTA DIRECTA
  estadoID: number = 2;

  idVenta: number | null = null; // ID de la venta

  formDisabled = true;

  ngOnInit() {
    this.loadProducts();
  }

  formCreateSaleDetail = this.toolsForm.group({
    'producto': ['', [Validators.required]],
    'cantidad': ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
	})

  openForm() {
    this.createSale(); // Crear la venta primero
  }

  // Crear la venta
  createSale() {
    this.saleService.createSale({
      personaID: this.personaID,
      tipo_venta: this.tipo_venta,
      estadoID: this.estadoID
    }).subscribe({
      next: (value: any) => {
        this.notifycation.success(`${value.message}.`, 'Éxito');
        this.idVenta = value.id; // Guardar el ID de la venta creada
        this.formDisabled = false; // Habilitar el formulario de detalles
      },
      error: (error: any) => {
        this.notifycation.error(error.message, 'Error');
      }
    });
  }

  createSaleDetail() {
    if (this.formCreateSaleDetail.invalid) {
      this.notifycation.error('Debes completar todos los campos correctamente', 'Error');
      return;
    }
    if (!this.idVenta) {
      this.notifycation.error('Primero debes crear la venta.', 'Error');
      return;
    }
      
    this.saleService.createSaleDetail({
        ventaID: this.idVenta,
        productoID: this.formCreateSaleDetail.get('producto')?.value ?? '',
        cantidad: Number(this.formCreateSaleDetail.get('cantidad')?.value) ?? 0
    }).subscribe({
      next: (value: any) => {
        this.notifycation.success(`Detalle de venta añadido con éxito.`, 'Éxito');
        this.formCreateSaleDetail.reset();
        this.formDisabled = true;
        },
        error: (error: Error) => {
          this.notifycation.error(error.message, 'Error');
        }
    })
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

  // Función que activa o desactiva el formulario
  activarFormulario() {
    this.formDisabled = !this.formDisabled; // Cambia el estado de disabled
  }
}
