import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { CreateRoleComponent } from './users/create-role/create-role.component';
import { NavComponent } from './nav/nav.component';
import { FreeComponent } from './freelance/freelance.component';
import { ContratadoComponent } from './contratado/contratado.component';
import { FijoComponent } from './fijo/fijo.component';
import { EditComponent } from './edit/edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import { CrearUsuarioComponent } from './fijo/crear-usuario/crear-usuario.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsersComponent,
    ReportsComponent,
    CreateUserComponent,
    CreateRoleComponent,
    NavComponent,
    FreeComponent,
    ContratadoComponent,
    FijoComponent,
    EditComponent,
    CrearUsuarioComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatDialogModule,
    MatDatepickerModule,
    MatPaginatorModule, 
    MatTooltipModule, 
    MatSortModule,
    MatSelectModule,

    
  ]
})
export class DashboardModule { }
