export interface FileResponse {
  id: number;
  name: string;
  bucket: string;
  s3Key: string;
  fileSize: number;
  mimeType: string;
  uploadDate: Date;
  checksum: string;
}

