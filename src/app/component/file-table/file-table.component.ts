import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from "../../service/file.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { PageFileResponse } from "../../model/response/page-file-response";
import {MatTableDataSource} from "@angular/material/table";
import {FileResponse} from "../../model/response/file-response";
import { HttpErrorResponse } from '@angular/common/http';
import { FileMoveToTrashRequest } from "../../model/request/file-move-to-trash-request";

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.css'
})
export class FileTableComponent implements OnInit {

  dataSource: MatTableDataSource<FileResponse> = new MatTableDataSource<FileResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'bucket', 'uploadDate','actions'];

  files: PageFileResponse = { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };

  pageIndex = 0;
  pageSize = 10; // Domyślna liczba elementów na stronie

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getAllFiles();
  }

  getAllFiles(): void {
    this.fileService.getAllFiles(this.pageIndex, this.pageSize)
      .subscribe(response => {
        this.files = response;
        this.dataSource.data = response.content;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllFiles();
  }

    viewDetails(fileId: number): void {
      console.log("Wyświetl szczegóły pliku o ID:", fileId);
    }

    moveToTrash(s3key: string): void {
    const request: FileMoveToTrashRequest = {
      sourceBucket: 'customer-in-cloud',
      destinationBucket: 'trash-file-aws',
      key: s3key
    };


    this.fileService.moveToTrash(request)
      .subscribe(
        response => {
          console.log('File moved to trash successfully.');
         this.dataSource.data = this.dataSource.data.filter(file=> file.s3Key !== s3key);
        },
        (error: HttpErrorResponse) => {
          console.error('Error moving file to trash:', error);
          // Dodaj odpowiednie działania w przypadku błędu
        }
      );
  }

    getFileById(id: number): void {
    this.fileService.getFileById(id).subscribe((fileResponse: FileResponse) => {
        console.log(fileResponse);
    });
}


}
