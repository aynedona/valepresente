import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public sendForm(body: any): Observable<any>{
    console.log('body', body)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ANm7jNndLB08Lz5ZkdOzq7X8tfbvHoK30721AOpVkNQG`
    })

    return this.httpClient.post('https://api.meetime.com.br/v2/prospections/cadence/20910/lead?token=ANm7jNndLB08Lz5ZkdOzq7X8tfbvHoK30721AOpVkNQG', body, { headers: headers });
  }
}
