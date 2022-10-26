import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {UsuariosService} from '../../services/usuarios.service';
import {loginI} from '../../modelos/login.interface';
import {ResponseI} from '../../modelos/response.interface'; 
 import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logo = './assets/img/user.png'
  loading= false;

  constructor(private api:UsuariosService,
              private router: Router,
              private fb:FormBuilder,
              private _snackBar: MatSnackBar,
             private toastr: ToastrService
              ) {
   
    // this.onLogin(this.form);
  }
  form = new FormGroup({
    username: new FormControl ('',[Validators.required]),
    password: new FormControl ('',[Validators.required])
  })


  onLogin(){
  
    this.api.login(this.form.value).subscribe(data =>{
      this.toastr.success('Hello world!', 'Toastr fun!');
      console.log(data.token);
      let dataResponse:any = data;
      if(dataResponse.token != ""){
        localStorage.setItem("token",dataResponse.token);
        this.router.navigate(['dashboard']);
        console.log("si paso");
       
      }
    })
  
  }

  error() {
    this._snackBar.open('Usuario o contraseña ingresados son invalidos', '',)
  }

  onLogout(){

    
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
