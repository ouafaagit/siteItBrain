import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Role} from "../../enum/Role";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {OrderStatus} from "../../enum/OrderStatus";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {doctor} from "../../models/doctor.model";


@Component({
  selector: 'app-detail',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy {
  page: any;
  OrderStatus = OrderStatus;
  currentUser: JwtResponse;
  Role = Role;
  order: number;
  constructor(private httpClient: HttpClient,
              private orderService: OrderService,
              private userService: UserService,
              private route: ActivatedRoute
  ) {

  }

  querySub: Subscription;

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    this.querySub = this.route.queryParams.subscribe(() => {
      if(this.currentUser.role==Role.PROVIDER){
        this.update();
      }

    });

  }

  update() {
    let nextPage = 1;
    let size = 10;
    if (this.route.snapshot.queryParamMap.get('page')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page');
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.orderService.getPage(nextPage, size,this.currentUser.id).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }


  cancel(order: number) {
    this.order=order;
  }
  cancelorder(){
    this.orderService.cancel(this.order).subscribe(res => {
      if (res) {
      //  this.order.orderStatus = res.orderStatus;
      }
    });

  }

  finish(order: number) {
    this.order=order;
    console.log("finichorder"+this.order);
  }

  finishorder() {
    console.log("finichorder"+this.order);
    this.orderService.finish(this.order).subscribe(res => {
      if (res) {
       // this.order.orderStatus = res.orderStatus;
      }
    })
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

}
