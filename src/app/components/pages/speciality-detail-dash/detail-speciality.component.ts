import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from "../../enum/Role";
import {product} from "../../models/product.model";
import {Complaint} from "../../models/Complaint.model";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {CommonModule} from "@angular/common";
import {SpecialityService} from "../../services/speciality.service";
import {Speciality} from "../../models/Speciality.model";
import {ProviderService} from "../../services/providerService";

@Component({
  selector: 'app-detail',
  templateUrl: './detail-speciality.component.html',
  styleUrls: ['./detail-speciality.component.css']
})
export class DetailSpecialityComponent implements OnInit {
  special: Speciality;
  currentUser: JwtResponse;
  Role = Role;
  block :boolean;
  prodid : number;
  status :number;
  idpro :number;
  constructor(private productService: ProductService, private userService: UserService, private providerService: ProviderService,
              private router: Router,private route: ActivatedRoute, private specialityService: SpecialityService) {
  }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    if(this.currentUser===null){
      this.router.navigate(['/login']);
    }else{
    this.getSpeciality();
    }

  }

  getSpeciality(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log("getSpeciality"+id);
    if(this.currentUser.role===Role.ADMIN) {
      console.log("µµµµROLE ADMIN");
      this.specialityService.getspecialityAd(id).subscribe(
        sp => {
          this.special = sp;
          console.log("µµµµthis.special");
        },
        e => console.log('error'+e)
      );
    }else if(this.currentUser.role===Role.PROVIDER){
      console.log("µµµµROLE PROVIDER");
      this.specialityService.getDetailsp(this.currentUser.id,id).subscribe(sp=> {
          this.special = sp;
          console.log("µµµµthis.special");
        },
        err => { console.log('error'+err);
        });
    }else{
      this.router.navigate(['/login']);
    }

  }
///////bloquer debloquer product/////
  activprod(stat: boolean,id: number) {
    console.log(" status :" + stat);
    this.block = stat;
    this.prodid = id;

  }

  desactiveprod(stat: boolean,id: number) {
    console.log("status :" + stat);
    this.block = stat;
    this.prodid = id;
  }

  actionpro() {
    console.log("block" + this.block);
    if (this.block === false ) {
      this.productService.Desactiveproduct(this.prodid).subscribe(_ => {
          console.log("Activeproduct");
          //  this.router.navigate(['/liste-providers']);
        },
        err => {
        });
    } else {
      this.productService.Activeproduct(this.prodid).subscribe(_ => {
          console.log("Desactiveproduct");
          //  this.router.navigate(['/liste-providers']);
        },
        err => {
        });
    }

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
