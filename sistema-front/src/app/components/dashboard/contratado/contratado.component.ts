import {AfterViewInit, ViewChild, Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ContratadoServices} from '../../../services/contratado.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-contratado',
  templateUrl: './contratado.component.html',
  styleUrls: ['./contratado.component.css']
})


export class ContratadoComponent  {
  contratado: any[] = [];
  dataSource = new MatTableDataSource(this.contratado);
  displayedColumns: string[] = ['id','name', 'last_name', 'CI','id_department','num', 'eliminar'];


constructor(private service: ContratadoServices ){}

ngOnInit(): void {
  
  this.cargarData();
}

cargarData(){
  this.service.getAllContratado().subscribe(result => {
    this.contratado = result;
    console.log(this.contratado);
    this.dataSource.data = [];
    this.dataSource.data = this.contratado.slice(0);
  });
}

editar(id:string){
  console.log(id);

}

eliminar(id:string){
console.log(id);
}

}



 

