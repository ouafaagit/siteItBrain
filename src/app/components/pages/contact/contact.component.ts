import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ContactModel} from "../../models/Contact.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
contact:ContactModel;
  constructor( private userService: UserService,private router: Router) {
    this.contact=new ContactModel({});
  }


  ngOnInit(): void {
  }

  onSubmit() {
    console.log("contact"+this.contact);
    this.userService.newcontact(  this.contact);
 this.router.navigate(['/home']);
    //this.user.speciality=this.speciality;

    //  this.userService.signUp(this.user);
    // this.router.navigate(['/login']);
  }
}
