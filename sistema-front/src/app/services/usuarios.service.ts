

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


  public getAllUsers(): Observable<any>{
    return this.http.get(`${this.url}usuario/`);
   }

  login(data:any): Observable <any>{
    return this.http.post<any>(`${this.url}`,data);
  }

}
