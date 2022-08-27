import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasEncadenadasService {

  constructor() { }
  ConsultasEncatenadas(grupo:any, envase:any, exportacion:any , formato:any, liquido:any, resumen:any){
    if (!grupo.congelado || !grupo.conserva || !envase.palagicos
        || !envase.atun || !exportacion.defmayor || !exportacion.defmenor || !exportacion.defcritico
        || !exportacion.bueno || liquido == '' || formato == '' ) {
        console.log('Lo vacia')
        console.log(grupo, envase, exportacion, formato, liquido,resumen)
        return resumen = []
    }else{
      console.log('NO Lo vacia')
      console.log(grupo, envase, exportacion, formato, liquido,resumen)
        return resumen
    }
} 
}
