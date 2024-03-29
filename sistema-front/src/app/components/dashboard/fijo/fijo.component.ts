import {AfterViewInit, ViewChild, Component, Input, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {FijosServices} from '../../../services/fijo.service';
import { BenefitsServices  } from 'src/app/services/prestaciones.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditComponent } from '../edit/edit.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { prestacionComponent } from '../prestaciones/prestacion.component';
import { Router, RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import Swal from 'sweetalert2';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MesTasaComponent } from '../mes-tasa/mes-tasa.component';
import { VacacionesComponent } from './../vacaciones/vacaciones.component';

@Component({
  selector: 'app-fijo',
  templateUrl: './fijo.component.html',
  styleUrls: ['./fijo.component.css']
})

export class FijoComponent  {

  fijo: any[] = [];
  dataSource = new MatTableDataSource(this.fijo);
  @Input () displayedColumns: string[] = [ 'id','name', 'last_name', 'CI','id_department','salary','date','eliminar', 'editar', 'prestacion social'];

@ViewChild(MatPaginator) paginator!: MatPaginator;  
@ViewChild(MatSort) sort!: MatSort;

constructor(private service: FijosServices,
            private services: BenefitsServices,
            private rutas: Router,
            public dialog: MatDialog,
            ) {}
            //public dialog: MatDialog ){}

  //  personal = new FormGroup({
  //     tipo: new FormControl('', [Validators.required]),
  //                     })

ngOnInit(): void {
  
   this.cargarData();
 // this.dataSource.paginator = this.paginator;
 //   console.log(this.personal.value)
 
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}



cargarData(){
  this.service.getAllFijos().subscribe(result => {
    this.fijo = result.rows;
    // console.log(this.fijo);
    this.dataSource.data = [];
    this.dataSource.data = this.fijo;

    
  });
}

tasa(): void{
  const dialogRef = this.dialog.open(MesTasaComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });

}

editar(empleado:any): void{
  console.log(empleado)
  const dialogRef = this.dialog.open(EditComponent, {
   data: empleado
  });
  console.log(empleado)
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.rutas.navigateByUrl('/', { skipLocationChange: true }).then (() => {
      // Swal.fire('Empleado modificado')
      this.rutas.navigate(['/dashboard/fijo'])
    })
  
  });
}

eliminar(id:string){
  console.log(id);

  Swal.fire({
    title: 'estas seguro?',
    text: "Deseas inactivar el empleado?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Inactivar!'
  }).then((result) => {
    if (result.isConfirmed) {
        this.service.deleteFijos(id).subscribe(result =>{
          console.log(result)
        });
    Swal.fire(
      'inactivado!',
      'El empleado ha sido inactivado exitosamente',
      'success'
      )
      this.rutas.navigateByUrl('/', { skipLocationChange: true }).then (() => {
        this.rutas.navigate(['/dashboard/fijo'])
      })
    }
  })

}

prestacion_social(id:number): void{
  console.log(id)
  this.services.setId(id)
   }; 
   
 
 }

