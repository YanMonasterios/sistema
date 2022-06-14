import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateRoleComponent } from './users/create-role/create-role.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UsersComponent } from './users/users.component';
import { FreeComponent } from './freelance/freelance.component';
import { ContratadoComponent } from './contratado/contratado.component';
import { FijoComponent } from './fijo/fijo.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    { path: '', component: InicioComponent},
    { path: 'users', component: UsersComponent},
    { path: 'create-user', component: CreateUserComponent},
    { path: 'create-role', component: CreateRoleComponent},
    { path: 'reports', component: ReportsComponent},
    { path: 'freelance', component: FreeComponent},
    { path: 'contratado', component: ContratadoComponent},
    { path: 'fijo', component: FijoComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
