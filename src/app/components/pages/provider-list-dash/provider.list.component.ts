import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {ProviderService} from "../../services/providerService";

import {Provider} from "../../models/provider.model";
@Component({
    selector: 'app-speciality.list',
    templateUrl: './provider.list.component.html',
    styleUrls: ['./provider.list.component.css']
})
export class ProviderListComponent implements OnInit {
  users: Provider[] = [];
  user = new Provider();
  Role = Role;
  userdel :number;
  status :number;
  idpro :number;

  constructor(private userService: UserService,
              private providerService: ProviderService,
              private router: Router) {
  }

  ngOnInit(): void {
    const account = this.userService.currentUserValue.id;
    this.providerService.get(account).subscribe(u => {
      this.user = u;
      if(this.user.role==Role.ADMIN){
        this.AllProvidersAd();
      }else {
        this.router.navigate(['/login']);
      }

    }, e => { console.log(e);

    });

  }

    AllProvidersAd() {
    this.providerService.AllProvidersAd().subscribe(sp => {
        this.users = sp;
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
        this.users = this.users.filter(e => e.id != this.userdel);
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
  inactive(stat:number,id:number){
    console.log("status :"+id);
    this.status=stat;
    this.idpro=id;
  }
  action() {
    console.log("action");
    if(this.status===2||this.status===0)
    {console.log("Activeprovider "+this.status);
      this.providerService.Activeprovider(this.idpro).subscribe(_ => {
          console.log("getprovide");
        },
        err => {
        });
    }else{
      console.log("Desactiveprovider "+this.status);
      this.providerService.Desactiveprovider(this.idpro).subscribe(_ => {
          console.log("getprovide");
        },
        err => {
        });
    }

  }

}










