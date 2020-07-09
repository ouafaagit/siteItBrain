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
@Component({
    selector: 'app-product.list',
    templateUrl: './product.list.component.html',
    styleUrls: ['./product.list.component.css']
})
export class ProductListComponent implements OnInit {
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  productAdd: product = new product({});
  speciality :Speciality[]=[];
  retrievedImagee: any=[];
  productInfo: product;
  productsimg:product[]=[];
  selectedFile: File;
  Role = Role;
  currentUser: JwtResponse;
  page: any;
  products:any;
  prodel:number;
  mt :ImageModel;
  block :boolean;
  prodid : number;
  private querySub: Subscription;
    constructor(private userService: UserService, private router: Router,
                private providerService: ProviderService,
                private productService: ProductService,  private specialityService: SpecialityService,
                private route: ActivatedRoute) {
    }


/*  uploadSubmit(){
    const account = this.userService.currentUserValue.id;
    this.providerService.updateProduct(account,this.productAdd)
      .subscribe(data => {
        console.log(data);
        this.productAdd = data;
        this.uploadImages(this.productAdd.id);
        this.uploadFile(this.productAdd.id);
      }, error => console.log(error));
    // this.uploadImages(2);
    this.productAdd = new product({});
  }
  uploadImages(id: number){
    //console.log(this.selectedFile);
    // let data = new FormData();
    // data.append('File', this.selectedFile, this.selectedFile.name);
    for (let i = 0; i < this.uploader.queue.length; i++) {
      this.fileItem = this.uploader.queue[i]._file;
      if(this.fileItem.size > 10000000){
        alert("Each File should be less than 10 MB of size.");

      }
    }
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      this.fileItem = this.uploader.queue[j]._file;
      console.log(this.fileItem.name);
      //data.append('file', fileItem);
      data.append('imageFile', this.fileItem,this.fileItem.name);
      // data.append('fileSeq', 'seq'+j);
      //data.append( 'dataType', this.uploadForm.controls.type.value);
      //this.uploadFile(data);
      this.Service.uploadImage(data, id);
      // this.http.post(this.SERVER_URL+'/image/uploadd', data)
      // .subscribe(data => {console.log(data);  }, error => console.log(error));
    }
    this.uploader.clearQueue();
  }

  uploadFile(id: number) {
    console.log(this.selectedFile);
    let data = new FormData();
    data.append('File', this.selectedFile, this.selectedFile.name);
    //this.http.post(this.SERVER_URL+'/image/upload', data)
    // .subscribe(data => {console.log(data);  }, error => console.log(error));
    this.Service.uploadFile(data, id);
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  private loadAllSpecialities() {
    this.specialityService.getAllSpeciality().pipe(first()).subscribe(specialities => {
      this.speciality = specialities;
    });
  }*/

  ngOnInit() {
   this.currentUser = this.userService.currentUserValue;
       /* this.querySub = this.route.queryParams.subscribe(() => {
            this.update();
        });*/
   // this.loadAllSpecialities();
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });

    //  this.getProds();
    }
  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }


  update() {
    if (this.route.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProds(currentPage, size);
    } else {
      this.getProds();
    }
  }

   getProds(page: number = 1, size: number = 5) {
    if(this.currentUser.role===Role.PROVIDER){
      this.providerService.getAllInPage(this.currentUser.id,+page, +size)
        .subscribe(page => {
          this.products = page;
          this.products.content.forEach(value => {this.productInfo = value;
            console.log("products");
            /*   this.productInfo.pr_images.forEach(value => {this.retrieveResonse = value;
                 this.base64Data = this.retrieveResonse.picByte;
                 this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                 this.retrievedImagee.add(this.retrievedImage);});*/
            if(this.productInfo.pr_images[0]!=null){
              this.base64Data =this.productInfo.pr_images[0].picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              this.productInfo.pr_images[0].picByte=this.retrievedImage;
            }
            this.productsimg.push(this.productInfo);
          });
        });
    }else if (this.currentUser.role===Role.ADMIN){
      this.productService.getAllInPage(+page, +size)
        .subscribe(page => {
          this.products = page;
          this.products.content.forEach(value => {this.productInfo = value;
            console.log("products");
            /*   this.productInfo.pr_images.forEach(value => {this.retrieveResonse = value;
                 this.base64Data = this.retrieveResonse.picByte;
                 this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                 this.retrievedImagee.add(this.retrievedImage);});*/
            if(this.productInfo.pr_images[0]!=null){
              this.base64Data =this.productInfo.pr_images[0].picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              this.productInfo.pr_images[0].picByte=this.retrievedImage;
            }
            this.productsimg.push(this.productInfo);
          });

        });
    }

  }


  removeid(id:number){
    console.log("id  delete :"+id);
    this.prodel=id;
  }
  remove() {
    console.log("delete"+this.prodel);
    this.providerService.deleteproduct(this.prodel).subscribe(_ => {
       this.products = this.products.filter(e => e.id != this.prodel);
        this.router.navigate(['/liste-product']);
      },
      err => {
      });
   // this.getProds();
  }
  ////
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
/*    update() {
        if (this.route.snapshot.queryParamMap.get('page')) {
            const currentPage = +this.route.snapshot.queryParamMap.get('page');
            const size = +this.route.snapshot.queryParamMap.get('size');
            this.getProds(currentPage, size);
        } else {
            this.getProds();
        }
    }

    getProds(page: number = 1, size: number = 5) {
      if(this.currentUser.role===Role.PROVIDER){
        this.providerService.getAllInPage(this.currentUser.id,+page, +size)
            .subscribe(page => {
                this.page = page;
            });
      }else if (this.currentUser.role===Role.ADMIN){
        this.productService.getAllInPage(+page, +size)
          .subscribe(page => {
            this.page = page;
          });
      }

    }


    remove(productInfos: ProductInfo[], productInfo) {
        this.providerService.deleteproduct(productInfo).subscribe(_ => {
                productInfos = productInfos.filter(e => e.productId != productInfo);
            },
            err => {
            });
    }*/
  getImage(image: ImageModel[]) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    console.log("getimage "+image[0].name);
this.retrieveResonse = image[0];
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    console.log("retrievedImage "+this.retrievedImage );

  }



}
