import { Component, OnInit } from '@angular/core';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-read-pdf',
  templateUrl: './read-pdf.component.html',
  styleUrls: ['./read-pdf.component.css'],
   providers: [PdfViewerComponent]
})
export class ReadPdfComponent implements OnInit {

 pdfSrc: string = '/pdf-test.pdf';
  page: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
