import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {UserService} from "../../services/user.service";

import {OrderService} from "../../services/order.service";
import {ProductInOrder} from "../../models/ProductInOrder";
import {Role} from "../../enum/Role";
import {JwtResponse} from "../../response/JwtResponse";

@Component({
  selector: 'app-detail',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  productInfos :ProductInOrder[]=[];
  account :JwtResponse;
  Role = Role;
  constructor(private orderService: OrderService,private route: ActivatedRoute ,private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.account = this.userService.currentUserValue;
      if(this.account.role==Role.PROVIDER){
        console.log("DetailOrderComponent");
     this.orderService.show(this.route.snapshot.paramMap.get('id'),this.account.id).subscribe(prod => this.productInfos=prod,
     _  => {
       console.log("Get Orde Failed")
     }) ;

      }else {
        this.router.navigate(['/login']);
      }

  }

}
