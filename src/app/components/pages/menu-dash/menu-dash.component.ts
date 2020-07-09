import { Component, OnInit } from '@angular/core';
import {Speciality} from "../../models/Speciality.model";
import {UserService} from "../../services/user.service";
import {SpecialityService} from "../../services/speciality.service";

@Component({
  selector: 'app-menu-dash',
  templateUrl: './menu-dash.component.html',
  styleUrls: ['./menu-dash.component.css']
})
export class MenuDashComponent implements OnInit {
  t : boolean=true;
speciality :Speciality;
  constructor(  private specialityService: SpecialityService,) {
    this.speciality=new Speciality();
  }
  ngOnInit(): void {

  }
  Onclick() {
    this.t=false;

  }
  Addspeciality(){
  this.specialityService.addspeciality(this.speciality).subscribe(u => {
    console.log(u.name);
  //this.router.navigate(['/site/login']);
  //this.router.navigate(['/site/home']);
},
e => {});
    this.t=true;
}
}
