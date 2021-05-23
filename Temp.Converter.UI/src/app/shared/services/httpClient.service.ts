import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.temperatureApi.baseUrl;

@Injectable({ providedIn: 'root' })
export class HttpClientService {

    constructor(private http: HttpClient) { }

    executeGet(route: string, params?: HttpParams): Observable<any> {
        let headers = new HttpHeaders();

        headers.set('Content-Type', 'application/json; charset=utf-8');


        return this.http.get(
            `${baseUrl}${route}`,
            {
                headers: headers,
                params: params
            }
        )
    }
    executePut(urlPath: string, data: any, headers: []): Observable<any> {
        let localHeaders = new HttpHeaders();
        localHeaders = localHeaders.set('Content-Type', 'application/json; charset=utf-8');

        
        return this.http.put(
                `${baseUrl}${urlPath}`,
                JSON.stringify(data),
                {
                    headers: localHeaders
                }
            );
    }

    executePost(urlPath: string, data: any): Observable<any> {
        let localHeaders = new HttpHeaders();
        localHeaders = localHeaders.set('Content-Type', 'application/json; charset=utf-8');

        
        return this.http.post(
                `${baseUrl}${urlPath}`,
                
                JSON.stringify(data),
                {
                    headers: localHeaders
                }
            );
    }
}