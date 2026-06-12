import type { Incidente } from '../types/incidenteInterface.js';

import type { Prioridad } from '../types/type.js';
import type { CrearIncidenteDTO } from '../dto/incidenteDTO.js';
import type { ActualizarEstadoDTO } from '../dto/incidenteDTO.js';

export class IncidenteService {
    private incidentes: Incidente[] = [];
    private contadorId: number = 1;

    crearIncidente(dto: CrearIncidenteDTO): Incidente {
        if ( dto.titulo.trim().length === 0) {
            throw new Error('El incidente debe llevar un título');
        }     
        if (dto.descripcion.trim().length === 0) {
            throw new Error('El incidente debe llevar una descripción');
        }        
        if (dto.reportadoPor.trim().length === 0) {
            throw new Error('El incidente debe llevar un nombre de quien lo reporta');
        }
        
        if (dto.prioridad !== 'baja' && dto.prioridad !== 'media' && dto.prioridad !== 'alta') {
            throw new Error('Eliga una prioridad válida: baja, media o alta');
        }

        const nuevoIncidente: Incidente={
            id: this.contadorId++,
            titulo: dto.titulo.trim(),
            descripcion: dto.descripcion.trim(),
            reportadoPor: dto.reportadoPor.trim(),
            prioridad: dto.prioridad,
            estado: 'abierto',
            fechaCreacion: new Date()
        };

        this.incidentes.push(nuevoIncidente);
        return nuevoIncidente;
    }


    listarActivos(): Incidente[] {
    const activos: Incidente[] = [];
    const ordenados = this.ordenar();
    for (const incidente of ordenados) {
        if (
            incidente.estado === 'abierto' ||
            incidente.estado === 'en progreso'
        ) {
            activos.push(incidente);
        }
    }
    return activos;
    }


    listarResueltos(): Incidente[] {
    const resueltos: Incidente[] = [];
    const ordenados = this.ordenar();

    for (const incidente of ordenados) {
        if (incidente.estado === 'resuelto') {
            resueltos.push(incidente);
        }
    }
    return resueltos;
    }

    ordenar(): Incidente[] {
        const ordenPrioridad: Record<Prioridad, number> = {
            alta: 3,
            media: 2,
            baja: 1
        };
        const copia = [...this.incidentes];
        for (let i = 0; i < copia.length; i++) {
            for (let j = 0; j < copia.length - 1 - i; j++) {
                const actual = copia[j];
                const siguiente = copia[j + 1];

                if (actual &&siguiente &&
                    ordenPrioridad[actual.prioridad]<ordenPrioridad[siguiente.prioridad]
                ) {
                    const aux = actual;
                    copia[j] = siguiente;
                    copia[j+1] = aux;
                }
            }
        }
        return copia;
    }


    buscarPorId(id: number): Incidente {
    const incidente = this.incidentes.find(
        inc => inc.id === id
    );
    if (incidente === undefined || incidente === null) {
        throw new Error('Incidente no encontrado');
    }

    return incidente;
    }


    actualizarEstado(dto: ActualizarEstadoDTO): Incidente {
        const incidente = this.buscarPorId(dto.id);
        
        if (!['abierto', 'en progreso', 'resuelto'].includes(dto.nuevoEstado)) {
            throw new Error('Eliga un estado válido: abierto, en progreso o resuelto');
        }
        
        incidente.estado = dto.nuevoEstado;
        return incidente;
    }

}