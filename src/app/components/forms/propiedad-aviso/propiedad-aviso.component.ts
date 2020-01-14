import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Propiedad } from 'src/app/models/propiedad.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsService } from '../forms.service';
import { TipoInmueble } from 'src/app/models/tipos_inmueble.model';
import { TipoUnidad, TiposUnidades } from 'src/app/models/tipos_unidad.model';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
	selector: 'app-form-propiedad-aviso',
	templateUrl: './propiedad-aviso.component.html',
	styleUrls: ['./propiedad-aviso.component.scss']
})
export class PropiedadAvisoComponent implements OnInit {
	// Si estoy editando una propiedad obtengo los datos en formData
	@Input() formData: Propiedad;
	@Output() outputGroup: EventEmitter<FormGroup> = new EventEmitter();
	value = 'Clear me';
	parsetemplate = false;
	propId: string;
	formGroup: FormGroup = new FormGroup({});

	// operaciones e inmuebles no cambian, son siempre los mismos en todo el scope de la web por lo tanto 
	// las obtengo una única vez al iniciar el servicio FORMS. Desde las vistas las obtengo llamando directamente 
	// al servicio formsService.operaciones y formsService.inmuebles.
	// operaciones:
	// inmuebles:
	unidades: TipoUnidad[] = [];

	// Localidades
	localidadesControl = new FormControl();
	filteredOptions: Observable<string[]>;
	options: any[] = [];

	constructor(
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private formsService: FormsService
	) { }

	ngOnInit() {
		this.buildForm().then(() => {
			console.log(this.formData);
			// formData contiene la data de la propiedad que envía el componente padre
			this.formGroup.patchValue({
				calle: this.formData.calle,
				altura: this.formData.altura,
				piso: this.formData.piso,
				depto: this.formData.depto,
				tipoinmueble: { nombre: this.formData.tipoinmueble.nombre, _id: this.formData.tipoinmueble._id },
				tipounidad: { nombre: this.formData.tipounidad.nombre, _id: this.formData.tipounidad._id },
				tipooperacion: { nombre: this.formData.tipooperacion.nombre, _id: this.formData.tipooperacion._id },
				titulo: this.formData.titulo,
				descripcion: this.formData.descripcion,
				precio: this.formData.precio,
				moneda: this.formData.moneda,
				nopublicarprecio: this.formData.nopublicarprecio,
				aptocredito: this.formData.aptocredito,
				provincia: { nombre: this.formData.provincia.nombre, id: this.formData.provincia.id },
				departamento: { nombre: this.formData.departamento.nombre, id: this.formData.departamento.id },
				localidad: { nombre: this.formData.localidad.nombre, id: this.formData.localidad.id, _id: this.formData.localidad._id },
				coords: { lat: this.formData.coords.lat, lng: this.formData.coords.lng },
				codigopostal: this.formData.codigopostal
			});
			this.parsetemplate = true;
			console.log(this.formGroup);
		}
		);

		this.filteredOptions = this.localidadesControl.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}


	private _filter(value: string): string[] {
		if (!value) {
			return;
		}
		const filterValue = value.toLowerCase();
		return this.options.filter((option: any) => {
			return option.properties.nombre.toLowerCase().includes(filterValue);
		});
	}

	buildForm() {
		return new Promise(resolve => {
			// El valor por defecto '' en este caso NO es necesario, porque yo no estoy trabajando
			// con un objeto 'propiedad', estoy trabajando DIRECTAMENTE con el objeto formGroup.value
			// en donde yo guardo la data de la propiedad, y desde donde los controles en el formulario
			// van a buscar la data.

			// En general la configuración sería
			// [value]="propiedad.titulo" -> propiedad.titulo <- formGroup.value.titulo

			// En este caso utilizo el metodo patchValue({...}) para guardar la data en mi formGroup
			// [value]="formGroup.value.titulo" <-> formGroup.value.titulo
			this.formGroup = this.formBuilder.group({
				calle: ['', [Validators.required, Validators.minLength(5)]],
				altura: ['', [Validators.required, Validators.pattern('[0-9]{1,5}')]],
				piso: ['', [Validators.pattern('[0-9]{1,5}')]],
				depto: ['', [Validators.pattern('[a-z][A-Z][0-9]{1,5}')]],
				tipoinmueble:
				{
					nombre: ['', [Validators.required, Validators.minLength(5)]],
					id: ['', [Validators.required, Validators.minLength(5)]],
					_id: ['', [Validators.required, Validators.minLength(5)]],

				},
				tipounidad:
				{
					nombre: ['', [Validators.required, Validators.minLength(5)]],
					id: ['', [Validators.required, Validators.minLength(5)]],
					_id: ['', [Validators.required, Validators.minLength(5)]],
				},
				tipooperacion:
				{
					nombre: ['', [Validators.required, Validators.minLength(5)]],
					id: ['', [Validators.required, Validators.minLength(5)]],
					_id: ['', [Validators.required, Validators.minLength(5)]],
				},
				titulo: ['', [Validators.required, Validators.minLength(10)]],
				descripcion: ['', [Validators.required, Validators.minLength(100)]],
				precio: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
				moneda: ['', [Validators.required]],
				nopublicarprecio: ['', [Validators.required]],
				aptocredito: ['', [Validators.required]],
				provincia:
				{
					nombre: ['', [Validators.required, Validators.minLength(5)]],
					id: ['', [Validators.required, Validators.minLength(5)]],

				},
				departamento:
				{
					nombre: ['', [Validators.required, Validators.minLength(5)]],
					id: ['', [Validators.required, Validators.minLength(5)]],

				},
				localidad:
				{
					nombre: ['', [Validators.required, Validators.minLength(5)]],
					id: ['', [Validators.required, Validators.minLength(5)]],
					_id: ['', [Validators.required, Validators.minLength(5)]],

				},
				coords:
				{
					lat: ['', [Validators.required, Validators.minLength(5)]],
					lng: ['', [Validators.required, Validators.minLength(5)]],

				},
				codigopostal: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{4,10}')]]
			});
			resolve();
		});
	}





	enviarFormulario() {
		console.log(this.formGroup.value);
		if (this.formGroup.valid) {
			this.outputGroup.emit(this.formGroup);
		} else {
			this.openSnackBar('Faltan datos, por favor verifique.', 'Aceptar');
		}
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}


	checkForFills(inmueble: TipoInmueble) {

		this.formGroup.patchValue({
			tipoinmueble: {
				nombre: inmueble.nombre,
				id: inmueble.id,
				_id: inmueble._id
			}
		});

		this.formsService.obtenerUnidades(inmueble._id).subscribe((data: TiposUnidades) => {
			this.unidades = data.unidades;
		});
	}

	setOperacion(operacion: any) {
		this.formGroup.patchValue({
			tipooperacion: {
				nombre: operacion.nombre,
				id: operacion.id,
				_id: operacion._id
			}
		});
	}

	setUnidad(unidad: any) {
		this.formGroup.patchValue({
			tipounidad: {
				nombre: unidad.nombre,
				id: unidad.id,
				_id: unidad._id
			}
		});
	}

	buscarLocalidad(event) {
		const regex = new RegExp(/^[a-z ñ0-9]+$/i);
		if (!regex.test(event.target.value) && event.target.value) {
			this.snackBar.open('¡Ingrese sólo caracteres alfanuméricos!', 'Aceptar', {
				duration: 2000,
			});
			return;
		}

		if (event.target.value.length === 3) {
			// Con el fin de evitar sobrecargar al server con peticiones de datos duplicados, le pido al backend
			// que me envíe resultados SOLO cuando ingreso tres caracteres, a partir de esos resultados
			// el filtro lo hace el cliente en el frontend con los datos ya almacenados en this.options.


			this.formsService.obtenerLocalidad(event.target.value).subscribe((localidades: Localidades) => {
				if (localidades.ok) {
					this.options = [];
					localidades.localidades.forEach(localidad => {
						this.options.push(localidad);
					});
				}
			});
		}
	}

	setLocalidad(localidad) {
		this.formGroup.patchValue({
			localidad: {
				nombre: localidad.properties.nombre,
				id: localidad.properties.id,
				_id: localidad._id
			},
			departamento: {
				nombre: localidad.properties.departamento.nombre,
				id: localidad.properties.departamento.id,
			},
			provincia: {
				nombre: localidad.properties.provincia.nombre,
				id: localidad.properties.provincia.id,
			},
			coords: {
				lng: localidad.geometry.coordinates[0],
				lat: localidad.geometry.coordinates[1]
			},

		});
		console.log(this.formGroup);

		// Este metodo podría no ser necesario, pero tengo que enviar el nombre (string) al control
		// y el id (number) hacia un nuevo objeto que voy a enviar al backend. Esto es porque yo
		// necesito enviar el id, pero si guardo el ID en el form, en el control voy a ver el ID en lugar
		// del string localidad, departamento, provincia.
	}
}
