import { environment } from './../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatCompletion, Message } from './interfaces/api.interface';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${environment.apiKey}`,
});
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private API = environment.apiURL;
 spinner:boolean=false;
  generateResponse(prompt: string): Observable<any> {
    this.spinner=true;
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };

    /* return  this.httpClient.post<any>(this.API, requestBody,{headers})
    .pipe(map((response: ChatCompletion) => response.choices[0].message)); */

    return this.httpClient
      .post<any>(this.API, requestBody)
      .pipe(tap((req:any)=>{console.log(req);this.spinner=false; return req}),
        map((response: ChatCompletion) => response.choices[0].message.content)
      );
  }
}
