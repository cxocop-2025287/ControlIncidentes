import type { Prioridad } from './type.js';
import type { EstadoIncidente } from './type.js';

export interface Incidente{
    readonly id: number;
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Prioridad;
    estado: EstadoIncidente;
    fechaCreacion: Date;
}