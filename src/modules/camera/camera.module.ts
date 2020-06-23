import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './components/camera/camera.component';
import { MediaDevicesService } from './services/media-devices.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiPhotoService } from './services/api-photo.service';
import { CameraMultiComponent } from './components/camera-multi/camera-multi.component';


@NgModule({
  declarations: [CameraComponent, CameraMultiComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [CameraComponent],
  providers: [MediaDevicesService, ApiPhotoService]
})
export class CameraModule { }
