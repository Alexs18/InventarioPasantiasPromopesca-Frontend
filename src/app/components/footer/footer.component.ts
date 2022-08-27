import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {observable, Observable, map} from 'rxjs'
import { StockService } from 'src/app/services/stock.service';
// import swal from 'sweetalert';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  anio:number;
  public headers = new HttpHeaders();
  private BASEURI = environment.URI_BACKEND;
  constructor(private HttpClient: HttpClient, private Service:StockService) { 
    this.headers.append("Content-type","application/json")
    this.anio = new Date().getFullYear();
  }

 


   ngOnInit():void {
    
  }
 
  

}
