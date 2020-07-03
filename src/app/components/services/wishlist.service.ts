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
export class WishlistService {
  private wishUrl = `${apiUrl}/api/wishlist`;
    localwish = {};
    private currentUser: JwtResponse;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private userService: UserService) {

        this.userService.currentUser.subscribe(user => this.currentUser = user);

    }

    private getLocalWish(): ProductInOrder[] {

        if (this.cookieService.check('wishlist')) {
          console.log("get local wish check");
            this.localwish = JSON.parse(this.cookieService.get('wishlist'));
             return Object.values(this.localwish);
        } else {
          console.log("getLocalwish vid");
          this.localwish = {};
            return [];
        }
    }

    getwish(): Observable<ProductInOrder[]> {
      console.log("getwish");
        const localCart = this.getLocalWish();
        if (this.currentUser) {
            if (localCart.length > 0) {
              console.log("post Cart ");
                return this.http.post<ProductInOrder[]>(this.wishUrl, localCart).pipe(
                    tap(_ => {
                      this.clearLocalCart();
                    }),
                    map(ProductInOrder => ProductInOrder),
                    catchError(_ => of([]))
                );

            } else {
              console.log("get wish ");

              return this.http.get<any>(this.wishUrl);
              /*  .pipe(
                    map(ProductInOrder => ProductInOrder),
                    catchError(_ => of([]))
                );*/
            }
        } else {
          console.log("localwish"+localCart);
            return of(localCart);
        }
    }

    addItem(productInOrder): Observable<boolean> {
        if (!this.currentUser) {
          console.log("!this.currentUser");
            if (this.cookieService.check('wishlist')) {
              console.log("this.cookieService.check");
                this.localwish = JSON.parse(this.cookieService.get('wishlist'));
              console.log("check  this.localwish"+ this.localwish);

            }
            if (!this.localwish[productInOrder.productId]) {
              console.log("!this.localwish[productInOrder.productId]");
              this.localwish[productInOrder.productId] = productInOrder;
              console.log("this.localwish"+ this.localwish[productInOrder.productId]);
              console.log("this.localwish"+productInOrder.productId);

            } else {
              console.log("this.localwish[productInOrder.productId]");
              this.localwish[productInOrder.productId].count += productInOrder.count;
              console.log("this.localwish.count"+ this.localwish[productInOrder.productId].count);

            }
            this.cookieService.set('wishlist', JSON.stringify(this.localwish));
            return of(true);

        }else {

          console.log("this.currentUser"+this.currentUser.id);
          const url = `${this.wishUrl}/add`;
          return this.http.post<boolean>(url, productInOrder.productId);
        }
    }


    remove(productInOrder) {
        if (!this.currentUser) {
            delete this.localwish[productInOrder.productId];
            return of(null);
        } else {
            const url = `${this.wishUrl}/${productInOrder.productId}`;
            return this.http.delete(url).pipe( );
        }
    }



    storeLocalCart() {
        this.cookieService.set('wishlist', JSON.stringify(this.localwish));
    }

    clearLocalCart() {
        console.log('clear local wishlist');
        this.cookieService.delete('wishlist');
        this.localwish = {};
    }

}
