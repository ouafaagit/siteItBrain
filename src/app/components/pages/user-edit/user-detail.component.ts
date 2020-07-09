import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Role} from "../../enum/Role";
import {Provider} from "../../models/provider.model";
import {ProviderService} from "../../services/providerService";

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user= new Provider();
    constructor(private userService: UserService,
                private providerService: ProviderService,
                private router: Router) {
    }



    ngOnInit() {
        const account = this.userService.currentUserValue.id;

        this.providerService.get(account).subscribe( u => {
            this.user = u;
            this.user.password = '';
        }, e => {

        });
    }

    onSubmit() {
        this.providerService.update(this.user).subscribe(u => {
            this.userService.nameTerms.next(u.email);
            let url = '/';
            if (this.user.role != Role.PROVIDER) {
                url = '/seller';
            }
            this.router.navigateByUrl(url);
        }, _ => {})
    }

}
