import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subject, Subscription} from "rxjs";
import {ProductInOrder} from "../../models/ProductInOrder";
import {debounceTime, switchMap} from "rxjs/operators";
import {Role} from "../../enum/Role";

@Component({
  selector: 'app-devis',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit, OnDestroy {


  constructor(private cartService: CartService,
              private userService: UserService,
              private router: Router) {
    this.userSubscription = this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  productInOrders :ProductInOrder[]=[];
  total = 0;
  currentUser: JwtResponse;
  userSubscription: Subscription;
  private updateTerms = new Subject<ProductInOrder>();
  sub: Subscription;

  ngOnInit() {
    //this.cartService.getCart().subscribe(prods => {
    this.cartService.getCart().subscribe(prods => {
      this.productInOrders = prods;
      console.log("ngOnInit");
      console.log("carte products :"+ this.productInOrders[0].productTyp);
      console.log("carte products :"+ this.productInOrders[0].productName);
      console.log("carte products :"+ this.productInOrders[0].productIcon.id);
      console.log("carte products :"+ this.productInOrders[0].productIcon.picByte);
    });


    this.sub = this.updateTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      //
      // ignore new term if same as previous term
      // Same Object Reference, not working here
      //  distinctUntilChanged((p: ProductInOrder, q: ProductInOrder) => p.count === q.count),
      //
      // switch to new search observable each time the term changes
      switchMap((productInOrder: ProductInOrder) => this.cartService.update(productInOrder))
    ).subscribe(prod => {
        if (prod) {
          //throw new Error();
          console.log("update "+prod.count);
        }
      },
      _ => console.log('Update Item Failed')

    );
  }

  ngOnDestroy() {
    if (!this.currentUser) {
      this.cartService.storeLocalCart();
    }
    this.userSubscription.unsubscribe();
  }


  addOne(productInOrder) {
    productInOrder.count++;
    if (this.currentUser) { this.updateTerms.next(productInOrder); }
  }

  minusOne(productInOrder) {
    productInOrder.count--;
    if (this.currentUser) { this.updateTerms.next(productInOrder); }
  }

  onChange(productInOrder) {
    if (this.currentUser) { this.updateTerms.next(productInOrder); }
  }
  remove(productInOrder: ProductInOrder) {
    this.cartService.remove(productInOrder).subscribe(
      success => {
        this.productInOrders = this.productInOrders.filter(e => e.productId !== productInOrder.productId);
        console.log('Cart: ' + this.productInOrders);
      },
      _ => console.log('Remove Cart Failed'));
  }

  checkout() {
    if (!this.currentUser||this.currentUser.role !== Role.DOCTOR) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
    } else {
     /* this.cartService.checkout().subscribe(
        _ => {
          this.productInOrders = [];
        },
        error1 => {
          console.log('Checkout Cart Failed');
        });*/
      this.router.navigate(['/']);
    }

  }
}

