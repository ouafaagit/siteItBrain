import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrl, environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {JwtResponse} from '../response/JwtResponse';
import {CookieService} from 'ngx-cookie-service';
import {doctor} from "../models/doctor.model";
import {ContactModel} from "../models/Contact.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUserSubject: BehaviorSubject<JwtResponse>;
    public currentUser: Observable<JwtResponse>;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();
    constructor(private http: HttpClient,
                private cookieService: CookieService) {
        const memo = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
        this.currentUser = this.currentUserSubject.asObservable();
        cookieService.set('currentUser', memo);
    }

    get currentUserValue() {
        return this.currentUserSubject.value;
    }


    login(loginForm): Observable<JwtResponse> {
        const url = `${apiUrl}/api/login`;
        return this.http.post<JwtResponse>(url, loginForm).pipe(
            tap(user => {
              console.log("A"+(user.id)+user.token);
                if (user && user.token) {
                    this.cookieService.set('currentUser', JSON.stringify(user));
                    if (loginForm.remembered) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    console.log((user.id));
                    this.nameTerms.next(user.account);
                    this.currentUserSubject.next(user);
                    return user;
                }
            }),
            catchError(this.handleError('Login Failed', null))
        );
    }

    logout() {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        this.cookieService.delete('currentUser');
    }


  signUp(user: doctor): any {
   // const url = `${apiUrl}/register-Doctor`;
  //  let t: doctor = new doctor("f", "ffffff", "f", "f", "f", "f");

    return this.http.post(apiUrl+'/api/registerDoctor', user);
      //.subscribe(res => {console.log(res); },
     // err => console.log('Error Occured duringng uploading: ' + err));
  }


/*
  signUpprd(user: Provider,special :Speciality[]): any {

    return this.http.post(apiUrl+'/api/register-provider',user + JSON.stringify(special)).subscribe(res => {console.log(res); },
     err => console.log('Error Occured duringng uploading: ' + err));
  }
*/
  //signUpprd(user: Provider,special :Speciality[]): any {
  signUpprd(formData): any {
 // alert(formData.get('user'));
    // const headers=new HttpHeaders();
    // headers.append('Content-Type',' multipart/form-data');
    //let accessToken = this.currentUserValue.token;
    //  const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: accessToken} };
     return this.http.post(apiUrl+'/api/register-provider',formData).subscribe(res => {console.log(res); },
              err => console.log('Error Occured duringng uploading: ' + err))
   /* var client = new XMLHttpRequest();
    client.open("POST", apiUrl+'/api/register-provider');
    client.setRequestHeader("Content-Type", "multipart/form-data; boundary=something");
    return client.send(formData);*/
/*    return this.http.post(apiUrl+'/api/register-provider',formData).subscribe(res => {console.log(res); },
      err => console.log('Error Occured duringng uploading: ' + err))*/
  }


  ////////user-contact//////////
  newcontact(contactModel: ContactModel ): Observable<any> {
    // @ts-ignore
    return this.http.post(apiUrl+ '/api/User/Contact/new', contactModel).subscribe(res => {console.log(res); },
      err => console.log('Error Occured duringng uploading: ' + err)
    );

  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.log(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
