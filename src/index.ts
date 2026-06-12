import readline from 'readline';
import { IncidenteService } from './service/incidenteService.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const service = new IncidenteService();

function menu(): void {

    console.log('   Menu Incidentes');
    console.log('1. Crear incidente');
    console.log('2. Listar activos');
    console.log('3. Listar resueltos');
    console.log('4. Actualizar estado');
    console.log('5. Salir');

    rl.question('Seleccione una opción: ', (opcion) => {

        switch (opcion) {
            case '1':
                rl.question('Título: ', (titulo) => {
                    rl.question('Descripción: ', (descripcion) => {
                        rl.question('Reportado por: ', (reportadoPor) => {
                            rl.question(
                                'Prioridad:baja, media o alta: ',
                                (prioridad) => {
                                    try {
                                        const incidente =
                                            service.crearIncidente({
                                                titulo,
                                                descripcion,
                                                reportadoPor,
                                                prioridad: prioridad as
                                                    'baja' |
                                                    'media' |
                                                    'alta'
                                            });
                                        console.log('\nIncidente creado');
                                        console.log(incidente);
                                        console.log('');
                                    } catch (error) {
                                        if (error instanceof Error) {
                                            console.log(error.message);
                                            console.log('');
                                        }
                                    }
                                    menu();
                                }
                            );
                        });
                    });
                });
                break;

            case '2':
                const activos = service.listarActivos();
                if (activos.length === 0) {
                    console.log('No hay incidentes activos o en progreso');
                    console.log('');
                } else {
                    for (const incidente of activos) {
                    console.log('');
                    console.log(`ID: ${incidente.id}`);
                    console.log(`Título: ${incidente.titulo}`);
                    console.log(`Descripción: ${incidente.descripcion}`);
                    console.log(`Reportado por: ${incidente.reportadoPor}`);    
                    console.log(`Prioridad: ${incidente.prioridad}`);
                    console.log(`Estado: ${incidente.estado}`);
                    console.log(`Fecha de creación: ${incidente.fechaCreacion.toLocaleString()}`);
                    console.log('');
                    }
                }
                menu();
                break;
            case '3':
                const resueltos = service.listarResueltos();
                if (resueltos.length === 0) {
                    console.log('No hay incidentes resueltos');
                    console.log('');
                } else {
                    for (const incidente of resueltos) {
                    console.log('');
                    console.log(`ID: ${incidente.id}`);
                    console.log(`Título: ${incidente.titulo}`);
                    console.log(`Descripción: ${incidente.descripcion}`);
                    console.log(`Reportado por: ${incidente.reportadoPor}`);    
                    console.log(`Prioridad: ${incidente.prioridad}`);
                    console.log(`Estado: ${incidente.estado}`);
                    console.log(`Fecha de creación: ${incidente.fechaCreacion.toLocaleString()}`);
                    console.log('');
                    }
                }
                menu();
                break;

            case '4':

                rl.question('ID: ', (id) => {
                    try {
                        const incidente = service.buscarPorId(Number(id));
                        console.log(`Incidente encontrado: ${incidente.titulo}`);
                        rl.question(
                            'Nuevo estado ("abierto", "en progreso" o "resuelto"): ',
                            (nuevoEstado) => {
                                try {
                                    const actualizado =service.actualizarEstado({
                                            id: Number(id),
                                            nuevoEstado: nuevoEstado as
                                                'abierto' |'en progreso'|'resuelto'
                                        });
                                    console.log('\nIncidente actualizado');
                                    console.log(actualizado);
                                    console.log('');

                                } catch (error) {
                                    if (error instanceof Error) {
                                        console.log(error.message);
                                        console.log('');
                                    }
                                }
                                menu();
                            }
                        );
                    } catch (error) {
                        if (error instanceof Error) {
                            console.log(error.message);
                            console.log('');
                        }
                        menu();
                    }
                });

                break;
            case '5':
                console.log('Finalizando programa');
                rl.close();
                break;

            default:
                console.log('Opción inválida');
                console.log('');
                menu();
        }
    });
}

menu();