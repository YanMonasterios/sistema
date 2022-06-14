// import { Injectable } from '@angular/core';
// import { Usuario } from '../interfaces/usuario';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuariosService {

//   listUsuarios: Usuario[] = [
//     {username: "user1", name: 'Carlos', lastname: 'Pacheco', role: 'Analista'},
//     {username: "user2", name: 'Yan', lastname: 'Monasterios', role: 'Gerente'},
//     {username: "user3", name: 'Jose', lastname: 'Leal', role: 'Analista'},
//     {username: "user4", name: 'Alberto', lastname: 'Perez', role: 'Gerente'},
//     {username: "user5", name: 'Javier', lastname: 'Torres', role: 'Analista'},
//     {username: "user6", name: 'Fernando', lastname: 'Liro', role: 'Analista'},
//     {username: "user7", name: 'Mario', lastname: 'Miro', role: 'Analista'},
//     {username: "user8", name: 'Luis', lastname: 'Carranza', role: 'Analista'},
//     {username: "user9", name: 'Jacob', lastname: 'Araujo', role: 'Analista'},
//     {username: "user10", name: 'Alex', lastname: 'Lila', role: 'Analista'}
//   ];

//   constructor() { }

//   getUsers(){
//     return this.listUsuarios.slice();
//   }

//   deleteUser(index:number){
//     console.log("Eliminado")
//   }
// }


import { Injectable } from "@angular/core";
import { ResponseI } from '../modelos/response.interface';
import { loginI } from '../modelos/login.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string = "http://localhost:8000/";


  constructor(private http:HttpClient) { }

  loginByEmail(form:loginI):Observable<ResponseI>{
  let direccion = this.url + "usuario";
  return this.http.post<ResponseI>(direccion,form);

  }
  login(data:any): Observable <any>{
    return this.http.post<any>(`${this.url}`,data);
  }

}
