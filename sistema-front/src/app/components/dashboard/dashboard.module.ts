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
import {prestacionComponent} from './prestaciones/prestacion.component'; 
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HomeComponent } from 'src/app/home/home.component';
import {MatInputModule} from '@angular/material/input';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatButtonModule} from '@angular/material/button';
import { EditCalculoComponent } from './edit-calculo/edit-calculo.component';
import { PdfComponent } from './pdf/pdf.component';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { AnticipoComponent } from './anticipo/anticipo.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { VacacionesComponent } from './vacaciones/vacaciones.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { InactivosComponent } from './inactivos/inactivos.component';
import { MesTasaComponent } from './mes-tasa/mes-tasa.component';
import { ReciboComponent } from './recibo/recibo.component';

// import pdfFonts from "pdfmake/build/vfs_fonts";

// PdfMakeWrapper.setFonts(pdfFonts);

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
    prestacionComponent,
    EditCalculoComponent,
    PdfComponent,
    AnticipoComponent,
    VacacionesComponent,
    InactivosComponent,
    MesTasaComponent,
    ReciboComponent,
    
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
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatTableExporterModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,


    
  ]
})
export class DashboardModule { }
