import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FijosServices } from './../../../services/fijo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html',
  styleUrls: ['./utilidades.component.css']
})
export class UtilidadesComponent implements OnInit {
  id: any;

  constructor(public dialogRef: MatDialogRef<UtilidadesComponent>,
                   @Inject(MAT_DIALOG_DATA) public data: any,
                             private servicio: FijosServices) { }

  form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    recibi_utilidades: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    console.log(this.data)
  }

  createUtilidades() {
    this.form.patchValue({
      id: this.data.id
    })
    const data = this.form.value
    console.log(data);
    this.servicio.enviarUtilidades(data).subscribe(data => {
      console.log(data);
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
