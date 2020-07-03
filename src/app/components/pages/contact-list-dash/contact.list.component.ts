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
import {ContactModel} from "../../models/Contact.model";
@Component({
    selector: 'app-speciality.list',
    templateUrl: './contact.list.component.html',
    styleUrls: ['./contact.list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: ContactModel[] = [];
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
        this.Allcontact();
      }
    }, e => { console.log(e);

    });

  }

  Allcontact() {
    this.providerService.Allcontact().subscribe(sp => {
        console.log("Allcontact");
        this.contacts = sp;
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
      this.providerService.deletecontact(this.spdel).subscribe(_ => {
          this.contacts = this.contacts.filter(e => e.id != this.spdel);
        },
        err => {
        });
    }

  }
}
