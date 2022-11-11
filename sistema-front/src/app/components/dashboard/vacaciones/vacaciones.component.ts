import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VacacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

    form = new FormGroup({
      vacaciones_fracs: new FormControl('', [Validators.required]),
      bono_vacacional: new FormControl('', [Validators.required]),
      vacaciones_vencidas: new FormControl('', [Validators.required]),
      bono_vac_vencidos: new FormControl('', [Validators.required]),
    })

  ngOnInit(): void {
  }

}
