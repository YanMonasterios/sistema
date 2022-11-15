import { Injectable } from "@angular/core";
import { ResponseI } from '../modelos/response.interface';
import { loginI } from '../modelos/login.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { id } from "@swimlane/ngx-datatable";

@Injectable({
  providedIn: 'root'
})
export class BenefitsServices {

  id: number = 0;

  private API_BENEFITS = "http://localhost:8000/";


  constructor(private http:HttpClient) { }

  setId(id:number) {
    console.log(this.id)
    this.id = id
    return this.id;
   }

  getId(){
    console.log(this.id)
    return this.id;
   }

  public getAllBenefits(id:any): Observable<any>{
    return this.http.get(`${this.API_BENEFITS}benefits/benefits/${id}/`);
   }
   
   updateBenefits( data:any,id:any): Observable<any>{
  return this.http.put<any>(`${this.API_BENEFITS}benefits/benefits/${id}/`, data);
   } 

  // putFijos(form: FijosI ):Observable<ResponseI>{
  //   let direccion = this.API_FIJOS + "Fijos";
  //   return this.http.put<ResponseI>(direccion, form)
 
  // }

   deleteBenefits(id:number): Observable<any>{
    return this.http.delete(this.API_BENEFITS);
   }

 // public post(API_FIJOS:string,body){
   // return this.http.post(API_FIJOS,body); 

 // }



  
  
}

