import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import  jsPDF  from "jspdf";
import html2canvas from 'html2canvas';
import { FijoComponent } from '../fijo/fijo.component';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }

  //Trae los datos que están en el HTML y los envía a un archivo pdf en imagen
  @ViewChild('canvas') canvas!: ElementRef;
  downloadImage(){
    html2canvas(this.canvas.nativeElement).then(canvas => {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'PNG',7, 20, 195, 110);
      doc.save("a4.pdf");
    });
  }
  }


