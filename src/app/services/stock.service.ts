import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public httpheader = new HttpHeaders();
  private BASEURI = environment.URI_BACKEND;
  constructor(private http:HttpClient) {
    this.httpheader.append("Content-type","application/json")
  }

  GetProductByName():Observable<any>{
    return this.http.get<any>(`${this.BASEURI}AllProducts`, {headers:this.httpheader})
    .pipe(map (data=>{
       return data[0].map((data:any)=>{
        return data.nombre_items
       })
    }))
  }

  GetAllResume(Nombre:string): Observable<any>{
    return this.http.get<any>(`${this.BASEURI}StokProductobyroduct/${Nombre}`, {headers:this.httpheader});
  }

  GetProductoByGroup(Grupo:string):Observable<any>{
    return this.http.get<any>(`${this.BASEURI}GetGrupos/${Grupo}`, {headers:this.httpheader})
    .pipe(map (data=>{
      return data[0].map((data:any)=>{
       return data.nombre_items
      })
   }))
  }

  GetProductByAtun():Observable<any>{
    return this.http.get<any>(`${this.BASEURI}GetProductAtun`, {headers:this.httpheader})
    .pipe(map (data=>{
      return data[0].map((data:any)=>{
       return data.nombre_items
      })
   }))
  }

  GetLiquidoDeCobertura(nombreliquido:string):Observable<any>{
    return this.http.get<any>(`${this.BASEURI}LiquidoCobertura/${nombreliquido}`, {headers:this.httpheader})
    .pipe(map (data=>{
      return data[0].map((data:any)=>{
       return data.nombre_items
      })
   }))
  }

  GetTipoDeEnvase(Tipo:string):Observable<any>{
    return this.http.get<any>(`${this.BASEURI}GetTipoEnvase/${Tipo}`, {headers:this.httpheader})
    .pipe(map (data=>{
      return data[0].map((data:any)=>{
       return data.nombre_items
      })
   }))
  }

  GetEstadoExportacion(Estado:string):Observable<any>{
    return this.http.get<any>(`${this.BASEURI}EstadoExportacion/${Estado}`, {headers:this.httpheader})
    .pipe(map (data=>{
      return data[0].map((data:any)=>{
       return data.nombre_items
      })
   }))
  }

  GetEstadoExportacionBueno():Observable<any>{
    return this.http.get<any>(`${this.BASEURI}EstadoExportacionBueno`, {headers:this.httpheader})
    .pipe(map (data=>{
      return data[0].map((data:any)=>{
       return data.nombre_items
      })
   }))
  }

  GetFormato():Observable<any>{
    return this.http.get<any>(`${this.BASEURI}Formato`, {headers:this.httpheader})
    .pipe(map (data=>{
      return data[0].map((data:any)=>{
       return data.nombre_items
      })
   }))
  }

  GetSelect(Filtro:string):Observable<any>{
    return this.http.get<any>(`${this.BASEURI}Select/${Filtro}`, {headers:this.httpheader})
  }


  GetCuentas(nombre:string):Observable<any>{
    return this.http.get<any>(`${this.BASEURI}GetCuentas/${nombre}`, {headers:this.httpheader})
  }

  MakePdf(contenido:any):Observable<any>{
    return this.http.post<any>(`${this.BASEURI}MakePdf`,contenido, {headers:this.httpheader})
  }
  

}
