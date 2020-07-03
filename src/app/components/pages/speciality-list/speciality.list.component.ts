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
    templateUrl: './speciality.list.component.html',
    styleUrls: ['./speciality.list.component.css']
})
export class SpecialityListComponent implements OnInit {
  special: Speciality[] = [];
  user = new Provider();
  Role = Role;
  spdel:number;
  t : boolean=true;
  speciality :Speciality;
  constructor(private userService: UserService,
              private providerService: ProviderService,
              private productService: ProductService, private specialityService: SpecialityService,
              private router: Router) {
    this.speciality= new Speciality();
  }

  ngOnInit(): void {
    const account = this.userService.currentUserValue.id;
    this.providerService.get(account).subscribe(u => {
      console.log("user" + u)
      this.user = u;
      if(this.user.role==Role.ADMIN){
        this.adminspeciality();
      }else if(this.user.role==Role.PROVIDER){
        this.ownSpeciality();
      }
      //   this.user = JSON.parse(u);
      // this.user.password = '';
      // console.log("user --" + this.user.email)
    }, e => { console.log(e);

    });

  }
  async ownSpeciality() {
    this.specialityService.getownSpeciality(this.user.id).subscribe(sp => {
        this.special = sp;
        //console.log('special');
        //this.router.navigate(['/site/login']);
        //this.router.navigate(['/site/home']);
      },
      e => { console.log(e);
      });
  }
   async adminspeciality() {
    this.specialityService.AllSpecialityAd().subscribe(sp => {
        this.special = sp;
        //console.log('special');
        //this.router.navigate(['/site/login']);
        //this.router.navigate(['/site/home']);
      },
      e => { console.log(e);
      });
  }
  removeid(id:number){
    console.log("id  delete :"+id);
    this.spdel=id;
  }

  remove() {
    console.log("delete"+this.spdel);
    if(this.user.role===Role.ADMIN) {
      console.log("µµµµROLE ADMIN");
      this.specialityService.deletespecialityAd(this.spdel).subscribe(_ => {
          this.special = this.special.filter(e => e.id != this.spdel);
        },
        err => {
        });
    }else if(this.user.role===Role.PROVIDER){
      console.log("µµµµROLE PROVIDER");
      this.specialityService.deletespeciality(this.user.id,this.spdel).subscribe(_ => {
          this.special = this.special.filter(e => e.id != this.spdel);
        },
        err => {
        });
    }

    // this.getProds();
  }
  ///////modifier speciality ////
  Onclick(id : any) {
    this.t=false;
    this.specialityService.getspeciality(id).subscribe(
      sp => {
        this.speciality = sp;
        console.log("µµµµthis.special");
      },
      e => console.log('error'+e)
    );
  }

  updatespeciality(){

    this.specialityService.updatesp(this.speciality).subscribe(u => {
        console.log(u.name);
        //this.router.navigate(['/site/login']);
        //this.router.navigate(['/site/home']);
      },
      e => {});
    this.t=true;
    this.speciality=new Speciality();
   // this.router.navigate(['/liste-speciality']);
  }
}
