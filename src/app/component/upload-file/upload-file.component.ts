import {Component, OnInit} from '@angular/core';
import {FileService} from "../../service/file.service";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnInit {
  selectedFile: File | undefined;
  response: string | undefined;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files ? event.target.files[0] : undefined;
  }


  uploadFile(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile, 'customer-in-cloud', this.selectedFile.name)
        .pipe(
          catchError(error => {
            console.error('Error uploading file:', error);
            // Handle the error here
            throw error;
          })
        )
        .subscribe(response => {
          console.log('File uploaded successfully:', response);
          // Add any logic you need after the file upload is successful
        });
    } else {
      console.error('No file selected.');
    }

  }

  callTestMethod() {
    this.fileService.invokeTest().pipe(
      tap(data => this.response = data),
      catchError(error => {
        console.error('Błąd:', error);
        this.response = 'Wystąpił błąd podczas parsowania odpowiedzi.';
        return throwError(error);
      })
    )
      .subscribe();
  }


}

