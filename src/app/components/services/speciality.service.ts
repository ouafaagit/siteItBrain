
import {HttpClient} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {doctor} from '../models/doctor.model';
import {apiUrl, environment} from "../../../environments/environment";
import {Speciality} from "../models/Speciality.model";
import {catchError} from "rxjs/operators";
import {product} from "../models/product.model";

// @ts-ignore
@Injectable({providedIn: 'root'})
export class SpecialityService {

  constructor(private http: HttpClient, private router: Router) {
  }


  /*getAllspInPage(page: number, size: number): Observable<any> {
  //  const url = `${this.productUrl}?page=${page}&size=${size}`;
    return this.http.get(apiUrl+'/api/allspecialities?page=${page}&size=${size}')
      .pipe(
        // tap(_ => console.log(_)),
      )
  }*/
   /////Admin //////
  addspeciality(speciality: Speciality): any {
    return this.http.post(apiUrl+'/api/admin/speciality/new', speciality);
  }
  //get//
  getspecialityAd(id: String): Observable<any> {
    return this.http.get(apiUrl + '/api/admin/speciality/'+id);
  }
  //get for update//
  getspeciality(id: String): Observable<any> {
    return this.http.get(apiUrl + '/api/admin/speciality/get/'+id);
  }
  //update ///
  updatesp(speciality: Speciality): any {
    return this.http.put(apiUrl+'/api/admin/speciality/Update', speciality);
  }
  ///all-for admin//
  AllSpecialityAd(): any{
    return this.http.get<Array<Speciality>>(environment.SERVER_API_URL + '/api/admin/Allspecilities');
  }
  ////delete
  deletespecialityAd(id: number): Observable<any> {

    return this.http.delete(apiUrl + '/api/admin/'+id+'/delete');
  }
  ////provider-doctor////
  getAllSpeciality(): any{
    return this.http.get<Array<Speciality>>(environment.SERVER_API_URL + '/api/specialities');
  }
  //get//
  getDetailsp(provider: number, id: String): Observable<any> {
    return this.http.get(apiUrl + '/api/provider/'+provider+'/speciality/Edit/'+id);
  }
  ///get-provider-specialities for admin/////
  ///all//
  specialitiesproAd(id:String): Observable<any> {
    return this.http.get(environment.SERVER_API_URL+'/api/admin/All-specialities/'+id);
  }
  ////provider-speciality////
  getownSpeciality(id: number): any{
    return this.http.get<Array<Speciality>>(environment.SERVER_API_URL + '/api/provider/'+id+'/All-specialities');
  }
  ///shoose_list///dont-work
  shooselist(id: number): any{
  return this.http.get<Array<Speciality>>(environment.SERVER_API_URL + '/api/provider/'+id+'/specialities/list-choose');
}
////provider- delete ///
  deletespeciality(id: number,speciality:number): Observable<any> {

    return this.http.post (apiUrl + '/api/provider/'+id+'/speciality/delete',speciality);
  }


/*
  Addsp(str:string ): any {
    return this.http.post(apiUrl+'/api/provider/speciality/add?user=',str).subscribe(res => {console.log(res); },
      err => console.log('Error Occured duringng uploading: ' + err));
  }*/
/*  Addsp(id: number,formData): any {
    return this.http.post(apiUrl+'/api/provider/speciality/add',formData).subscribe(res => {console.log(res); },
      err => console.log('Error Occured duringng uploading: ' + err));
  }*/
 Addsp(formData): any {
  return this.http.post(apiUrl+'/api/provider/speciality/add',formData).subscribe(res => {console.log(res); },
err => console.log('Error Occured duringng uploading: ' + err));
}
  getAllDoctors(): Observable<any>{
    return this.http.get<Array<doctor>>(environment.SERVER_API_URL + '/api/doctors');
  }

  getDoctor(id: number): Observable<any> {
    return this.http.get<doctor>(environment.SERVER_API_URL + '/api/doctors/' + id);
  }

  createDoctor(doctor: doctor): Observable<doctor> {
    // @ts-ignore
    return this.http.post(environment.SERVER_API_URL + '/api/doctors/add', doctor);
  }
/*
  updateClient(id: number, client: doctorModel): Observable<doctorModel> {
    // @ts-ignore
    return this.http.put(environment.SERVER_API_URL + '/api/clients/edit/' + id, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(environment.SERVER_API_URL + '/api/clients/delete/' + id);
  }
  onUpLoad(uploadData, id: number) {
    return this.http.post('http://localhost:8080/api/clients/file/uploadFile/' + id, uploadData)
      .subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );

  }

  getClientImage(id: number) {
    // @ts-ignore
    return this.http.get<string>('http://localhost:8080/api/clients/file/loadClientImage/' + id, {responseType: 'text'})
      .toPromise();
  }*/

}
