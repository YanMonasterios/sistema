import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  myDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }
//   wellcome(){
//  this.toastr.success('Hello world!', 'Toastr fun!');
//   }
}
