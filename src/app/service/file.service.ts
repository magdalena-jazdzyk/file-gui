import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpEvent, HttpParams} from "@angular/common/http";
import {PageFileResponse} from "../model/response/page-file-response";
import {FileResponse} from "../model/response/file-response";
import { FileMoveToTrashRequest } from '../model/request/file-move-to-trash-request';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) {

  }

  private baseUrl = 'http://localhost:8080/api/v1/file';

  uploadFile(file: File, bucketName: string, key: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('bucketName', bucketName);
    formData.append('key', key);

    const uploadUrl = `${this.baseUrl}`;

    return this.httpClient.post(uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  moveToTrash(request: FileMoveToTrashRequest): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/move-to-trash`;

    return this.httpClient.post(url, request, {
      reportProgress: true,
      observe: 'events'
    });
  }

  invokeTest(): Observable<string> {
    const testUrl = `${this.baseUrl}/test`;

    return this.httpClient.get<string>(testUrl);
  }

  getAllFiles(page: number = 0, size: number = 10): Observable<PageFileResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<any>(`${this.baseUrl}/all`, {params})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getFileById(id: number): Observable<FileResponse> {
    return this.httpClient.get<FileResponse>(`${this.baseUrl}/${id}`);
  }

}

