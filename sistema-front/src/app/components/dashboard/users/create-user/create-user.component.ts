import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  listRoles: any[] = ['Administrador', 'Gerente Administración', 'Analista Administración', 'Gerente Contabilidad', 'Analista Contabilidad'];

  constructor() { }

  ngOnInit(): void {
  }

}
