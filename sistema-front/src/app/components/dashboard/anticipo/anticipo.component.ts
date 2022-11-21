
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
      anticipo: new FormControl(0, [Validators.required]),
     })


  onNoClick(): void {
      this.dialogRef.close();
  }


  ngOnInit(): void {
    console.log(this.data);
    let anticipo = this.data

    console.log(anticipo)
  }

  onValue() {
    console.log(this.form.value)
  }

  updateAnticipo() {
    const anticipo = this.form.value
    console.log(this.data);
    console.log(anticipo);
    this.servicio.updateBenefits(anticipo, this.data).subscribe(respuesta => {
      if(respuesta.total !== undefined){
        this.dialogRef.close();
      }
    })
  }

}
