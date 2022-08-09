import { Injectable } from "@angular/core";
import { ResponseI } from '../modelos/response.interface';
import { loginI } from '../modelos/login.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string = "http://localhost:8000/logout";


  constructor(private http:HttpClient) { }

  // loginByEmail(form:loginI):Observable<ResponseI>{
  // let direccion = this.url + "usuario";
  // return this.http.post<ResponseI>(direccion,form);

  // }
  logout(){
   

}
}
