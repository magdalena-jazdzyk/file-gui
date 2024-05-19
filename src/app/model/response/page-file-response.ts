import {FileResponse} from "./file-response";

export interface PageFileResponse{
  content: FileResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
