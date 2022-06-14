import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FreeComponent } from './components/dashboard/freelance/freelance.component';
import { ContratadoComponent } from './components/dashboard/contratado/contratado.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  // { path: '', component: LoginComponent},
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
