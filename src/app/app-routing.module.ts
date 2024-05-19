import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UploadFileComponent} from "./component/upload-file/upload-file.component";
import {FileTableComponent} from "./component/file-table/file-table.component";
// import {FileManagerComponent} from "./component/file-manager/file-manager.component";


const routes: Routes = [
  {path: '', component: UploadFileComponent},
  {path: 'all', component: FileTableComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
