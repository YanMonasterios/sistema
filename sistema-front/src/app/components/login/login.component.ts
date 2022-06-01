import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {UsuariosService} from '../../services/usuarios.service';
import {loginI} from '../../modelos/login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logo = './assets/img/user.png'
  form: FormGroup;
  loading= false;

  constructor(private api:UsuariosService,
              private router: Router,
              private fb:FormBuilder,
              private _snackBar: MatSnackBar) {
    this.form = fb.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
    })
    // this.onLogin(this.form);
  }

  onLogin(form:any){
    this.api.loginByEmail(form).subscribe(data =>{
      console.log(data);
    })


  }
  // ngOnInit(): void {
  // }

  // ingresar() {

  //   const usuario = this.form.value.usuario;
  //   const password = this.form.value.password;

  //   console.log(usuario);
  //   console.log(password);

  //   if (usuario == 'Drodriguez' && password == '1234'){
  //     this.fakeloading();
  //   } else {
  //     this.error();
  //     this.form.reset();
  //   }
  // }

  // error () {
  //   this._snackBar.open('Usuario o contraseña ingresados son invalidos','',{
  //     duration: 5000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom'
  //   });
  // }

  // fakeloading (){
  //   this.loading = true;
  //   setTimeout(()=>{
  //     this.router.navigateByUrl('/dashboard');
  //   },1500)
  // }

}
