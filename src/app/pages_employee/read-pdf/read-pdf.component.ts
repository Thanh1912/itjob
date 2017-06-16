import { Component, OnInit } from '@angular/core';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-read-pdf',
  templateUrl: './read-pdf.component.html',
  styleUrls: ['./read-pdf.component.css'],
   providers: [PdfViewerComponent]
})
export class ReadPdfComponent implements OnInit {

 pdfSrc: string = 'http://www.attuneww.com/wp-content/uploads/2016/09/GettingStartedWithAngular2.pdf';
  page: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
