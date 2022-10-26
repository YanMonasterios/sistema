import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  myDate: Date = new Date();
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }
//   wellcome(){
//  this.toastr.success('Hello world!', 'Toastr fun!');
//   }
}
