import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPhotoService {

  constructor(private http: HttpClient) { }

  getDataFromApi() {
    this.http.get('http://localhost:3000/app').subscribe((data) => {
      console.log(data);
    });
  }

  postData(data: string): Observable<any> {

    const body = { imgBase64: data };
    return this.http.post('http://localhost:3000/app', body);
  }
}
