import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generatePDF() {
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('recibo pdf!!').bold().italics().end
    );
    pdf.create().open(); 


    
  }

}
