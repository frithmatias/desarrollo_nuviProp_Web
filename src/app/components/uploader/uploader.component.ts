import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { FileUpload } from '../../models/fileupload.model';
import { UploadFileService } from '../../services/upload.service';
import { PropiedadesService } from 'src/app/services/services.index';
import { Propiedad } from 'src/app/models/propiedad.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']

})
export class UploaderComponent implements OnInit {
  @Input() propiedad: Propiedad;
  @Input() tipo: string;
  @Input() id: string;

  archivos: FileUpload[] = [];
  maxupload = 30;
  estaSobreElemento = false;
  constructor(public uploadService: UploadFileService, private propiedadesService: PropiedadesService) { }


  ngOnInit() { }

  cargarImagenes() {
    this.archivos.forEach(archivo => {
      this.uploadService.subirImagen(archivo, this.tipo, this.id).then((data: any) => {
        this.propiedad.imgs = data.propiedad.imgs;
        // cuando termino de subir la imagen, borro sólo esa imagen de ambos buffers

        // this.archivos = this.archivos.filter(file => file.nombreArchivo !== archivo.nombreArchivo);

      });
    });
    // this.archivosBuffer = [];
    // this.archivos = [];
  }

  borrarImagenes() {
    console.log(this.archivos);
    this.archivos = [];
  }

  borrarImagen(id: string) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta por borrar una imagen en el servidor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancelar!',
      confirmButtonText: 'Si, quiero borrarla'
    }).then((result) => {
      if (result.value) {
        this.uploadService.borrarImagen('propiedades', this.propiedad._id, id).then((data: any) => {
          this.propiedad.imgs = data.propiedad.imgs;
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La imagen fue eliminada',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });

  }
  borrarImagenQueue(nombreArchivo) {

    console.log(nombreArchivo);
    this.archivos = this.archivos.filter(archivo => archivo.nombreArchivo !== nombreArchivo);
  }

  queueFilesInput(event) {
    console.log('QueueFilesInput:', event);
    this._extraerArchivos(event.target.files); // le envío un objeto que voy a tener que convertir en array
    this._prevenirDetener(event);
  }


  queueFilesDrop(event) {
    console.log('QueueFilesDrop:', event);
    this._extraerArchivos(event.dataTransfer.files); // le envío un objeto que voy a tener que convertir en array
    this._prevenirDetener(event);
  }
  // esta función va a recibir el evento del tipo any
  private _getTransferencia(event: any) {
    /*Esto es para extender la compatibilidad porque hay algunos navegadores que lo manejan directo con
    event.dataTransfer y otros event.originalEvent.dataTrasnfer;*/
    return event.dataTransfer.files ? event.dataTransfer.files : event.originalEvent.dataTransfer.files;

  }

  /*Esta función es para trabajar con los archivos, vamos a extraerlos de la constante "transferencia"*/
  private _extraerArchivos(archivosLista: FileList) {
    // console.log(archivosLista);
    // archivosLista: FileList <- OBJETO, LO CONVIERTO A UN ARRAY
    /*Ya puedo recibir UN OBJETO con la información de los archivos soltados, pero ES UN OBJETO y no me sirve tengo
    que extraer la información y devolverla como array. A la función getOwnPropertyNames le mando como argumento el
    objeto que quiero separar. El ciclo for barre cada una de las propiedades del objeto archivosLista.
    */

    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];
      // verifico si el archivo puede ser cargado... podemos crear un nuevo elemento del tipo fileItem
      // dentro del arreglo archivos[]
      if (this._fileCanLoaded(archivoTemporal)) {

        // creo un nuevo objeto de tipo FileUpload que va a contener todos los datos de cada archivo a subir.
        const nuevoArchivo = new FileUpload(archivoTemporal);

        // ademas, voy a guardar dentro de ese objeto, la imagen temporal para poder previsualizarla.
        const reader = new FileReader();
        reader.readAsDataURL(archivoTemporal);
        reader.onloadend = () => (nuevoArchivo.bufferImage = reader.result);

        // push al objeto con los datos, y con el buffer que contiene la imagen.
        this.archivos.push(nuevoArchivo);
      }
    }
    /*En this.archivos ya tengo un arreglo con todos las imagenes para subir, si yo inento cargar por segunda vez un mismo
    archivo no me va a dejar. Ahora lo quiero relacionar con los archivos que tengo en el componente.

    En carga.component.html en el elemento donde tenemos la directiva appNgDropFiles ponemos
    archivos en la directiva -> [archivos]="archivos" <- archivos en el componente
    Javascript pasa por referencia TODOS los objetos, por lo tanto si se modifica en el compoente, se modifica en la directiva.
    Representan al mismo objeto.
  */
  }

  // validaciones
  // cuando hacemos el DROP queremos que el chrome NO tenga el comportamiento por defecto de abrir la imagen

  private _fileCanLoaded(archivo: File): boolean {
    // si el archivo NO fue ya dropeado... y es una imagen...
    if (!this._fileWasDropped(archivo.name) && this._isImage(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  // la segunda validación sera que el archivo que estoy dropeando no haya sido ya dropeado.
  private _fileWasDropped(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya fué agregado.');
        return true;
      }
    }
    return false;
  }

  // verificar que el archivo sea una imagen leyendo el doctype
  // tipoArchivo.startsWith('image'); devuelve 1 si lo encuentra y -1 si no lo encuentra, 1 es true y -1 es interpretado como false.

  private _isImage(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }





}
