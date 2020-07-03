import { Component, OnInit } from '@angular/core';
import {Speciality} from "../../models/Speciality.model";
import {Router} from "@angular/router";
import {SpecialityService} from "../../services/speciality.service";
import {first} from "rxjs/operators";
import {UserService} from "../../services/user.service";
import {doctor} from "../../models/doctor.model";
import {DoctorService} from "../../services/doctor.service";
import {Role} from "../../enum/Role";
import {ProductInOrder} from "../../models/ProductInOrder";
import {CartService} from "../../services/cart.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  speciality :Speciality[]=[];
  t : boolean=true;
  user= new doctor();
  Role = Role;
  productInOrders: ProductInOrder[]=[];
  constructor(  private cartService: CartService,private userService: UserService,private router: Router,private Service: DoctorService, private specialityService: SpecialityService) { }

  ngOnInit(): void {

    this.loadAllSpecialities();
    if(this.userService.currentUserValue) {
      const account = this.userService.currentUserValue.id;
      console.log("header" + account);
      this.Service.get(account).subscribe(u => {
       // console.log("header" + u.firstname);
        console.log("header" + u.id);
        this.user = u;
        //   this.special =  this.user.Specialities;
        //   this.user = JSON.parse(u);
        this.user.password = '';
        console.log("user --" + this.user.email)
      }, e => {

      });
    }
    this.cartService.getCart().subscribe(prods => {
      this.productInOrders = prods;

    });

  }
  private loadAllSpecialities() {
    this.specialityService.getAllSpeciality().pipe(first()).subscribe(specialities => {
      this.speciality = specialities;
    });
  }
  /////profile//////////:
  Onclick() {
    if(this.user.id!=0){
      this.t = false;
    }else{
      this.router.navigate(['/login']);
    }
  }

  onSubmitprf() {
    this.Service.update(this.user).subscribe(u => {
      this.userService.nameTerms.next(u.email);
      console.log(u.firstname);

    }, _ => {})
    this.t==true;
  }
  /////////////:carte//////////////::
  remove(productInOrder: ProductInOrder) {
    this.cartService.remove(productInOrder).subscribe(
      success => {
        this.productInOrders = this.productInOrders.filter(e => e.productId !== productInOrder.productId);
        console.log('Cart: ' + this.productInOrders);
      },
      _ => console.log('Remove Cart Failed'));
  }
}
