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

  listUsuarios:Usuario[] = []

  displayedColumns: string[] = ['name', 'last_name', 'CI','id_department','num','date','role','actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _usuarioService: UsuariosService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  EnviarUsuarios(){
    // this.UsuariosService.post('http://localhost:8000/fijos')
    // this.listUsuarios = this._usuarioService.getUsers();
    // this.dataSource = new MatTableDataSource(this.listUsuarios);
  }

  // eliminarUsuario(index:number){
  //   this._usuarioService.deleteUser(index);
  //   this.cargarUsuarios();

  //   this._snackBar.open('Usuario Eliminado','',{
  //     duration: 1500,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom'
  //   });
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
