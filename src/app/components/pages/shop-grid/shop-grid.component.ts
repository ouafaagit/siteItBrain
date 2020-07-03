import { Component, OnInit } from '@angular/core';
import {Speciality} from "../../models/Speciality.model";
import {first} from "rxjs/operators";
import {CartService} from "../../services/cart.service";
import {ProductService} from "../../services/product.service";
import {SpecialityService} from "../../services/speciality.service";
import {product} from "../../models/product.model";
import {ProductInOrder} from "../../models/ProductInOrder";
import {Cardproduct} from "../../models/cardproduct";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css']
})
export class ShopGridComponent implements OnInit {
  specialities :Speciality[]=[];
  products:Cardproduct[]=[];
  prodmodal :product;
  tendancen:Cardproduct[]=[];
  constructor(private cartService: CartService,private wishlistService: WishlistService,
              private productService: ProductService, private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.loadAllSpecialities();
    this.getProds();
    this.tendancenew();
  }
//////categories////
  private loadAllSpecialities() {
    this.specialityService.getAllSpeciality().pipe(first()).subscribe(specialities => {
      this.specialities = specialities;
    });
  }
  ////all///
  async getProds() {

      this.productService.getAll()
        .subscribe(page => {
          this.products = page;

        });


  }
  ////cart ///

  addToCart(produc :any) {
    this.cartService
      .addItem(new ProductInOrder(produc,1))
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


  /////view product///
  view(id:number)
  {
    this.productService.quickview(id).subscribe(prod => {
      this.prodmodal = prod;
      console.log("produit"+ this.prodmodal.nombreVue);});

  }
  ///recent product////
  tendancenew() {

    this.productService.tendancnew().subscribe(sp => {
        this.tendancen= sp;
        //  console.log(" tendancnew"+this.logicieln[0].name);
      },
      e => { console.log(e);
      });
  }


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
}

