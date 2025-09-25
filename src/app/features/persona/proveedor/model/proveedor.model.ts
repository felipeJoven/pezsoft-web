export interface Proveedor {
    id: number;
    fechaCreacion: Date;
    razonSocial: string;
    numeroIdentificacion: string;
    nombre: string;
    apellido: string;
    celular: string;
    telefono: string;
    correo: string;
    direccion: string;    
    tipoIdentificacionId: number;
    tipoIdentificacion: string;
    tipoProveedorId: number;
    tipoProveedor: string;
}