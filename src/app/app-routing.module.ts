import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from 'src/modules/start-page/components/start-page/start-page.component';
import { CameraComponent } from 'src/modules/camera/components/camera/camera.component';


const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'photo', component: CameraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
