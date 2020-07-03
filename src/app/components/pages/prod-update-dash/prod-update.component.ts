import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from "../../enum/Role";
import {product} from "../../models/product.model";
import {Complaint} from "../../models/Complaint.model";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {CommonModule} from "@angular/common";
import {ProviderService} from "../../services/providerService";
import {FileUploader} from "ng2-file-upload";
import {Speciality} from "../../models/Speciality.model";
import {SpecialityService} from "../../services/speciality.service";

@Component({
  selector: 'app-detail',
  templateUrl: './prod-update.component.html',
  styleUrls: ['./prod-update.component.css']
})
export class ProdUpdateComponent implements OnInit {
  public uploaderr: FileUploader = new FileUploader({
    isHTML5: true
  });
  productAdd: product;
  retrievedImage: any;
  retrievedImagee: any=[];
  base64Data: any;
  retrieveResonse: any;
  currentUser: JwtResponse;
  Role = Role;
  fileItem: File;
  selectedFile: File;
  imagedel:number;
  idprod:String;
  //own
  special: Speciality[] = [];
  constructor(private productService: ProductService,private Service: ProviderService,
              private router: Router,private userService: UserService,  private specialityService: SpecialityService, private route: ActivatedRoute) {
this.productAdd=new product({});
  }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    if(this.currentUser===null){
      this.router.navigate(['/login']);
    }else{
      this.getProduct();    }

  }

///// getproduct////
  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
   this.idprod = this.route.snapshot.paramMap.get('id');
    if (this.currentUser.role === Role.PROVIDER) {
      this.productService.getproductup(id).subscribe(
        prod => {
          this.productAdd = prod;
          console.log("produit" + this.productAdd.catalogue);
          prod.pr_images.forEach(value => {
            console.log("id images :"+value.id);
            this.retrieveResonse = value;
            this.base64Data = this.retrieveResonse.picByte;
            console.log("getproductimage" + this.retrieveResonse.name);
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            this.retrievedImagee.push(this.retrievedImage);
            //   console.log("getproductimage"+this.retrievedImagee[1]);
          });
        },
        _ => console.log('Get product Failed')
      );
      this.ownSpeciality();
    }else {
      this.router.navigate(['/login']);
    }
  }
  ///speciality provider///
  ownSpeciality() {

    this.specialityService.getownSpeciality(this.currentUser.id).subscribe(sp => {
        this.special = sp;
        //console.log('special');
        //this.router.navigate(['/site/login']);
        //this.router.navigate(['/site/home']);
      },
      e => {
      });
  }
  //////update
  updateproduct() {
    const account = this.userService.currentUserValue.id;
    this.productAdd.pr_images=[];
   this.productAdd.complaint=null;
    this.productAdd.catalogue=" ";
    this.Service.updateproduct(account, this.productAdd)
      .subscribe(data => {
        console.log(data);
        this.productAdd.id = data;
        this.uploadImages(this.productAdd.id);
        this.uploadFile(this.productAdd.id);
      }, error => console.log(error));
    this.router.navigate(['/dashboard/update-product',this.productAdd.id]);
  }

  uploadImages(id: number) {
    //console.log(this.selectedFile);
    // let data = new FormData();
    // data.append('File', this.selectedFile, this.selectedFile.name);
    for (let i = 0; i < this.uploaderr.queue.length; i++) {
      this.fileItem = this.uploaderr.queue[i]._file;
      if (this.fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
      }
    }
    for (let j = 0; j < this.uploaderr.queue.length; j++) {
      let data = new FormData();
      this.fileItem = this.uploaderr.queue[j]._file;
      console.log(this.fileItem.name);
      data.append('imageFile', this.fileItem, this.fileItem.name);
      this.productService.uploadImage(data, id);

    }
    this.uploaderr.clearQueue();
  }

  uploadFile(id: number) {
    console.log(this.selectedFile);
    let data = new FormData();
    data.append('File', this.selectedFile, this.selectedFile.name);
    this.productService.uploadFile(data, id);
  }
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
///////supprimer image/////
  removeid(id:number){
    console.log("idimage delete :"+id);
    this.imagedel=id;
  }
  remove() {
    console.log("delete"+this.imagedel);
    this.productService.deleteImage(this.imagedel).subscribe(_ => {
      //  this.retrievedImagee = this.retrievedImagee.filter(e => e.id != this.imagedel);
        this.router.navigate(['/dashboard/update-product',this.productAdd.id]);
      //  this.imagedel=0;
      },
      err => {
      });
    // this.getProds();
  }
}
