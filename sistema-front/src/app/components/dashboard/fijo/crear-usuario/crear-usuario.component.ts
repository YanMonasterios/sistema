import { FijosServices } from 'src/app/services/fijo.service';
import { Data } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  departamento: any[] = ['Operaciones', 'Recursos humanos', 'Finanzas']
  fecha: Date = new Date();
  string = 'date';
  current_timestamp: string = '';
  title = 'sweetAlert';

  constructor(private service: FijosServices) { }

    form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      CI: new FormControl('', [Validators.required]),
      id_department: new FormControl('', [Validators.required]),
      num: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      created_at: new FormControl(`${this.current_timestamp}`),
    })
  

  ngOnInit(): void {
    let date = new Date();
    this.current_timestamp = date.getFullYear() + '-' +  String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    console.log(this.current_timestamp);
    console.log(this.form.value)
  }

  onValue() {
    console.log(this.form.value)
  }

  create() {
    const data = this.form.value
    data.created_at = this.current_timestamp
    console.log(data);
    this.service.createFijos(data).subscribe(data => {
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
