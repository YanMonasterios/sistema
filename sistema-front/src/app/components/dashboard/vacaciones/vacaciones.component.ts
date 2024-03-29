import { id } from '@swimlane/ngx-datatable';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FijosServices } from './../../../services/fijo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {
  id: any;
  datos: any;

  constructor(public dialogRef: MatDialogRef<VacacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
                             private servicio: FijosServices) { }

    form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      recibi_dias: new FormControl('', [Validators.required]),
      recibi_bono: new FormControl('', [Validators.required]),

    })

  ngOnInit(): void {
    console.log(this.data)
  }

  createVacaciones() {
    this.form.patchValue({
      id: this.data.id
    })
    const data = this.form.value
    console.log(data);
    this.servicio.enviarVacaciones(data).subscribe(data => {
      console.log(data);
      this.datos = data.rows; 
      console.log(this.datos);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tasa agregada con Exito',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
