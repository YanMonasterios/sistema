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
    return this.http.post<any>(`${this.API_FIJOS}fijos/fijos/`,data); 
   }

   updateFijos( data:any,id:any): Observable<any>{
  return this.http.put<any>(`${this.API_FIJOS}fijos/fijos/${id}/`, data);
   } 

   deleteFijos(id:string): Observable<any>{
    return this.http.delete(`${this.API_FIJOS}fijos/fijos/${id}/`);
   }

   public enviarTasa(data:any): Observable<any>{
    return this.http.post<any>(`${this.API_FIJOS}benefits/benefits/`,data); 
   }



  
  
}
