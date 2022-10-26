import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FijosServices} from '../../../services/fijo.service';
import { EditComponent } from '../edit/edit.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inactivos',
  templateUrl: './inactivos.component.html',
  styleUrls: ['./inactivos.component.css']
})
export class InactivosComponent implements OnInit {
  fijo: any[] = [];
  dataSource = new MatTableDataSource(this.fijo);
  displayedColumns: string[] = [ 'id','name', 'last_name', 'CI','id_department','num','date','eliminar', 'editar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: FijosServices,
              public dialog: MatDialog,
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
    this.service.getAllFijos().subscribe(result => {
      this.fijo = result.rows;
      console.log(this.fijo);
      this.dataSource.data = [];
      this.dataSource.data = this.fijo;
    });
  }

  editar(id:string): void{
    const dialogRef = this.dialog.open(EditComponent, {
     data:{ id: id }
    });
    console.log(id)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  
  }
  
  eliminar(id:string){
  console.log(id);
  this.service.getAllFijos().subscribe(result => {
  });
  }

  showModal(){
    Swal.fire({
      title: 'Desea eliminar el empleado?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado el empleado', '', 'info')
      }
    })
  
  }


}
