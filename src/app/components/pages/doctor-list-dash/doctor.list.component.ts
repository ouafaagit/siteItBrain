import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {ProviderService} from "../../services/providerService";
import {doctor} from "../../models/doctor.model";
import {DoctorService} from "../../services/doctor.service";
import {Subscription} from "rxjs";
@Component({
    selector: 'app-speciality.list',
    templateUrl: './doctor.list.component.html',
    styleUrls: ['./doctor.list.component.css']
})
export class DoctorListComponent implements OnInit {
  user = new doctor();
  Role = Role;
  page: any;
  private querySub: Subscription;
  constructor(private userService: UserService,private providerService: ProviderService,private route: ActivatedRoute,
              private  doctorService: DoctorService,
              private router: Router) {
  }

  ngOnInit(): void {
    const account = this.userService.currentUserValue.id;
    this.providerService.get(account).subscribe(u => {
      this.user = u;
      if(this.user.role==Role.ADMIN){
        this.querySub = this.route.queryParams.subscribe(() => {
          this.update();
        });

        //this.AllDoctorsAd();
      }else {
        this.router.navigate(['/login']);
      }

    }, e => { console.log(e);

    });

  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  update() {
    if (this.route.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.AllDoctorsAd(currentPage, size);
    } else {
      this.AllDoctorsAd();
    }
  }
  AllDoctorsAd(page: number = 1, size: number = 10) {
    this.doctorService.AllDoctorsAd(+page, +size).subscribe(sp => {
        this.page = sp;
      },
      e => { console.log(e);
      });
  }

}










