/**
 * @file http.service.ts
 * @module to make http request
 * @author Madhuri Patil
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }
  public baseUrl: string = environment.baseUrl + "";

  /**function to respond for post call */
  public httpPost(option: any,isAuthRequired:boolean): Observable<{}> {
    console.log("option", option);
    
    var httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    if(isAuthRequired){
      httpAuthOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        })
      };
    }
     
    option.url = this.baseUrl + option.url;
    console.log( option);
    return this.http.post(option.url, option.body, httpAuthOptions)
  }

  /**function to respond for put call */
  public httpPut(option: any): Observable<{}> {
    console.log("option", option);
    
    var httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };    
    option.url = this.baseUrl + option.url;
    return this.http.put(option.url, option.body, httpAuthOptions)
  }

  /**function to respond for get call and return required data*/
  public httpGet(option: any): Observable<any> {
    console.log("option", option);
    
    var httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':  localStorage.getItem('token')
      })
    };    
    
    option.url = this.baseUrl + option.url;
    return this.http.get(option.url, httpAuthOptions)
  }

}
