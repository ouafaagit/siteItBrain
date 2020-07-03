import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import { Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {ProviderService} from "../../services/providerService";
import {doctor} from "../../models/doctor.model";
import {DoctorService} from "../../services/doctor.service";
@Component({
    selector: 'app-speciality.list',
    templateUrl: './doctor.list.component.html',
    styleUrls: ['./doctor.list.component.css']
})
export class DoctorListComponent implements OnInit {
  users: doctor[] = [];
  user = new doctor();
  Role = Role;
  constructor(private userService: UserService,private providerService: ProviderService,
              private  doctorService: DoctorService,
              private router: Router) {
  }

  ngOnInit(): void {
    const account = this.userService.currentUserValue.id;
    this.providerService.get(account).subscribe(u => {
      this.user = u;
      if(this.user.role==Role.ADMIN){
        this.AllDoctorsAd();
      }else {
        this.router.navigate(['/login']);
      }

    }, e => { console.log(e);

    });

  }

  AllDoctorsAd() {
    this.doctorService.AllDoctorsAd().subscribe(sp => {
        this.users = sp;
      },
      e => { console.log(e);
      });
  }

}










