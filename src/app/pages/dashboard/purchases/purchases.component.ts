import { Component, inject, ViewChild } from '@angular/core';
import { DashboardTitleComponent } from '../../../components/dashboard/shared-components/dashboard-title/dashboard-title.component';
import { TableComponent } from '../../../components/dashboard/table/table.component';
import { DataProvider, ProviderService } from '../../../services/provider.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataProductAll, ProductService } from '../../../services/product.service';
import { DataPurchaseAll, PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [ReactiveFormsModule, DashboardTitleComponent, TableComponent],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent {
  private toolsForm = inject(FormBuilder);
	private notifycation = inject(ToastrService);
	private purchaseService = inject(PurchaseService);
	private productService = inject(ProductService);
	private providerService = inject(ProviderService);

  // COLUMNAS DE LA TABLA
  columns = [
    'ID',
    'NOMBRE DEL PRODUCTO',
    'PROVEEDOR',
    'FECHA Y HORA',
    'DESCRIPCIÓN',
    'CANTIDAD',
    'PRECIO COMPRA/U',
    'SUBTOTAL',
    'IGV',
    'TOTAL'
  ];
  
  // MAPEO PARA COLUMNAS Y FILAS
  columnMappings = {
    'ID': 'id',
    'NOMBRE DEL PRODUCTO': 'nombre',
    'PROVEEDOR': 'proveedor',
    'FECHA Y HORA': 'fecha_hora',
    'DESCRIPCIÓN': 'descripcion',
    'CANTIDAD': 'cantidad',
    'PRECIO COMPRA/U': 'precio_unitario',
    'SUBTOTAL': 'subtotal',
    'IGV': 'igv',
    'TOTAL': 'total'
  };
  
  rows: DataPurchaseAll[] = [];
  
  @ViewChild('tablePurchases') tablePurchases?: TableComponent;
  
  ngOnInit() {
    this.loadPurchases();
    this.loadProviders();
    this.loadProducts();
  }

  //CARGAR PRODUCTOS
	productos: DataProductAll[] = []

	loadProducts() {
		this.productService.getAllProducts().subscribe({
		next: (productos) => {
			this.productos = productos;
			if (this.formCreatePurchase.get('producto')?.value) {
				this.formCreatePurchase.patchValue({
				  producto: this.formCreatePurchase.get('producto')?.value,
				});
			}
		},
		error: (error) => {
			this.notifycation.error('Error al cargar los productos', 'Error');
			console.error('Error al cargar los productos:', error);
		}
		});
	}



  //CARGAR PROVEEDORES
	proveedores: DataProvider[] = []

	loadProviders() {
		this.providerService.getAllProviders().subscribe({
		next: (proveedores) => {
			this.proveedores = proveedores;
			if (this.formCreatePurchase.get('proveedor')?.value) {
				this.formCreatePurchase.patchValue({
				  proveedor: this.formCreatePurchase.get('proveedor')?.value,
				});
			}
		},
		error: (error) => {
			this.notifycation.error('Error al cargar los proveedores', 'Error');
			console.error('Error al cargar los proveedores:', error);
		}
		});
	}



  formCreatePurchase = this.toolsForm.group({
    'producto': ['', [Validators.required]],
    'cantidad': ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    'precio_unitario': ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    'proveedor': ['', [Validators.required]],
    'descripcion': [''],
  })

  createPurchase() {
    if (this.formCreatePurchase.invalid) {
      this.notifycation.error('Debes completar todos los campos correctamente', 'Error');
      return;
      }
      console.log(this.formCreatePurchase.getRawValue())
      this.purchaseService.createPurchase({
      productoId: this.formCreatePurchase.get('producto')?.value ?? '',
      cantidad: Number(this.formCreatePurchase.get('cantidad')?.value) ?? 0,
      precio_unitario: Number(this.formCreatePurchase.get('precio_unitario')?.value) ?? 0,
      proveedorId: this.formCreatePurchase.get('proveedor')?.value ?? '',
      descripcion: this.formCreatePurchase.get('descripcion')?.value ?? '',
    }).subscribe({
      next: (value: any) => {
        this.loadPurchases();
        this.notifycation.success(`Compra #${value.id} añadida con éxito.`, 'Éxito')
        this.formCreatePurchase.reset();
        },
        error: (error: Error) => {
          this.notifycation.error(error.message, 'Error');
        }
    })
  }

  loadPurchases() {
    this.purchaseService.getAllPurchases().subscribe({
      next: (purchases) => {
        this.rows = purchases.map((purchase: any): DataPurchaseAll => ({
          id: purchase.id,
          nombre: purchase.producto.nombre,
          proveedor: purchase.proveedor.proveedor,
          fecha_hora: purchase.fecha_hora,
          descripcion: purchase.descripcion || 'Sin descripcion',
          cantidad: purchase.cantidad,
          precio_unitario: purchase.precio_unitario,
          subtotal: purchase.subtotal,
          igv: purchase.igv,
          total: purchase.total,
        }));
        if (this.tablePurchases) {
          this.tablePurchases.updateTable();
        }
      },
      error: (error) => {
        console.error('Error al cargar compras: ', error);
      }
    });
  }

  applyFilter(event: Event) {
    if (this.tablePurchases) {
      this.tablePurchases.filterValue = (
        event.target as HTMLInputElement
      ).value;
      this.tablePurchases.updateTable();
    }
  }
}
