import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router'
import { FijoComponent } from '../fijo/fijo.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FijosServices } from 'src/app/services/fijo.service';
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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    console.log(this.data);
    let empleado = this.data
    let date = new Date();
    this.current_timestamp = date.getFullYear() + '-' +  String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    console.log(this.current_timestamp);
    
    console.log(empleado)

    this.form.controls['name'].setValue(empleado.name);
    this.form.controls['last_name'].setValue(empleado.last_name);
    this.form.controls['CI'].setValue(empleado.CI);
    this.form.controls['salary'].setValue(empleado.salary);
    this.form.controls['id_department'].setValue(empleado.id_department);
    // this.form.controls['num'].setValue(id.num);
    this.form.controls['date'].setValue(empleado.date);
   // this.form.controls['created_date'].setValue(id.created_date);
    
  }

  onValue() {
    console.log(this.form.value)
  }

  update() {
    const empleado = this.form.value
    console.log('estoy actualizando')
    empleado.created_at = this.current_timestamp
    console.log(this.data.id);
    this.service.updateFijos(empleado, this.data.id).subscribe(respuesta => {
      console.log(respuesta);
      if (respuesta.message !== undefined){
        Swal.fire(
          'actualizacion realizada',
          '',
          'success'
        )
        this.dialogRef.close()
      }else{
        Swal.fire(
          'No se logro actualizar, comuniquese con el administrador',
          '',
          'error'
        )
        this.dialogRef.close()
      }
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

