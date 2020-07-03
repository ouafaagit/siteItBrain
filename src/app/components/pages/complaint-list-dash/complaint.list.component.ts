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
import {Complaint} from "../../models/Complaint.model";
@Component({
    selector: 'app-speciality.list',
    templateUrl: './complaint.list.component.html',
    styleUrls: ['./complaint.list.component.css']
})
export class ComplaintListComponent implements OnInit {
  complaints: Complaint[] = [];
  user = new Provider();
  Role = Role;
  t : boolean=true;
  spdel:number;
  constructor(private userService: UserService,
              private providerService: ProviderService,
              private router: Router) {

  }

  ngOnInit(): void {
    const account = this.userService.currentUserValue.id;
    this.providerService.get(account).subscribe(u => {
      console.log("user" + u)
      this.user = u;
      if(this.user.role==Role.ADMIN){
        this.admincomplaints();
      }else if(this.user.role==Role.PROVIDER){
        this.owncomplaint();
      }
      //   this.user = JSON.parse(u);
      // this.user.password = '';
      // console.log("user --" + this.user.email)
    }, e => { console.log(e);

    });

  }
   owncomplaint() {
    this.providerService.getowncomplaint(this.user.id).subscribe(sp => {
        this.complaints = sp;
      },
      e => { console.log(e);
      });
  }
    admincomplaints() {
    this.providerService.AllcomplaintAd().subscribe(sp => {
        console.log("admincomplaints");
        this.complaints = sp;
      },
      e => { console.log(e);
      });
  }


  removeid(id:number){
    console.log("id  delete :"+id);
    this.spdel=id;
  }

  remove() {
    console.log("delete" + this.spdel);
    if (this.user.role === Role.ADMIN) {
      console.log("µµµµROLE ADMIN");
      this.providerService.deletecomplaint(this.spdel).subscribe(_ => {
          this.complaints = this.complaints.filter(e => e.id != this.spdel);
        },
        err => {
        });
    }

  }
}
