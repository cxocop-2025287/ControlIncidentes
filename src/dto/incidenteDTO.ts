import type { Prioridad } from '../types/type.js';
import type { EstadoIncidente } from '../types/type.js';

export interface CrearIncidenteDTO {
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Prioridad;
}

export interface ActualizarEstadoDTO {
    id: number;
    nuevoEstado: EstadoIncidente;
}
