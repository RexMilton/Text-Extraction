import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { EditParentComponent } from './components/edit-parent/edit-parent.component';



const routes: Routes = [
{path:"home",component: FileUploadComponent },
{path:"edit-page",component:EditPageComponent},
{path:"editor",component:EditParentComponent},
{path:"",redirectTo:'home',pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
