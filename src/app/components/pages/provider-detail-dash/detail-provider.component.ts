import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from "../../enum/Role";
import {product} from "../../models/product.model";
import {Complaint} from "../../models/Complaint.model";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {CommonModule} from "@angular/common";
import {Provider} from "../../models/provider.model";
import {ProviderService} from "../../services/providerService";
import {SpecialityService} from "../../services/speciality.service";
import {Speciality} from "../../models/Speciality.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail-provider.component.html',
  styleUrls: ['./detail-provider.component.css']
})
export class DetailProviderComponent implements OnInit {

  provider: Provider;
  complaint: Complaint;
  currentUser: JwtResponse;
  Role = Role;
  spdel: number;
  status: number;
  productsimg:product[]=[];
  products:product[]=[];
  productInfo: product;
  specialities: Speciality[]=[];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  block :boolean;
 prodid : number;
  constructor(private router: Router, private providerService: ProviderService, private userService: UserService, private specialityService: SpecialityService,
              private productService: ProductService,  private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    if(this.currentUser===null){
      this.router.navigate(['/login']);
    }
    if (this.currentUser.role === Role.ADMIN) {
      this.getProvider();

    } else {
      this.router.navigate(['/login']);
    }

  }
  getProvider(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.providerService.getprovider(id).subscribe(
      prod => {
        this.provider = prod;},
      _ => console.log('erreur detail provider')
    );
   this.specialitiesproAd(id);
   this.productsproAd(id);
  }
  specialitiesproAd(id :String){
    this.specialityService.specialitiesproAd(id).subscribe(
      prod => {
        this.specialities = prod;

      },
      _ => console.log('erreur specialitiesproAd ')
    );
  }
  productsproAd(id :String){
    this.productService.productsproAd(id).subscribe(
      prod => {
        this.products = prod;
        if(this.products !=null) {
          this.products.forEach(value => {
            this.productInfo = value;
            console.log("products");
            if (this.productInfo.pr_images[0] != null) {
              this.base64Data = this.productInfo.pr_images[0].picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              this.productInfo.pr_images[0].picByte = this.retrievedImage;
            }
            this.productsimg.push(this.productInfo);
          });

        }
      },
      _ => console.log('erreur detail provider')
    );
  }
  ///////delete speciality///
  removeid(id: number) {
    console.log("id  delete :" + id);
    this.spdel = id;
  }

  remove() {
    console.log("delete" + this.spdel);
    if (this.currentUser.role === Role.ADMIN) {
      console.log("µµµµROLE ADMIN");
      this.specialityService.deletespeciality(this.provider.id, this.spdel).subscribe(_ => {
          this.specialities = this.specialities.filter(e => e.id != this.spdel);
        },
        err => {
        });
    }

  }

  ///////bloquer debloquer user/////
  active(stat: number) {
    console.log(" status :" + stat);
    this.status = stat;

  }

  inactive(stat: number) {
    console.log("status :" + stat);
    this.status = stat;
  }

  action() {
    if (this.status === 2 || this.status === 0) {
     // console.log("Activeprovider" +this.provider.id + this.status);
      this.providerService.Activeprovider(this.provider.id).subscribe(_ => {
          console.log("Activeprovider");
        },
        err => {
        });
    } else {
     // console.log("Desactiveprovider" +this.provider.id + this.status);
      this.providerService.Desactiveprovider(this.provider.id).subscribe(_ => {
          console.log("Desactiveprovider");
        },
        err => {
        });
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
}
