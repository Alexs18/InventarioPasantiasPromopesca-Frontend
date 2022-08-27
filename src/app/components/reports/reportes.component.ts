import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {observable, Observable, map} from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import {ConsultasEncadenadasService} from 'src/app/services/consultas-encadenadas.service'
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public headers = new HttpHeaders();

  private BASEURI = environment.URI_BACKEND;
  constructor(
    private HttpClient: HttpClient,
    private Service:StockService,
    private JoinQuerys:ConsultasEncadenadasService
    ) { 
    this.headers.append("Content-type","application/json");
    this.GeneralResume = []
  }

  public data:any
  public formatoselect:string =''
  public liquidoselect:string = '' 
  public selectformato:any
  public selectliquidocobertura:any
  public ProductosAtun: any[] =[]
  public AllProducts:any
  public GeneralResume: any[] = []
  public Cuentas:any[] = []
  public loading = true
  public formatogrupo:any[] = []
  public palagicos:any[] = []
  public Grupo:any={
    congelado:false,
    conserva:false
  }
  public Envase:any={
    palagicos:false,
    atun:false
  }
  public Formato:any={
    formato:false,
    liquidocob:false
  }
  public Exportacion:any={
    defmayor:false,
    defmenor:false,
    defcritico:false,
    bueno:false
  }
  public campos:string[] = [
    "Codigo Erp","Producto", "Saldo Unidades", "Saldo Cajas",
    "Fecha de Producción", "Observación de calidad", "Estado de Calidad", 
    "tipo defectos", "codigo lata", "año de ingreso", 
    "mes de ingreso", "formato (Nombre tipo_envase)",
    "Liquido de Cobertura", "recibido", "sticker", "etiqueta", "carton"
  ]
  // public conserva = false


   ngOnInit():void {
    this.ObtenerTodosLosRegistros()
    this.FormatoGrupos();
    this.Palagicos();
    this.GetSelects('pro.Nombre_Items_Tipo_Envase', 'liqui.Nombre_Items_Liq_Cobertura')
  }
   
  async MakePdf(contenido:any){

    await this.Service.MakePdf(contenido).subscribe(
      result=>{
        if (result.status == 200) {
          Swal.fire({
            icon: result.icon,
            title: result.title,
            text: `ruta: ${result.ruta}`,
          }); 
        }
      }
    )
  }
  async ObtenerAtun(){
    await this.HttpClient.get(`${this.BASEURI}GetProductAtun`).subscribe(
      result=>{
        this.ProductosAtun.push(result)
      }
    )

  }
  async Funcional(){
    console.log('el resumen del resumens');
    console.log(this.GeneralResume);
    for(const iterator of this.GeneralResume) {
        console.log('iteradir');
        console.log(iterator)
    }
  }
  async ObtenerTodosLosRegistros(){
    this.GeneralResume =[]
    console.log('obtener todos los registros x2')
    this.loading = false
    await this.Service.GetProductByName().subscribe(
      result=>{
        for (const iterator of result) {
            this.Service.GetAllResume(iterator).subscribe(
              result2=>{
                this.GeneralResume.push(result2[0]);
                //this.cuentas.push(result2[0])
              }
            )
        }
      }
      );
  }
  async Resumen(){
   console.log('el resumen');
   Swal.fire({
        icon: 'warning',
        title: 'No a legido ninguna opción',
        text: 'Asegurece de elegir una opción',
    });
  }

  async BuscarPorGrupo(Nombre:string, ){
    // if(this.GeneralResume.length == 267){
    //   this.GeneralResume = []
    // }
  // this.GeneralResume = []
    let resumen = await this.JoinQuerys.ConsultasEncatenadas(this.Grupo, this.Envase, this.Exportacion, this.formatoselect, this.selectliquidocobertura, this.GeneralResume)
    this.GeneralResume = resumen
    console.log('nuevo resumen');
    console.log(this.GeneralResume)
    this.loading = false
    await this.Service.GetProductoByGroup(Nombre).subscribe(
      result=>{
        for  (const iterator of result) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
              //this.cuentas.push(result2[0])
            }
          )
      }
      }
    )
  }
  /**Busqueda por palagicos */
  async BuscarPalagicos(){
    let resumen = await this.JoinQuerys.ConsultasEncatenadas(this.Grupo, this.Envase, this.Exportacion, this.formatoselect, this.selectliquidocobertura, this.GeneralResume)
    this.GeneralResume = resumen
        for  (const iterator of this.palagicos) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
              //this.cuentas.push(result2[0])
            }
          )
      } 
  }

  /**Busqueda por atun */
  async BuscarPorAtun(){
    let resumen = await this.JoinQuerys.ConsultasEncatenadas(this.Grupo, this.Envase, this.Exportacion, this.formatoselect, this.selectliquidocobertura, this.GeneralResume)
    this.GeneralResume = resumen
    console.log('nuevo resumen');
    console.log(this.GeneralResume)
    await this.Service.GetProductByAtun().subscribe(
      result=>{
        for  (const iterator of result) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
              //this.cuentas.push(result2[0])
            }
          )
      }
      }
    ) 
  }

  async BuscarLiquidoDeCobertura(nombreliquido:string){
    this.loading= false
    this.GeneralResume = []
    await this.Service.GetLiquidoDeCobertura(nombreliquido).subscribe(
      result=>{
        for  (const iterator of result) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
              //this.cuentas.push(result2[0])
            }
          )
      }
      }
    ) 
  }

  async EstadoExportacion(Estado:string){
    let resumen = await this.JoinQuerys.ConsultasEncatenadas(this.Grupo, this.Envase, this.Exportacion, this.formatoselect, this.selectliquidocobertura, this.GeneralResume)
    this.GeneralResume = resumen
    await this.Service.GetEstadoExportacion(Estado).subscribe(
      result=>{
        for  (const iterator of result) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
            }
          )
      }
      }
    ) 
  }

  async EstadoExportacionBueno(){
    this.loading= false
    let resumen = await this.JoinQuerys.ConsultasEncatenadas(this.Grupo, this.Envase, this.Exportacion, this.formatoselect, this.selectliquidocobertura, this.GeneralResume)
    this.GeneralResume = resumen

    await this.Service.GetEstadoExportacionBueno().subscribe(
      result=>{
        for  (const iterator of result) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
            }
          )
      }
      }
    ) 
  }

  async Palagicos(){
    let listaData = ["OVAL", "TINAPA", "TAPA  PLANA", "1/2 TALL", "TALL"];
    for (const iterator of listaData) {
         await this.Service.GetTipoDeEnvase(iterator).subscribe(
            result=>{
                result.map((nombreitems:string)=> {
                  this.palagicos.push(nombreitems)
                })
            }
         )
    }
  }

  async FormatoGrupos(){
    let listaData = ["OVAL", "TINAPA"];
    for (const iterator of listaData) {
         await this.Service.GetTipoDeEnvase(iterator).subscribe(
            result=>{
                result.map((nombreitems:string)=> {
                  this.formatogrupo.push(nombreitems)
                })
            }
         )
    }
    await this.Service.GetFormato().subscribe(
      result=>{
        for  (const iterator of result) {
          this.formatogrupo.push(iterator)
        }
      }
    ) 
  }

  async ObtenerFormato(){
    this.loading= false
    this.GeneralResume = []
    for (const iterator of this.formatogrupo) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
            }
          )
    }
  }
  async GetSelects(Filtro1:string, Filtro2:string){
    await this.Service.GetSelect(Filtro1).subscribe(
      result=>{
        this.selectformato = result[0]
      }
    );
    await this.Service.GetSelect(Filtro2).subscribe(
      result=>{
        this.selectliquidocobertura = result[0]
      }
    )
  }

  async GetFormato(item:string){
    this.loading = false
    this.GeneralResume = []
    await this.Service.GetTipoDeEnvase(item).subscribe(
      result=>{
        for  (const iterator of result) {
          this.Service.GetAllResume(iterator).subscribe(
            result2=>{
              this.GeneralResume.push(result2[0]);
            }
          )
      }
      }
    )
  }
  
  
  async SearchGroup(){
    if (!this.Grupo.congelado && !this.Grupo.conserva) {
      Swal.fire({
        icon: 'warning',
        title: 'No a legido ninguna opción',
        text: 'Asegurece de elegir una opción',
      });
       
    }
    if (this.Grupo.congelado) {
        this.loading = true;
        this.BuscarPorGrupo('Congelado')
    }
    if (this.Grupo.conserva) {
      this.loading = true;
      this.BuscarPorGrupo('Conserva')
  }

  }

  async SearchEnvase(){
    if (!this.Envase.palagicos && !this.Envase.atun) {
      Swal.fire({
        icon: 'warning',
        title: 'No a legido ninguna opción',
        text: 'Asegurece de elegir una opción',
      });
       
    }
    if (this.Envase.palagicos) {
      this.loading = true;
      this.BuscarPalagicos();
    }
    if (this.Envase.atun) {
      this.loading = true;
      this.BuscarPorAtun();
  }

  }

  async SearchFormato(){
    if (this.formatoselect == '') {
      Swal.fire({
        icon: 'warning',
        title: 'No a legido ninguna opción',
        text: 'Asegurece de elegir una opción',
      });
       
    }
    if (this.formatoselect !== '') {
        this.GetFormato(this.formatoselect)
    }

  }

  async SearchLiquido(){

    if (this.liquidoselect == '') {
      Swal.fire({
        icon: 'warning',
        title: 'No a legido ninguna opción',
        text: 'Asegurece de elegir una opción',
      });
       
    }
    if (this.liquidoselect !== '') {
      this.loading = true;
      this.BuscarLiquidoDeCobertura(this.liquidoselect)
    }

  }

  async SearchEstadoExportacion(){
    if (!this.Exportacion.defmayor && !this.Exportacion.defmenor && !this.Exportacion.defcritico && !this.Exportacion.bueno) {
      Swal.fire({
        icon: 'warning',
        title: 'No a legido ninguna opción',
        text: 'Asegurece de elegir una opción',
      });
       
    }
    if (this.Exportacion.defmayor) {
        this.loading = true;
        this.EstadoExportacion('D MA')
    }
    if (this.Exportacion.defmenor) {
      this.loading = true;
      this.EstadoExportacion('D ME')
    }
    if (this.Exportacion.defcritico) {
      this.loading = true;
      this.EstadoExportacion('D CR')
    }
    if (this.Exportacion.bueno) {
      this.loading = true;
      this.EstadoExportacionBueno()
     
    }

  }

  CuentasTotales(Array:any[]) {
    let cuentas = Array.reduce((init, valor)=>{
      let total = init + valor.SALDOCUENTA;
      return total
    },0);
    return cuentas
  }
  
  async CuentasTotales0(nombre:string){
    this.Service.GetCuentas(nombre).subscribe(
      result=>{
        console.log(result)
      }
    )
  }

  SaldoTotales(Array:any[]) {
    // cuentas = 0
    let cuentas = Array.reduce((init, valor)=>{
      let total = init + valor.SUMATORIACAJAS;
      return total
    },0);
    return cuentas
  }

  TodasLasCuentas(Array:any[]) {
    let data = [];
    for (let index = 0; index < Array.length; index++) {
      for (let index1 = 0; index1 < Array[index].length; index1++) {
        
        data.push({
          SUMATORIACAJAS:Array[index][index1].SUMATORIACAJAS,
          SALDOCUENTA:Array[index][index1].SALDOCUENTA
        });
      }
      
    }
    return data
  }

  PdfGenerate(){
    Swal.fire({
      icon: 'warning',
      title: 'AVISO IMPORTANTE!',
      text: 'Por Favor hacer llegar un modelo o especificar como quiere que salga el PDF',
    });
  }


}
