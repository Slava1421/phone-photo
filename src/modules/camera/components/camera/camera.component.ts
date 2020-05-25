import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MediaDevicesService } from '../../services/media-devices.service';
import { ApiPhotoService } from '../../services/api-photo.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit {


  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('photo') photo: ElementRef;
  @ViewChild('startbutton') startbutton: ElementRef;

  width = 320;    // Этим создадим ширину фотографии
  height = 0;    // Это будет вычисляться на основе входящего потока
  context: CanvasRenderingContext2D;
  streaming = false;
  imgBase64: string;

  constructor(private mediaDevices: MediaDevicesService,
    private apiPhoto: ApiPhotoService) {}

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    
    this.video.nativeElement.addEventListener('canplay', (ev) => {
      if (!this.streaming) {
        this.height = this.video.nativeElement.clientHeight / (this.video.nativeElement.clientWidth / this.width);

        this.video.nativeElement.setAttribute('width', this.width);
        this.video.nativeElement.setAttribute('height', this.height);
        this.canvas.nativeElement.setAttribute('width', this.width);
        this.canvas.nativeElement.setAttribute('height', this.height);
        this.streaming = true;
      }
    }, false);
    
    this.startbutton.nativeElement.addEventListener('click', (ev) => {
      
      this.takePhoto();
      ev.preventDefault();
    }, false);
    this.startup();
  }

  startup(): void { 
    
    this.mediaDevices.getDevices().then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });

    this.clearPhoto();
  }

  clearPhoto(): void {
    this.context.fillStyle = "#AAA";
    this.context.fillRect(0, 0, this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientWidth);

    this.imgBase64 = this.canvas.nativeElement.toDataURL('image/png');
    this.photo.nativeElement.setAttribute('src', this.imgBase64);
  }

  takePhoto(): void {
    if (this.width && this.height) {
      this.canvas.nativeElement.width = this.width;
      this.canvas.nativeElement.height = this.height;
      this.context.drawImage(this.video.nativeElement, 0, 0, this.width, this.height);

      this.imgBase64 = this.canvas.nativeElement.toDataURL('image/png', 0.1);
      this.photo.nativeElement.setAttribute('src', this.imgBase64);
    } else {
      this.clearPhoto();
    }
  }

  sendPhoto(): void {
    this.apiPhoto.postData(this.imgBase64).subscribe((data) => {
      console.log(data);
    },
    err => {
      console.log(err);
    });;
  }
}
