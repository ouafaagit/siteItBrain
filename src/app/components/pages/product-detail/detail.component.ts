import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

import {CookieService} from 'ngx-cookie-service';
import {product} from "../../models/product.model";
import {Complaint} from "../../models/Complaint.model";
import {ImageModel} from "../../models/image.model";
import {first} from "rxjs/operators";
import {Speciality} from "../../models/Speciality.model";
import {DoctorService} from "../../services/doctor.service";
import {SpecialityService} from "../../services/speciality.service";
import {ProductInOrder} from "../../models/ProductInOrder";
import {CartService} from "../../services/cart.service";
import {Cardproduct} from "../../models/cardproduct";
import {WishlistService} from "../../services/wishlist.service";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  title: string;
  count: number;
  productInfo: product;
  complaint: Complaint;
  newcomplaint: Complaint;
  retrievedImage: any;
  retrievedImagee: any=[];
  base64Data: any;
  retrieveResonse: any;
  prodmodal :product;
  specialities :Speciality[]=[];
  prodrelated:Cardproduct[]=[];
  tendancen:Cardproduct[]=[];
  constructor(private cartService: CartService,private wishlistService: WishlistService,
      private productService: ProductService,
      private cookieService: CookieService,
      private route: ActivatedRoute, private specialityService: SpecialityService
  ) {
    this.newcomplaint=new Complaint({});

  }

  ngOnInit() {
    this.getProduct();
    this.loadAllSpecialities();
    this.tendancenew();

  }
  uploadimg( image :ImageModel){
    this.retrieveResonse = image;
    this.base64Data = this.retrieveResonse.picByte;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    // this.retrievedImagee.push(this.retrievedImage);
    console.log("getproductimage"+this.retrievedImage);


  }
//////categories////
  private loadAllSpecialities() {
    this.specialityService.getAllSpeciality().pipe(first()).subscribe(specialities => {
      this.specialities = specialities;
    });
  }

///complaint
  Onclick() {
    this.newcomplaint.status=true;}
  onSubmit() {
    console.log("newcomplaint"+this.newcomplaint);
    this.productService.newComplaint( this.productInfo.id,this.newcomplaint);
        this.getProduct();
    this.newcomplaint=new Complaint({});
    //this.user.speciality=this.speciality;

    //  this.userService.signUp(this.user);
    // this.router.navigate(['/login']);
  }


  addToCart(product :any) {
    this.cartService
      .addItem(new ProductInOrder(product,1))
      .subscribe(
        res => {
          if (!res) {
            console.log('Add Cart failed' + res);
            throw new Error();
          }
          // this.router.navigateByUrl('/cart');
        },
        _ => console.log('Add Cart Failed')
      );
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getDetail(id).subscribe(prod => {
          this.productInfo = prod;
        console.log("produit"+ this.productInfo.nombreVue);
        prod.pr_images.forEach(value => {this.retrieveResonse = value;
          this.base64Data = this.retrieveResonse.picByte;
          console.log("getproductimage"+this.retrieveResonse.name);
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.retrievedImagee.push(this.retrievedImage);
       //   console.log("getproductimage"+this.retrievedImagee[1]);
        });
        this.relatedprod(this.productInfo.speciality.id);

        /*  this.productInfo.images.forEach(value => {
          console.log("produit"+value.name+"byte  :"+value.picByte);
        });*/

    },
  _ => console.log('No product getproduct '));

  }
  ///related product////
  relatedprod(speciality :number) {

    this.productService.relatedprod(speciality).subscribe(sp => {
        this.prodrelated= sp;
          console.log(" relatedprod  :"+speciality);
      },
      e => { console.log(e);
      });
  }
/////view product///
  view(id:number)
  {
    this.productService.quickview(id).subscribe(prod => {
      this.prodmodal = prod;
      console.log("produit"+ this.prodmodal.nombreVue);});

  }
  /////wishlist////


  addTowishlist(product :any) {
    this.wishlistService
      .addItem(new ProductInOrder(product,1))
      .subscribe(
        res => {
          console.log(" addToCart "+res);
          if (!res) {
            console.log('Add Cart failed' + res);
            throw new Error();
          }
          // this.router.navigateByUrl('/cart');
        },
        _ => console.log('Add Cart Failed')
      );
  }
  ////tendence/////
  tendancenew() {

    this.productService.tendancnew().subscribe(sp => {
        this.tendancen= sp;
        //  console.log(" tendancnew"+this.logicieln[0].name);
      },
      e => { console.log(e);
      });
  }
}
