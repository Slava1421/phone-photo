import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post('/app', body,{
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json'              // This is empty
          }
        )
    });

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    
  }
}
