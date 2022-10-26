import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FijoComponent } from '../fijo/fijo.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FijosServices } from 'src/app/services/fijo.service';
import { BenefitsServices  } from 'src/app/services/prestaciones.service';
import { id } from '@swimlane/ngx-datatable';
import {PdfComponent} from 'src/app/components/dashboard/pdf/pdf.component';
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { VacacionesComponent } from '../vacaciones/vacaciones.component';
import { AnticipoComponent } from '../anticipo/anticipo.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ReciboComponent } from '../recibo/recibo.component';


@Component({
  selector: 'app-edit',
  templateUrl: './prestacion.component.html',
  styleUrls: ['./prestacion.component.css']
})

export class prestacionComponent  {
  opened = false;
  showFiller = false;
  pruebafijo: any[] = [];
  id: number = 0;
  datos: any[] = [];
  benefits: any[] = [];
  dataSource = new MatTableDataSource(this.benefits);
  displayedColumns: string[] = [ 'datefin','salario_basico_mensual', 'salario_basico_diario', 'utilidades_diario','bono_vacional_diario',
                                 'salario_integral_diario','dias_prestaciones','apartado_mensual','anticipo','acumulado','tasa',
                                 'intereses_prestaciones'];
//  dataSource1 = new MatTableDataSource(this.pruebafijo);
//  displayedColumns1: string[] = [ 'name', 'CI', 'date'];                  

@ViewChild(MatPaginator) paginator!: MatPaginator;  
@ViewChild(MatSort) sort!: MatSort;

constructor(private service: FijosServices,
            private services: BenefitsServices,
            public dialog: MatDialog,
            private activerouter: ActivatedRoute,
            private router: Router,
            // public data: Data,

         //   public data: Data
            ) {}
            //public dialog: MatDialog ){}


  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
                      })

ngOnInit(): void {
//  let id = this.data.id
 this.cargarGet(); 
 this.cargarData();
 this.getDatos();
//  this.prueba();

this.form.controls['name'].setValue(id.name);

}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarGet(): void{
    this.id = this.services.getId()
    console.log(this.id)
    
  }

  cargarData(){
    this.services.getAllBenefits(this.id).subscribe(result => {
      this.benefits = result.rows; //rows viene de la consola 
      console.log(this.benefits);
      this.dataSource.data = [];
      this.dataSource.data = this.benefits;
    });
   }

   anticipo(): void{
    const dialogRef = this.dialog.open(AnticipoComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  
  }

  vacaciones(): void{
    const dialogRef = this.dialog.open(VacacionesComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  
  }



  getDatos() {
    this.service.getAllFijos().subscribe((res: any) => {
      console.log(res.rows[0].id);       
      this.datos = res.find((res: any) => res.rows[0] .id === this.id); 
      console.log(this.datos);
    })

  }

  // prueba() {
  //   this.service.getAllFijos().subscribe(result => {
  //     this.pruebafijo = result.rows;
  //     console.log(this.pruebafijo);
  //     this.dataSource1.data = [];
  //     this.dataSource1.data = this.pruebafijo;
  //     console.log(this.pruebafijo)
  //   });
  // }



  funcion(){
    this.showModal();
    this.generatePDF();
  }

  generatePDF() {
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('recibo pdf!!').bold().italics().end
    );
    pdf.create().open(); 

    
  }

  showModal(){
    Swal.fire({
      title: 'Desea procesar prestación social?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, procesar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Procesado!',
          'Procesada con exito',
          'success'
        )
      }
    })
   }
   

}
