import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ContactModel} from "../../models/Contact.model";
import {Role} from "../../enum/Role";
import {CartService} from "../../services/cart.service";
import {DoctorService} from "../../services/doctor.service";
import {doctor} from "../../models/doctor.model";
import {JwtResponse} from "../../response/JwtResponse";
import {Order} from "../../models/Order";

@Component({
  selector: 'app-contact',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user= new doctor();
  productInOrders = [];
  currentUser: JwtResponse;
  constructor( private userService: UserService,private router: Router,private cartService: CartService,private Service: DoctorService) {

  }

  ngOnInit(): void {
    const account = this.userService.currentUserValue.id;
    this.currentUser= this.userService.currentUserValue;
    console.log("topbar"+account);
    this.Service.get(account).subscribe( u => {
      console.log("topbar"+u);
      this.user = u;
      this.user.password = '';
      console.log("user --"+this.user.email)
    }, e => {

    });
    this.cartService.getCart().subscribe(prods => {
      this.productInOrders = prods;
    });
  }
  checkout() {
    if (this.currentUser.role!== Role.DOCTOR) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
    } else {
      this.cartService.checkout(new Order(this.user)).subscribe(
        _ => {
          this.productInOrders = [];
        },
        error1 => {
          console.log('Checkout Cart Failed');
        });
      this.router.navigate(['/home']);
    }

  }
}
