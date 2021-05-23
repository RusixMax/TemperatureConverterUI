import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { TemperatureInput } from "../models/tempInputData";
import { HttpClientService } from './httpClient.service';



@Injectable(
    {
        providedIn: 'root'
    }
)
export class SharedService {

    constructor(private httpClient: HttpClientService) { }
    
    getMetaData(): Observable<any> {
        return this.httpClient.executeGet('TemperatureConvert/GetMetaData');        
    }

    getConvertTemperatureData(inputTemperatureData: TemperatureInput): Observable<any> {
        return this.httpClient.executePost(`TemperatureConvert/ConvertTemperatureData`,inputTemperatureData);        
    }
    
}