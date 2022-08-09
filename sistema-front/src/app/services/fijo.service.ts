import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseI } from "../modelos/response.interface";

@Injectable({
  providedIn: 'root'
})

export class FijosServices {

   private API_FIJOS = "http://localhost:8000/";

   constructor(private http: HttpClient) {}

   public getAllFijos(): Observable<any>{
    return this.http.get(`${this.API_FIJOS}fijos/fijos/`);
   }
   
   createFijos(data:any): Observable<any>{
    console.log(data) 
    return this.http.post<any>(`${this.API_FIJOS}fijos/fijos/`,data); 
   }

   updateFijos( id:any): Observable<any>{
    console.log(id)   
  return this.http.put<any>(`${this.API_FIJOS}fijos/fijos/${id}`, id);
   } 

  // putFijos(form: FijosI ):Observable<ResponseI>{
  //   let direccion = this.API_FIJOS + "Fijos";
  //   return this.http.put<ResponseI>(direccion, form)
 
  // }

   deleteFijos(id:number): Observable<any>{
    return this.http.delete(this.API_FIJOS);
   }

 // public post(API_FIJOS:string,body){
   // return this.http.post(API_FIJOS,body); 

 // }



  
  
}
