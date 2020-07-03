import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subject, Subscription} from "rxjs";
import {ProductInOrder} from "../../models/ProductInOrder";
import {debounceTime, switchMap} from "rxjs/operators";
import {Role} from "../../enum/Role";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-wish',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  productInOrders :ProductInOrder[]=[];

  constructor(private wishlistService: WishlistService,private cartService: CartService,
              private userService: UserService,
              private router: Router) {
    this.userSubscription = this.userService.currentUser.subscribe(user => this.currentUser = user);
  }


  total = 0;
  currentUser: JwtResponse;
  userSubscription: Subscription;

  ngOnInit() {
    this.wishlistService.getwish().subscribe(prods => {
      this.productInOrders = prods;
      console.log("ngOnInit");
      console.log("wish products :"+ this.productInOrders[0].productTyp);
      console.log("wish products :"+ this.productInOrders[0].productName);
      console.log("wish products :"+ this.productInOrders[0].productIcon.id);
      console.log("wish products :"+ this.productInOrders[0].productIcon.picByte);
    });



  }

  ngOnDestroy() {
    if (!this.currentUser) {
      this.wishlistService.storeLocalCart();
    }
    this.userSubscription.unsubscribe();
  }


  addOne(productInOrder) {
    productInOrder.count++;

  }

  minusOne(productInOrder) {
    productInOrder.count--;

  }

  onChange(productInOrder) {

  }
  remove(productInOrder: ProductInOrder) {
    this.wishlistService.remove(productInOrder).subscribe(
      success => {
        this.productInOrders = this.productInOrders.filter(e => e.productId !== productInOrder.productId);
        console.log('wishlist: ' + this.productInOrders);
      },
      _ => console.log('Remove wishlist Failed'));
  }
  addToCart(product :ProductInOrder) {
    this.cartService
      .addItem(product)
      .subscribe(
        res => {
          console.log(" addToCart "+res);
          this.productInOrders = this.productInOrders.filter(e => e.productId !== product.productId);
          console.log('wishlist: ' + this.productInOrders.length);
          if (!res) {
            console.log('Add wishlist failed' + res);
            throw new Error();
          }
          // this.router.navigateByUrl('/cart');
        },
        _ => console.log('Add wishlist Failed')
      );
  }
}

