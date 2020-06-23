import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MediaDevicesService } from '../../services/media-devices.service';
import { ApiPhotoService } from '../../services/api-photo.service';
import QrcodeDecoder from 'qrcode-decoder';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit {


  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  context: CanvasRenderingContext2D;
  imgBase64: string;
  qr = new QrcodeDecoder();
  cameraStream: MediaStream;

  constructor(private mediaDevices: MediaDevicesService,
    private apiPhoto: ApiPhotoService) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    
    this.startup();
  }

  startup(): void {
    this.mediaDevices.getDevices().then((stream) => {
      this.cameraStream = stream;
      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.play();
    })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
  }

  clearPhoto(): void {
    this.context.fillStyle = "#AAA";
    this.context.fillRect(0, 0, this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientWidth);

    this.imgBase64 = '';
    this.qr.stop();
    this.startup();
  }

  takePhoto(ev: any): void {
    const streamSettings = this.cameraStream.getTracks()[0].getSettings();
    if (!!streamSettings) {
      this.canvas.nativeElement.width = streamSettings.width;
      this.canvas.nativeElement.height = streamSettings.height;
      this.context.drawImage(this.video.nativeElement, 0, 0, streamSettings.width, streamSettings.height);
      
      this.imgBase64 = this.canvas.nativeElement.toDataURL('image/png', 0.8);
      this.readQr();
    } else {
      this.clearPhoto();
    }
    ev.preventDefault();
  }

  sendPhoto(): void {
    this.apiPhoto.postData(this.imgBase64).subscribe((data) => {
      this.clearPhoto();
      alert('Відправлено успішно') 
    },
      err => {
        console.log(err);
        alert(JSON.stringify(err.message));
      });;
  }

  readQr(): void {
    this.qr.decodeFromVideo(this.video.nativeElement)
      .then((result) => {
        this.sendPhoto();
      })
      .catch((error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
