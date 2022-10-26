import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-mes-tasa',
  templateUrl: './mes-tasa.component.html',
  styleUrls: ['./mes-tasa.component.css']
})
export class MesTasaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MesTasaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

  ngOnInit(): void {
  }

}
