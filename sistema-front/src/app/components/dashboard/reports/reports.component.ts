import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FijosServices} from '../../../services/fijo.service';
import { Router, RouterLink } from '@angular/router';
import { EditComponent } from '../edit/edit.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BenefitsServices } from 'src/app/services/prestaciones.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  id: number = 0;
  fijo: any[] = [];
  dataSource = new MatTableDataSource(this.fijo);
  displayedColumns: string[] = [ 'id','name', 'last_name', 'CI','id_department','date', 'recibo'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: FijosServices,
              public dialog: MatDialog,
              private rutas: Router,
              private services: BenefitsServices,
              ) { }


  ngOnInit(): void {
    this.cargarData();
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
  this.service.getAllInactivos().subscribe(result => {
    this.fijo = result.rows;
    console.log(this.fijo);
    this.dataSource.data = [];
    this.dataSource.data = this.fijo;
  });
}

prestacion_social(id:number): void{
  console.log(id)
  this.services.setId(id)
   }; 
   

}
