import { Component, OnInit } from '@angular/core';
import {Speciality} from "../../models/Speciality.model";
import {FileUploader} from "ng2-file-upload";
import {product} from "../../models/product.model";
import {Provider} from "../../models/provider.model";
import {UserService} from "../../services/user.service";
import {ProviderService} from "../../services/providerService";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SpecialityService} from "../../services/speciality.service";
import {first} from "rxjs/operators";
import {Location} from "@angular/common";
import {ProductService} from "../../services/product.service";


@Component({
  selector: 'app-menu-provider',
  templateUrl: './menu-provider.component.html',
  styleUrls: ['./menu-provider.component.css']
})
export class MenuProviderComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  total: number;
  id: number;
  selectedFile: File;
  message: string;
  msg: string;
  use: string;
  fileItem: File;
  productAdd: product = new product({});
  user = new Provider();
  provider :Provider;
  t: boolean = true;
  //all
  speciality: Speciality[] = [];
  //own
  special: Speciality[] = [];
  //new
 newspeciality: Speciality[] = [];
 // newspeciality: Speciality;

  constructor(  private location: Location,private userService: UserService,private productService: ProductService,
                private Service: ProviderService, private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private specialityService: SpecialityService) {
    this.provider =new Provider();
  }

  ////Add product/////
  uploadSubmit() {
    this.addproduct();

  }

  addproduct() {
    const account = this.userService.currentUserValue.id;
    this.Service.createProduct(account, this.productAdd).subscribe(data => {
        console.log(data);
        this.productAdd.id = data;
       this.uploadImages(data);
       this.uploadFile(data);
      }, error => console.log(error));
    // this.uploadImages(2);
    this.productAdd = new product({});
  }

  uploadImages(id: number) {
    //console.log(this.selectedFile);
    // let data = new FormData();
    // data.append('File', this.selectedFile, this.selectedFile.name);
    for (let i = 0; i < this.uploader.queue.length; i++) {
      this.fileItem = this.uploader.queue[i]._file;
      if (this.fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");

      }
    }
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      this.fileItem = this.uploader.queue[j]._file;
      console.log(this.fileItem.name);
      //data.append('file', fileItem);
      this.message= this.fileItem.name;
      data.append('imageFile', this.fileItem, this.fileItem.name);
      // data.append('fileSeq', 'seq'+j);
      //data.append( 'dataType', this.uploadForm.controls.type.value);
      //this.uploadFile(data);
      this.productService.uploadImage(data, id);
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
    this.productService.uploadFile(data, id);
  }
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    // this.loadAllSpecialities();
    //const account = this.userService.currentUserValue.account;
    const account = this.userService.currentUserValue.id;
    this.Service.get(account).subscribe(u => {
      console.log("gg" + u)
      this.user = u;
      //   this.user = JSON.parse(u);
      // this.user.password = '';
      // console.log("user --" + this.user.email)
    }, e => {

    });

  }

  //productAdd: productModel= new productModel({});
  updateproduct() {

    const account = this.userService.currentUserValue.id;
    this.Service.updateproduct(account, this.productAdd)
      .subscribe(data => {
        console.log(data);
        this.productAdd = data;
        this.uploadImages(this.productAdd.id);
        this.uploadFile(this.productAdd.id);
      }, error => console.log(error));
    // this.uploadImages(2);
    this.productAdd = new product({});
  }
/////Add speciality////
  totalcalcul() {
   //  this.total =0;
    this.total =this.user.pricesubscription;
    //this.total +=this.newspeciality.priceSpeciality;
    //this.user.Specialities=special;
    console.log("totalcalcul");
    this.newspeciality.forEach(value => {
      this.total += value.priceSpeciality;
    });

  }
  async  loadAllSpecialities() {
    this.specialityService.shooselist(this.user.id).pipe(first()).subscribe(specialities => {
      this.speciality = specialities;
    });
  }
  listspecialitys() {
    this.ownSpeciality();
    this.loadAllSpecialities();
    this.total = this.user.pricesubscription;
    console.log("initial total"+this.total);
  }
  ownSpeciality() {
    ///alert//
    this.t = false;
    this.specialityService.getownSpeciality(this.user.id).subscribe(sp => {
        this.special = sp;
        //console.log('special');
        //this.router.navigate(['/site/login']);
        //this.router.navigate(['/site/home']);
      },
      e => {
      });
  }

  Addspeciality() {

    //this.user.pricesubscription = this.total;
   // let data= new FormData();
    this.provider.id=this.user.id;
    console.log("this.provider.id "+this.provider.id);
    this.provider.pricesubscription=this.total;
    console.log("this.provider.pricesubscription "+this.provider.pricesubscription);

    //  this.id = 43;
  //  this.total=5000;
   // console.log("id " + this.provider.id+this.provider.pricesubscription);
    //this.msg =" "+this.total;
   //  this.use="rrrrrrrrrrrrrrrrrrrrrrrr";
  //  console.log("$$$$$$$$ " +JSON.stringify(this.provider));
  /*  this.provider.firstname=this.user.firstname;
    this.provider.lastname=this.user.lastname;
    this.provider.status=this.user.status;
    this.provider.Specialities=this.newspeciality;
    this.provider.pricesubscription=this.total;*/

    let data: FormData = new FormData();
    data.append("user",JSON.stringify(this.provider));
    data.append("special",JSON.stringify(this.newspeciality));
    this.specialityService.Addsp(data);
    //this.userService.signUpprd(data);

  // data.append("special", JSON.stringify(this.newspeciality));
  // data.append("total",JSON.stringify(this.total));
   // this.specialityService.Addsp(data);
 //   this.userService.signUpprd(data);signUpprd
   // this.specialityService.Addsp(this.user.id,data);
  //  this.specialityService.Addsp(this.msg);

    ///alert///
    this.t = true;

  }

///alert ////

}
