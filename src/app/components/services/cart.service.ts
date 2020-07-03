import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {Cart} from '../models/Cart';
import {JwtResponse} from '../response/JwtResponse';
import {ProductInOrder} from '../models/ProductInOrder';
import {apiUrl} from "../../../environments/environment";
import {doctor} from "../models/doctor.model";
import {Order} from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class CartService {
  private cartUrl = `${apiUrl}/cart`;
    localMap = {};
    private currentUser: JwtResponse;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private userService: UserService) {

        this.userService.currentUser.subscribe(user => this.currentUser = user);

    }

    private getLocalCart(): ProductInOrder[] {

        if (this.cookieService.check('cart')) {
          console.log("getLocalCart check");
            this.localMap = JSON.parse(this.cookieService.get('cart'));
             return Object.values(this.localMap);
        } else {
          console.log("getLocalCart vid");
          this.localMap = {};
            return [];
        }
    }

    getCart(): Observable<ProductInOrder[]> {
      console.log("getCart");
        const localCart = this.getLocalCart();
        if (this.currentUser) {
            if (localCart.length > 0) {
              console.log("post Cart ");
                return this.http.post<Cart>(this.cartUrl, localCart).pipe(
                    tap(_ => {
                        this.clearLocalCart();
                    }),
                    map(cart => cart.products),
                    catchError(_ => of([]))
                );
            } else {
              console.log("get Cart ");

              return this.http.get<Cart>(this.cartUrl).pipe(
                    map(cart => cart.products),
                    catchError(_ => of([]))
                );
            }
        } else {
          console.log("localCart"+localCart);
            return of(localCart);
        }
    }

    addItem(productInOrder): Observable<boolean> {
        if (!this.currentUser) {
          console.log("!this.currentUser");
            if (this.cookieService.check('cart')) {
              console.log("this.cookieService.check");
                this.localMap = JSON.parse(this.cookieService.get('cart'));
              console.log("check  this.localMap"+ this.localMap);

            }
            if (!this.localMap[productInOrder.productId]) {
              console.log("!this.localMap[productInOrder.productId]");
              this.localMap[productInOrder.productId] = productInOrder;
              console.log("this.localMap"+ this.localMap[productInOrder.productId]);
              console.log("this.localMap"+productInOrder.productId);

            } else {
              console.log("this.localMap[productInOrder.productId]");
              this.localMap[productInOrder.productId].count += productInOrder.count;
              console.log("this.localMap.count"+ this.localMap[productInOrder.productId].count);

            }
            this.cookieService.set('cart', JSON.stringify(this.localMap));
            return of(true);

        } else {

          console.log("this.currentUser"+this.currentUser.id);

          const url = `${this.cartUrl}/add`;
            return this.http.post<boolean>(url, {
                'quantity': productInOrder.count,
                'productId': productInOrder.productId
            });
        }
    }

    update(productInOrder): Observable<ProductInOrder> {

        if (this.currentUser) {
          console.log("this.currentUser update "+this.currentUser.id);

          const url = `${this.cartUrl}/${productInOrder.productId}`;
            return this.http.put<ProductInOrder>(url, productInOrder.count);
        }
    }


    remove(productInOrder) {
        if (!this.currentUser) {
            delete this.localMap[productInOrder.productId];
            return of(null);
        } else {
            const url = `${this.cartUrl}/${productInOrder.productId}`;
            return this.http.delete(url).pipe( );
        }
    }


    checkout(user:Order): Observable<any> {
        const url = `${this.cartUrl}/checkout`;
        console.log("checkout"+user.buyerName);
        return this.http.post(url, user).pipe();
    }

    storeLocalCart() {
        this.cookieService.set('cart', JSON.stringify(this.localMap));
    }

    clearLocalCart() {
        console.log('clear local cart');
        this.cookieService.delete('cart');
        this.localMap = {};
    }

}
