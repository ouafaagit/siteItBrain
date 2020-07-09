import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Role} from "../../enum/Role";
import {UserService} from "../../services/user.service";
import {ProviderService} from "../../services/providerService";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SpecialityService} from "../../services/speciality.service";
import {Provider} from "../../models/provider.model";
import {Speciality} from "../../models/Speciality.model";
import {debounceTime, first} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  user= new Provider();
  //speciality :Speciality[]=[];
  //special :Speciality[]=[];
  pass : string;
  p : boolean;
  t : boolean=true;

  constructor( private userService: UserService,private Service: ProviderService)  { }
 /* private loadAllSpecialities() {
    console.log("topbar load sp");
    this.specialityService.getAllSpeciality().pipe(first()).subscribe(specialities => {
      this.speciality = specialities;
    });
  }*/
  @ViewChild('alert', { static: true }) alert: ElementRef;
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  Onclick() {
      this.t = false;
  }
  Onclickk() {
    this.t==true;
/*   if(this.t==true){
     this.t=true;
   }
   else{
     this.t=true;}*/
   /* if(this.t==true){
      this.t=false;
    }
    if(this.t==false) {
      this.t=true;}*/

  }
  ngOnInit(): void {
  //  this.loadAllSpecialities();
    const account = this.userService.currentUserValue.id;
    this.pass=" ";

    console.log("topbar"+account);
    this.Service.get(account).subscribe( u => {
      console.log("topbar"+u);
      this.user = u;
       this.user.password = '';
      console.log("user --"+this.user.email)
    }, e => {

    });
  }
  onSubmitprf() {
/*if( this.user.password ===''){
  console.log('pass');
  this.user.password=" ";
}*/
    this.Service.update(this.user).subscribe(u => {
      this.userService.nameTerms.next(u.email);
      console.log(u.name);

 // this.t=false;
    //  let url = '/';
        // url = '/seller';
    //  this.router.navigateByUrl(url);
    }, _ => {})
    this.t==true;
  }
}
