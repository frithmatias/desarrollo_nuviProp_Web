import { Detalles } from './detalles.model';

// Generated by https://quicktype.io

export class Avisos {
	constructor(
		public ok: boolean,
		public mensaje: string,
		public avisos: Aviso[],
		public total: number
		) { }
	}

export class Aviso {
		constructor(
		public imgs?: string[],
		public calle?: string,
		public altura?: number,
		public piso?: number,
		public depto?: string,
		public titulo?: string,
		public descripcion?: string,
		public precio?: number,
		public tipocambio?: string,
		public publicarprecio?: boolean,
		public aptocredito?: boolean,
		public codigopostal?: string,
		public activo?: boolean,

		public tipoinmueble?: Inmueble,
		public tipounidad?: Unidad,
		public tipooperacion?: Operacion,
		public localidad?: Localidad,
		public coords?: {
				lat?: string, 
			 	lng?: string
		},

		public usuario?: Usuario,
		public detalles?: Detalles,
		// el usuario se adjunta en el controlador de avisos en el backend,
		// lo obtiene el middleware auth cuando verifica el token
		// public inmobiliaria?: Inmobiliaria,
		public _id?: string,
		public __v?: number
	) {
		this.imgs = [];
	}
}
interface Localidad {
	nombre: string;
	id: string;
	_id: string;
}

interface Operacion {
	nombre: string;
	id: string;
	_id: string;
}
interface Inmueble {
	nombre: string;
	id: string;
	_id: string;
}
interface Unidad {
	nombre: string;
	id: string;
	_id: string;
}


interface Usuario {
	img: string;
	_id: string;
	email: string;
	nombre: string;
}
