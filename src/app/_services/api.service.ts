import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public  POST_SCAN_DROPOFF_CODE = '/api/drop-off/scan-code';
  public  POST_SCAN_DROPOFF_LABEL = '/api/drop-off/scan-label';

  public  GET_ALL_SLOTS = '/api/slots';
  public  POST_ALLOCATE_SLOT = '/api/slots/{id}/allocate';
  public  POST_RELEASE_SLOT = '/api/slots/{id}/release';

  public GET_ALL_SHIPMENTS = '/api/shipments';

  public POST_SCAN_PICKUP_CODE = '/api/pickup/scan-code'

  constructor(  private _http: HttpClient) { }

  sendPost(model,path:string){
    return this._http.post<any>(`http://${environment.apiHost}:${environment.apiPort}${path}`, model, {
      headers : new HttpHeaders({
      "content-type":"application/json",
      "Access-Control-Allow-Origin":"*"
    })})
  }

  sendGet(path:string){
    return this._http.get<any>(`http://${environment.apiHost}:${environment.apiPort}${path}`, {
      headers : new HttpHeaders({
      "content-type":"application/json",
      "Access-Control-Allow-Origin":"*"
    })})
  }

  sendPut(model,path:string){
    return this._http.put<any>(`http://${environment.apiHost}:${environment.apiPort}${path}`, model, {
      headers : new HttpHeaders({
      "content-type":"application/json",
      "Access-Control-Allow-Origin":"*"
    })})
  }
}
