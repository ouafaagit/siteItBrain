import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {doctor} from "../../models/doctor.model";
import {Speciality} from "../../models/Speciality.model";
import {Subscription} from "rxjs";
import {SpecialityService} from "../../services/speciality.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-registerdoctor',
  templateUrl: './registerdoctor.component.html',
  styleUrls: ['./registerdoctor.component.css']
})
export class RegisterdoctorComponent implements OnInit {

  user: doctor;
speciality :Speciality[]=[];
  private querySub: Subscription;
  page: any;
  constructor( private location: Location,
               private userService: UserService,
               private router: Router, private specialityService: SpecialityService,
               private route: ActivatedRoute) {
    this.user = new doctor();

    //this.speciality = new Speciality();

   /* this.specialityService.getAllSpeciality().then(response => {
      for (const resp of response) {
        // this.speciality.push(resp);
        this.speciality.push(resp);
      }*/
      /*  this.querySub = this.route.queryParams.subscribe(() => {
          this.update();
        });*/

   // });

  }
  private loadAllSpecialities() {
    this.specialityService.getAllSpeciality().pipe(first()).subscribe(specialities => {
      this.speciality = specialities;
    });
  }

  ngOnInit() {
   this.loadAllSpecialities();
   // this.speciality.push(this.specialityService.getAllSpeciality());
  /*  this.specialityService.getAllSpeciality().then(response => {
      for (const resp of response) {
        // this.speciality.push(resp);
        this.speciality.push(resp);
      }});*/
  }
  ngOnDestroy(): void {
   // this.querySub.unsubscribe();
  }



  onSubmit() {
    this.userService.signUp(this.user).subscribe(u => {
       this.router.navigate(['/login']);
        //this.router.navigate(['/site/home']);
      },
      e => {});
    //this.user.speciality=this.speciality;

  //  this.userService.signUp(this.user);
   // this.router.navigate(['/login']);
  }

}
