import { Component, OnInit } from '@angular/core';
import {doctor} from "../../models/doctor.model";
import {Location} from "@angular/common";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Provider} from "../../models/provider.model";
import {Speciality} from "../../models/Speciality.model";
import {Subscription} from "rxjs";
import {SpecialityService} from "../../services/speciality.service";
import {first} from "rxjs/operators";
import {society} from "../../models/society.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Provider;
  soc: society;
msg:string;
  speciality :Speciality[]=[];
  special:Speciality[]=[];
  private querySub: Subscription;
  total:number;
  page: any;
  constructor( private location: Location,
               private userService: UserService,
               private router: Router, private specialityService: SpecialityService,
               private route: ActivatedRoute) {
    this.user = new Provider();
    //this.user.society = new society();
    this.soc = new society();


  }

  private loadAllSpecialities() {
    this.specialityService.getAllSpeciality().pipe(first()).subscribe(specialities => {
      this.speciality = specialities;
    });
  }

  ngOnInit() {
    this.loadAllSpecialities();
  }
  totalcalcul()
  {this.total=0;
  //this.user.Specialities=special;
  console.log("ff"+this.special);
    this.special.forEach(value => {
    this.total+=value.priceSpeciality});

  }
  onSubmit() {
   // this.user.society=this.soc;
   this.user.pricesubscription=this.total;
   // this.user.Specialities=this.special;
  //  this.userService.signUpprd(this.user,this.special);
    let data = new FormData();
   data.append("user", JSON.stringify(this.user));
    data.append("special", JSON.stringify(this.special));

    this.userService.signUpprd(data);
   /* .subscribe(u => {
        this.router.navigate(['/site/login']);
        //this.router.navigate(['/site/home']);
      },
      e => {});*/
    //this.user.speciality=this.speciality;

    //  this.userService.signUp(this.user);
     this.router.navigate(['/login']);
  }

}
