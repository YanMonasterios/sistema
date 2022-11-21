import { id } from '@swimlane/ngx-datatable';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import  jsPDF  from "jspdf";
import html2canvas from 'html2canvas';
import { FijosServices } from 'src/app/services/fijo.service';
import { BenefitsServices } from 'src/app/services/prestaciones.service';
import {ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-VE';
import { MatTableDataSource } from '@angular/material/table';
registerLocaleData(localeES, 'es-VE');

@Component({
  selector: 'app-recibo-inactivos',
  templateUrl: './recibo-inactivos.component.html',
  styleUrls: ['./recibo-inactivos.component.css']
})
export class ReciboInactivosComponent implements OnInit {
  CurrentDate = new Date();
  motivo: any[] = ['Renuncia', 'Despido']
  anio: number;
  misdatos : any;
  order: any;
  benefits:any =[];
  apartado:any;
  empleado:any;
  integral: any;
  vacaciones: any;
  utilidades: any;
  intereses: any;
  total: any;
  dataSource = new MatTableDataSource(this.benefits);

  constructor(  private fijos: FijosServices,
                private beneficios: BenefitsServices,
                private ruta: ActivatedRoute,   ) { 
                  this.anio = new Date().getFullYear();
                }

  ngOnInit(): void {
    // this.datosFijos();
    console.log(this.CurrentDate)
    this.ruta.params
    // .filter((params:any) => params.id)
    .subscribe((params:any) => {
      this.fijos.getAllInactivos().subscribe((result: any) => {
        console.log(result)
        this.misdatos = result ;
       
    this.order = params.id;
    console.log(this.order)
    console.log(result)
    result.rows.map((emplea:any) => {
      if (emplea.id == params.id){
        this.empleado = emplea;
        // this.vacaciones = emplea.dias_frac
        // console.log(this.vacaciones)
      } 
    })
  });
  this.beneficios.getAllBenefits(params.id).subscribe(result => {
    this.benefits = result.rows.at(-1); //rows viene de la consola , trae el ultimo registro
    console.log(this.benefits);
    this.apartado = result.apartado.apartado_mensual__sum;
    console.log(this.apartado);
    this.integral = result.total_integral
    console.log(this.integral)
    this.intereses = result.total_intereses.intereses_prestaciones__sum
    console.log(this.intereses)

    this.dataSource.data = [];
    this.dataSource.data = this.benefits;
  });
  // this.fijos.enviarVacaciones(params.id).subscribe((result: any) => {
  //   console.log(result)
  //   this.vacaciones = result ; 

  // })
  });  
  }


  datosFijos(){
   
  }


  //Trae los datos que están en el HTML y los envía a un archivo pdf en imagen
  @ViewChild('canvas') canvas!: ElementRef;
  downloadImage(){
    html2canvas(this.canvas.nativeElement).then(canvas => {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF("p", "mm", "letter");
      doc.addImage(img,'PNG',20, 5, 170, 250);
      doc.save("prestaciones.pdf");
    });
  }
} 