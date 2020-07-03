import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from "../../enum/Role";
import {product} from "../../models/product.model";
import {Complaint} from "../../models/Complaint.model";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-detail',
  templateUrl: './detail-prod.component.html',
  styleUrls: ['./detail-prod.component.css']
})
export class DetailProdComponent implements OnInit {
  title: string;
  count: number;
  productInfo: product;
  complaint: Complaint;
  newcomplaint: Complaint;
  retrievedImage: any;
  retrievedImagee: any=[];
  base64Data: any;
  retrieveResonse: any;
  currentUser: JwtResponse;
  block :boolean;
  prodid : number;
  Role = Role;
  constructor(private productService: ProductService,
              private router: Router,private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    if(this.currentUser===null){
      this.router.navigate(['/login']);
    }else{
      this.getProduct();    }


      //Make a call to Sprinf Boot to get the Image Bytes.
  /*  this.productInfo.images.forEach(value => {
      this.productService.getImage(value.name)
        .subscribe(res => {this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.retrievedImagee.add(this.retrievedImage);
          }
        );
    });*/


  }
///complaint
  onSubmit() {
    this.productService.newComplaint( this.productInfo.id, this.newcomplaint);
        this.getProduct();

    //this.user.speciality=this.speciality;

    //  this.userService.signUp(this.user);
    // this.router.navigate(['/login']);
  }


  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.currentUser.role === Role.PROVIDER) {
      this.productService.getDetail(id).subscribe(
        prod => {
          this.productInfo = prod;
          console.log("produit" + this.productInfo.nombreVue);
          prod.pr_images.forEach(value => {
            this.retrieveResonse = value;
            this.base64Data = this.retrieveResonse.picByte;
            console.log("getproductimage" + this.retrieveResonse.name);
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            this.retrievedImagee.push(this.retrievedImage);
            //   console.log("getproductimage"+this.retrievedImagee[1]);
          });
        },
        _ => console.log('Get Cart Failed')
      );
    }else if(this.currentUser.role === Role.ADMIN)
    {
      this.productService.getDetailAd(id).subscribe(
        prod => {
          this.productInfo = prod;
          console.log("produit" + this.productInfo.nombreVue);
          prod.pr_images.forEach(value => {
            this.retrieveResonse = value;
            this.base64Data = this.retrieveResonse.picByte;
            console.log("getproductimage" + this.retrieveResonse.name);
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            this.retrievedImagee.push(this.retrievedImage);
            //   console.log("getproductimage"+this.retrievedImagee[1]);
          });
        },
        _ => console.log('Get Cart Failed')
      );
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
    }}

}
