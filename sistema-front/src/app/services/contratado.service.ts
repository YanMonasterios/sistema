// import { Injectable } from "@angular/core";
// import { ResponseI } from '../modelos/response.interface';
// import { loginI } from '../modelos/login.interface';
// import { HttpClient } from '@angular/common/http'
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContratadoServices {

  // url:string = "http://localhost:8000/usuario";


//   constructor(private http:HttpClient) { }
  
//   hired(data:any): Observable <any>{
//     return this.http.get<any>(`${this.url}`);
//   }

// } 1

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContratadoServices {

   private API_CONTRATADO = "http://localhost:8000/hired/";

   constructor(private http: HttpClient) {}

   public getAllContratado(): Observable<any>{
    return this.http.get(this.API_CONTRATADO);
   }

   public editContratado(id:string): Observable<any>{
    return this.http.put(this.API_CONTRATADO, id);
   }
  
}

// export class ContratadoServices {

//     constructor(private http: HttpClient) {}

//     public get (url:string){
//       return this.http.get(url);
//     }


// }