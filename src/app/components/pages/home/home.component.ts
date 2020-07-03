import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/product.model";
import {Role} from "../../enum/Role";
import {CartService} from "../../services/cart.service";
import {ProductInOrder} from "../../models/ProductInOrder";
import {Cardproduct} from "../../models/cardproduct";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  diagnosticnew:Cardproduct[]=[];
  diagnosticvendu:Cardproduct[]=[];
  diagnosticautre:Cardproduct[]=[];
  logicieln:Cardproduct[]=[];
  logicielv:Cardproduct[]=[];
  logicielau:Cardproduct[]=[];
  tendancen:Cardproduct[]=[];
  prodmodal :product;

  constructor(private wishlistService: WishlistService,private productService: ProductService ,private cartService: CartService) {
    this.prodmodal=new product({});
  }

  ngOnInit(): void {
    console.log("*********home**");
    this.Diagnosticnew();
    this.logicielnew();
    this.tendancenew();
    console.log("*********Diagnosticvendu**");
    this.Diagnosticvendu();
    this.Diagnosticautre();
    this.logicielautre();
    this.logicielvendu();


  }

/////view product///
  view(id:number)
  {
    this.productService.quickview(id).subscribe(prod => {
      this.prodmodal = prod;
      console.log("quickview"+ this.prodmodal.nombreVue);});

  }
  Diagnosticnew() {

    this.productService.Diagnostinew().subscribe(sp => {
        this.diagnosticnew = sp;
      //  console.log(" Diagnostinew"+this.diagnosticnew[0].name);
      },
      e => { console.log(e);
      });

  }
  Diagnosticvendu() {

    this.productService.Diagnostivendu().subscribe(sp => {
        this.diagnosticvendu=sp ;
        console.log(" Diagnostivendu"+this.diagnosticvendu[0].name);
      },
      e => { console.log(e);
      });
  }
  Diagnosticautre() {

    this.productService.Diagnostiautre().subscribe(sp => {
        this.diagnosticautre = sp;
        console.log(" Diagnostiautre"+this.diagnosticautre[0].name);
      },
      e => { console.log(e);
      });
  }
  logicielnew() {

    this.productService.logicienew().subscribe(sp => {
        this.logicieln = sp;
        console.log(" logicienew"+this.logicieln[0].name);
      },
      e => { console.log(e);
      });}

  logicielvendu() {

    this.productService.logicievendu().subscribe(sp => {
        this.logicielv = sp;
      },
      e => { console.log(e);
      });
  }
  logicielautre() {

    this.productService.logicieautre().subscribe(sp => {
        this.logicielau = sp;
      },
      e => { console.log(e);
      });
  }
  tendancenew() {

    this.productService.tendancnew().subscribe(sp => {
        this.tendancen= sp;
      //  console.log(" tendancnew"+this.logicieln[0].name);
      },
      e => { console.log(e);
      });
  }


  addToCart(product :any) {
    this.cartService
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
