export interface Estanque {
    id: number;
    fechaCreacion: Date;
    estanque: string;
    coordenadas: string;
    largo: number;
    ancho: number;
    area: number;
    profundidad: number;
    estado: boolean;
    tipoEstanqueId: number;
    tipoEstanque: string;
}