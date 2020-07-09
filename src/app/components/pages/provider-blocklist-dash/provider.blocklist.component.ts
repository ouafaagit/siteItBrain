import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {ProviderService} from "../../services/providerService";

import {Provider} from "../../models/provider.model";
import {Subscription} from "rxjs";
@Component({
    selector: 'app-speciality.list',
    templateUrl: './provider.blocklist.component.html',
    styleUrls: ['./provider.blocklist.component.css']
})
export class ProviderBlocklistComponent implements OnInit {
  user = new Provider();
  Role = Role;
  userdel :number;
  status :number;
  idpro :number;
  page: any;
  private querySub: Subscription;
  constructor(private userService: UserService,private route: ActivatedRoute,
              private providerService: ProviderService,
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
       // this.AllProvidersAd();
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
      this.AllProvidersAd(currentPage, size);
    } else {
      this.AllProvidersAd();
    }
  }
  AllProvidersAd(page: number = 1, size: number = 10) {
    this.providerService.blockedproviders(+page, +size).subscribe(sp => {
        this.page = sp;
      },
      e => { console.log(e);
      });
  }




  ///////supprimer user/////
  removeid(id:number){
    console.log("id  delete :"+id);
    this.userdel=id;
  }
  remove() {
    console.log("delete"+this.userdel);
    this.providerService.deleteprovider(this.userdel).subscribe(_ => {
        this.page = this.page.filter(e => e.id != this.userdel);
      //  this.router.navigate(['/liste-providers']);
      },
      err => {
      });
  }

  ///////bloquer debloquer user/////
  active(stat:number,id:number){
    console.log(" status :"+id);
    this.status=stat;
    this.idpro=id;
  }

  action() {
    console.log("action");
    if(this.status===0)
    {console.log("Activeprovider "+this.status);
      this.providerService.Activeprovider(this.idpro).subscribe(_ => {
          this.page = this.page.filter(e => e.id != this.userdel);
          console.log("getprovide");
        },
        err => {
        });
    }

  }

}










