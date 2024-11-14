import { Component, ViewChild } from '@angular/core';
import { TableComponent } from '../../../components/dashboard/table/table.component';
import { ISeccion } from '../../../utility/secciones.type';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  // COLUMNAS DE LA TABLA
  columns = [
    'NRO',
    'IMAGEN',
    'CÓDIGO',
    'NOMBRE DEL PRODUCTO',
    'CATEGORÍA',
    'MODELO',
    'PRECIO',
    'DESCRIPCION',
    'ESTADO',
    'PROVEEDOR'
  ];

  // MAPEO PARA COLUMNAS Y FILAS
  columnMappings = {
    NRO: 'nro',
    IMAGEN: 'img',
    CÓDIGO: 'codigo',
    'NOMBRE DEL PRODUCTO': 'nombre',
    CATEGORÍA: 'categoria',
    MODELO: 'modelo',
    PRECIO: 'precio',
    DESCRIPCIÓN: 'descripcion',
    ESTADO: 'estado',
    PROVEEDOR: ''
  };

  rows = ListaProductos;

  @ViewChild('tableProducts') tableProducts?: TableComponent;

  applyFilter(event: Event) {
		if (this.tableProducts) {
			this.tableProducts.filterValue = (
				event.target as HTMLInputElement
			).value;
			this.tableProducts.updateTable();
		}
	}

}

export interface Product {
	nro: string;
	codigo: string;
	seccion: string;
	nombre: string;
	precio: string;
	promo: string;
	estado: boolean;
}

const ListaProductos: Product[] = [
	{
		nro: '1',
		codigo: '6958444750989',
		seccion: 'ACCESORIOS DE LAPTOPS',
		nombre: 'UWU ...',
		precio: '60.00',
		promo: 'S/D',
		estado: true,
	},
	{
		nro: '2',
		codigo: '6958444751234',
		seccion: 'ACCESORIOS GENERAL',
		nombre: 'ADAPTADOR M2 - SATA',
		precio: '60.00',
		promo: 'S/D',
		estado: true,
	},
	{
		nro: '3',
		codigo: '6958444753214',
		seccion: 'ADAPTADORES',
		nombre: 'ADAPTADOR M1 - SATA',
		precio: '60.00',
		promo: '10.00',
		estado: false,
	},
	{
		nro: '4',
		codigo: '6958444759632',
		seccion: 'AUDIFONOS GAMER',
		nombre: 'ARGOM TECH CAM20',
		precio: '60.00',
		promo: '2.00',
		estado: false,
	},
	{
		nro: '5',
		codigo: '6958444759632',
		seccion: 'AUDIFONOS GAMER',
		nombre: 'ARGOM TECH CAM20',
		precio: '60.00',
		promo: '2.00',
		estado: true,
	},
	{
		nro: '6',
		codigo: '6958444759632',
		seccion: 'AUDIFONOS GAMER',
		nombre: 'ARGOM TECH CAM20',
		precio: '60.00',
		promo: '2.00',
		estado: false,
	},
	{
		nro: '7',
		codigo: '6958444759632',
		seccion: 'AUDIFONOS GAMER',
		nombre: 'ARGOM TECH CAM20',
		precio: '60.00',
		promo: '2.00',
		estado: true,
	},
	{
		nro: '8',
		codigo: '6958444759632',
		seccion: 'AUDIFONOS GAMER',
		nombre: 'ARGOM TECH CAM20',
		precio: '60.00',
		promo: '2.00',
		estado: true,
	},
	{
		nro: '9',
		codigo: '6958444759632',
		seccion: 'AUDIFONOS GAMER',
		nombre: 'ARGOM TECH CAM20',
		precio: '60.00',
		promo: '2.00',
		estado: false,
	},
	{
		nro: '10',
		codigo: '6958444759632',
		seccion: 'AUDIFONOS GAMER',
		nombre: 'ARGOM TECH CAM20',
		precio: '60.00',
		promo: '2.00',
		estado: true,
	},
];

