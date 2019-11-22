// Generated by https://quicktype.io

export class Propiedades {
  constructor(
    public ok: boolean,
    public mensaje: string,
    public propiedads: Propiedad[],
    public total: number
  ) {}
}

export class Propiedad {
  constructor(
    public operacion: string,
    public tipopropiedad: string,
    public pais: string,
    public provincia: string,
    public ciudad: string,
    public barrio: string,
    public calle: string,
    public numero: number,
    public imgs?: string[],
    public descripcion?: string,
    public ambientes?: number,
    public dormitorios?: number,
    public terraza?: boolean,
    public zonificacion?: string,
    public ambienteslista?: string,
    public serviciosbasicos?: string,
    public serviciosgenerales?: string,
    public expensas?: number,
    public banios?: number,
    public cocheras?: number,
    public aptocredito?: boolean,
    public antiguedad?: number,
    public techo?: string,
    public estado?: string,
    public disposicion?: string,
    public orientacion?: string,
    public precio?: number,
    public dolares?: boolean,
    public supcubierta?: number,
    public supdescubierta?: number,
    public usuario?: string,
    public inmobiliaria?: string,
    public _id?: string,
    public __v?: number
  ) {}
}
