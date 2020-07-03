import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {ProviderService} from "../../services/providerService";
import {product} from "../../models/product.model";
import {ImageModel} from "../../models/image.model";
import {first} from "rxjs/operators";
import {SpecialityService} from "../../services/speciality.service";
import {Speciality} from "../../models/Speciality.model";
import {FileUploader} from "ng2-file-upload";
import {CommonModule} from "@angular/common";
import {Provider} from "../../models/provider.model";
@Component({
    selector: 'app-speciality.list',
    templateUrl: './provider.noblocklist.component.html',
    styleUrls: ['./provider.noblocklist.component.css']
})
export class ProviderNoblocklistComponent implements OnInit {
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
        this.NoblockedProvidersAd();
      }else {
        this.router.navigate(['/login']);
      }

    }, e => { console.log(e);

    });

  }

  NoblockedProvidersAd() {
    this.providerService.NoblockedProvidersAd().subscribe(sp => {
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

  inactive(stat:number,id:number){
    console.log("status :"+id);
    this.status=stat;
    this.idpro=id;
  }
  action() {
    console.log("action");
      console.log("Desactiveprovider "+this.status);
      this.providerService.Desactiveprovider(this.idpro).subscribe(_ => {
          this.users = this.users.filter(e => e.id != this.userdel);
          console.log("getprovide");
        },
        err => {
        });
    }



}










