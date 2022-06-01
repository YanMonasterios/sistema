import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  listPermisos: any[] = ['Permiso 1', 'Permiso 2'];

  constructor() { }

  ngOnInit(): void {
  }

}
