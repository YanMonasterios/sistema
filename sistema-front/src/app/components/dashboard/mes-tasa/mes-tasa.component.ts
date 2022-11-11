import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FijosServices } from 'src/app/services/fijo.service';

@Component({
  selector: 'app-mes-tasa',
  templateUrl: './mes-tasa.component.html',
  styleUrls: ['./mes-tasa.component.css']
})
export class MesTasaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MesTasaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private servicio: FijosServices,private rutas: Router) { }

    form = new FormGroup({
     tasa: new FormControl('', [Validators.required]),
    })

  ngOnInit(): void {
  }

  createTasa() {
    const data = this.form.value
    console.log(data);
    this.servicio.enviarTasa(data).subscribe(data => {
      console.log(data);
      this.rutas.navigateByUrl('/', { skipLocationChange: true }).then (() => {
        this.rutas.navigate(['/dashboard/fijo'])
      })
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
