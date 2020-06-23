import { Injectable } from '@angular/core';

@Injectable()
export class MediaDevicesService {

  constructor() { }
// back camera exact: "environment"
  getDevices(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'user' } }, audio: false });
  }
      
}
