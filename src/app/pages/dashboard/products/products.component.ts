import { Component, inject, ViewChild } from '@angular/core';
import { TableComponent } from '../../../components/dashboard/table/table.component';
import { ProductService, DataProductAll } from '../../../services/product.service';
import { ModalCrearProductoComponent } from "./modal-crear-producto/modal-crear-producto.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, ModalCrearProductoComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
	private productService = inject(ProductService);

  // COLUMNAS DE LA TABLA
	columns = [
		'CÓDIGO',
		'NOMBRE DEL PRODUCTO',
		'CATEGORÍA',
		'PROVEEDOR',
		'MODELO',
		'PRECIO',
		'DESCRIPCIÓN',
		'IMAGEN',
		'ESTADO'
  	];
  
  // MAPEO PARA COLUMNAS Y FILAS
  	columnMappings = {
		'CÓDIGO': 'codigo',
		'NOMBRE DEL PRODUCTO': 'nombre',
		'CATEGORÍA': 'categoriaId', // Ahora se usa categoriaId en lugar de categoria
		'PROVEEDOR': 'proveedorId', // Se usa proveedorId en lugar de un campo vacío
		'MODELO': 'modelo',
		'PRECIO': 'precio',
		'DESCRIPCIÓN': 'descripcion',
		'IMAGEN': 'img',
		'ESTADO': 'estado'
  	};

  rows: DataProductAll[] = [];

  @ViewChild('tableProducts') tableProducts?: TableComponent;


  ngOnInit() {
    // Obtener los productos desde la API
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        // Mapea los productos obtenidos desde la base de datos
        this.rows = products.map((product, index) => ({
          nro: (index + 1).toString(),
          codigo: product.codigo,
          seccion: product.categoriaId, // Asumiendo que la categoría viene como ID
          nombre: product.nombre,
          precio: product.precio.toString(),
          promo: product.precio > 0 ? product.precio * 0.1 : '0', // Ejemplo de lógica para promo
          estado: product.estado,
        }));
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

}

//export interface Prodhuct {
//	nro: string;
//	codigo: string;
//	seccion: string;
//	nombre: string;
//	precio: string;
//	promo: string;
//	estado: boolean;
//}
//
//const ListaProductos: Prodhuct[] = [
//	{
//		nro: '1',
//		codigo: '6958444750989',
//		seccion: 'ACCESORIOS DE LAPTOPS',
//		nombre: 'UWU ...',
//		precio: '60.00',
//		promo: 'S/D',
//		estado: true,
//	},
//	{
//		nro: '2',
//		codigo: '6958444751234',
//		seccion: 'ACCESORIOS GENERAL',
//		nombre: 'ADAPTADOR M2 - SATA',
//		precio: '60.00',
//		promo: 'S/D',
//		estado: true,
//	},
//	{
//		nro: '3',
//		codigo: '6958444753214',
//		seccion: 'ADAPTADORES',
//		nombre: 'ADAPTADOR M1 - SATA',
//		precio: '60.00',
//		promo: '10.00',
//		estado: false,
//	},
//	{
//		nro: '4',
//		codigo: '6958444759632',
//		seccion: 'AUDIFONOS GAMER',
//		nombre: 'ARGOM TECH CAM20',
//		precio: '60.00',
//		promo: '2.00',
//		estado: false,
//	},
//	{
//		nro: '5',
//		codigo: '6958444759632',
//		seccion: 'AUDIFONOS GAMER',
//		nombre: 'ARGOM TECH CAM20',
//		precio: '60.00',
//		promo: '2.00',
//		estado: true,
//	},
//	{
//		nro: '6',
//		codigo: '6958444759632',
//		seccion: 'AUDIFONOS GAMER',
//		nombre: 'ARGOM TECH CAM20',
//		precio: '60.00',
//		promo: '2.00',
//		estado: false,
//	},
//	{
//		nro: '7',
//		codigo: '6958444759632',
//		seccion: 'AUDIFONOS GAMER',
//		nombre: 'ARGOM TECH CAM20',
//		precio: '60.00',
//		promo: '2.00',
//		estado: true,
//	},
//	{
//		nro: '8',
//		codigo: '6958444759632',
//		seccion: 'AUDIFONOS GAMER',
//		nombre: 'ARGOM TECH CAM20',
//		precio: '60.00',
//		promo: '2.00',
//		estado: true,
//	},
//	{
//		nro: '9',
//		codigo: '6958444759632',
//		seccion: 'AUDIFONOS GAMER',
//		nombre: 'ARGOM TECH CAM20',
//		precio: '60.00',
//		promo: '2.00',
//		estado: false,
//	},
//	{
//		nro: '10',
//		codigo: '6958444759632',
//		seccion: 'AUDIFONOS GAMER',
//		nombre: 'ARGOM TECH CAM20',
//		precio: '60.00',
//		promo: '2.00',
//		estado: true,
//	},
//];

