import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  fijo: any[] = [];
  dataSource = new MatTableDataSource(this.fijo);
  displayedColumns: string[] = [ 'id','username', 'email'];

@ViewChild(MatPaginator) paginator!: MatPaginator;  
@ViewChild(MatSort) sort!: MatSort;

constructor(private service: UsuariosService,
            ) {}
            //public dialog: MatDialog ){}

ngOnInit(): void {
  
  this.cargarData();
 // this.dataSource.paginator = this.paginator;
 
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
  this.service.getAllUsers().subscribe(result => {
    this.fijo = result.rows;
    console.log(this.fijo);
    this.dataSource.data = [];
    this.dataSource.data = this.fijo;
  });
}

}
