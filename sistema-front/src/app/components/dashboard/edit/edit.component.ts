import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router'
import { FijoComponent } from '../fijo/fijo.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FijosServices } from 'src/app/services/fijo.service';
import { id } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  departamento: any[] = ['Operaciones', 'Recursos humanos', 'Finanzas']
  fecha: Date = new Date();
  string = 'date';
  current_timestamp: string = '';

  constructor(private service: FijosServices, public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

   form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    CI: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    id_department: new FormControl('', [Validators.required]),
    // num: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    // created_date: new FormControl('', [Validators.required]),
  })
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data.id.CI);
    let id = this.data.id
    let date = new Date();
    this.current_timestamp = date.getFullYear() + '-' +  String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    console.log(this.current_timestamp);
    
    console.log(id)

    this.form.controls['name'].setValue(id.name);
    this.form.controls['last_name'].setValue(id.last_name);
    this.form.controls['CI'].setValue(id.CI);
    this.form.controls['salary'].setValue(this.data.id.salary);
    this.form.controls['id_department'].setValue(this.data.id.id_department);
    // this.form.controls['num'].setValue(id.num);
    this.form.controls['date'].setValue(id.date);
    this.form.controls['created_date'].setValue(id.created_date);
    
  }

  onValue() {
    console.log(this.form.value)
  }

  update() {
    const data = this.form.value
    data.created_at = this.current_timestamp
    console.log(data);
    this.service.updateFijos(data, this.data.id).subscribe(data => {
      console.log(data);
    })
   
  }

  showModal(){
    Swal.fire(
      'Personal Registrado!',
      'El personal fue registrado exitosamente!',
      'success'
    )
   }

}

