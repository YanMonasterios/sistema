import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BenefitsServices } from 'src/app/services/prestaciones.service';


@Component({
  selector: 'app-anticipo',
  templateUrl: './anticipo.component.html',
  styleUrls: ['./anticipo.component.css']
})
export class AnticipoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AnticipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private servicio:BenefitsServices) { }

    form = new FormGroup({
      anticipo: new FormControl('', [Validators.required]),
     })

  ngOnInit(): void {
  }

  updateAntcipo() {
    const anticipo = this.form.value
    console.log('estoy actualizando anticipo')
    console.log(this.data.id);
    this.servicio.updateBenefits(anticipo, this.data.id).subscribe(respuesta => {
      console.log(respuesta);
    })
   
  }

}
