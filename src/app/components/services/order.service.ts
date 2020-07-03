import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Order} from "../models/Order";
import {apiUrl} from "../../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orderUrl = `${apiUrl}/order`;

    constructor(private http: HttpClient) {
    }

    getPage(page = 1, size = 10,id : number): Observable<any> {
        return this.http.get(`${this.orderUrl}/+${id}?page=${page}&size=${size}`).pipe();
    }

    show(id,idprovider): any{
     /*   return this.http.get(`${this.orderUrl}/${id}`).pipe(
            catchError(_ => of(null))
        );*/
      return this.http.get(this.orderUrl+'/'+id+'/provider/'+idprovider);
    }

    cancel(id): Observable<Order> {
        return this.http.patch<Order>(`${this.orderUrl}/cancel/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }
ng
    finish(id:number): Observable<Order> {
        return this.http.patch<Order>(`${this.orderUrl}/finish/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }
}
