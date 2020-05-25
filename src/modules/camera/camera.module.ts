import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './components/camera/camera.component';
import { MediaDevicesService } from './services/media-devices.service';



@NgModule({
  declarations: [CameraComponent],
  imports: [
    CommonModule
  ],
  exports: [CameraComponent],
  providers: [MediaDevicesService]
})
export class CameraModule { }
