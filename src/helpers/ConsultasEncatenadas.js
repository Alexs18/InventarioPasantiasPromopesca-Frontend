export class ReportesCocatenados {

    ConsultasEncatenadas(grupo, envase, exportacion , formato, liquido, resumen){
        if (!grupo.congelado || !grupo.conserva || !envase.palagicos
            || !envase.atun || !exportacion.defmayor || !exportacion.defmenor || !exportacion.defcritico
            || !exportacion.bueno || liquido == '' || formato == '' ) {
            return resumen = []
        }else{
            return resumen
        }
    } 

}