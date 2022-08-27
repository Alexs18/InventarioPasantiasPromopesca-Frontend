import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  constructor() { }

  ngOnInit(): void {
  }

  PdfGenerate(){
    Swal.fire({
      icon: 'warning',
      title: 'AVISO IMPORTANTE!',
      text: 'Por Favor hacer llegar un modelo o especificar como quiere que salga el PDF',
    });
  }
}
