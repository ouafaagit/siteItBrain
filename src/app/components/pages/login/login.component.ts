import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
//import {AuthenticationService} from "./auth.service";
import {UserService} from "../../services/user.service";
import {Role} from "../../enum/Role";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isInvalid: boolean;
  isLogout: boolean;
  submitted = false;
  model: any = {
    username: '',
    password: '',
    remembered: false
  };

  returnUrl = '/';

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let params = this.route.snapshot.queryParamMap;
    this.isLogout = params.has('logout');
    this.returnUrl = params.get('returnUrl');
  }

  onSubmit() {
    this.submitted = true;
    this.userService.login(this.model).subscribe(
      user => {
        if (user) {
          if (user.role == Role.PROVIDER) {
            this.returnUrl = '/liste-product';
            //this.returnUrl = '/dashboard-fournisseur';
          }else if (user.role === Role.ADMIN) {

            this.returnUrl = '/dashboard';
            this.returnUrl = '/liste-product';
          }else{
            this.returnUrl = '/home';
          }
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.isLogout = false;
          this.isInvalid = true;
        }

      }
    );
  }






  /*  username: string;
    password : string;
    errorMessage = 'Invalid Credentials';
    successMessage: string;
    invalidLogin = false;
    loginSuccess = false;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) {   }

    ngOnInit() {
    }

    handleLogin() {
      this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.router.navigate(['/home']);
      }, () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      });
    }*/

 /* loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({  // Crée une instance de FormGroup
      username: [],                   // Crée une instance de FormControl
      password: [],                   // Crée une instance de FormControl
    });
  }

  login() {
    console.log('Données du formulaire...', this.loginForm.value);
  }*/
}
