import { Injectable } from '@angular/core';
import {product} from "../models/product.model";
import {apiUrl, environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Provider} from "../models/provider.model";
import {Complaint} from "../models/Complaint.model";
import {ContactModel} from "../models/Contact.model";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) {
  }

  //////////////////////////////profile////////////
  update(user: Provider): Observable<Provider> {

    return this.http.put<Provider>(apiUrl+"/api/profile/update", user);    }

  get(id: number): Observable<any> {
    // const url = `${apiUrl}/profile/${email}`;
    return this.http.get<any>(apiUrl+"/api/profile/"+id);
  }

  //////////////////product////////////////
  getAllInPage(id: number,page: number, size: number): Observable<any> {
    const url = `${apiUrl}/api/provider/${id}/All-products?page=${page}&size=${size}`;
    return this.http.get(url)
   // return this.http.get(apiUrl+'/api/provider/'+id+'/All-products')
      .pipe(
        // tap(_ => console.log(_)),
      )
  }
 /* getAllInPage(): Promise<Array<product>> {

    return this.http.get<Array<product>>(apiUrl+'/api/provider/{id}/All-products').toPromise();
  }*/

  getproduct(id: number): Promise<product> {
    return this.http.get<product>(apiUrl + '/api/product/delete_product/'+ id).toPromise();
  }

  deleteproduct(id: number): Observable<any> {

    return this.http.delete(apiUrl + '/api/product/delete_product/'+ id);
  }


  /*  createProduct(uploadData: FormData) {
      // @ts-ignore
      return this.http.post(apiUrl + '/api/provider/addproduct', uploadData).subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );

    }*/
  createProduct(id: number,product: product ): any {
    return this.http.post(apiUrl+ '/api/provider/'+id+'/product/new', product);
  }

  updateproduct(id: number, product: product): any {
   // return this.http.put(apiUrl + '/api/products/edit/' + id, product);
    return this.http.post(apiUrl+ '/api/provider/'+id+'/product/update', product);
  }
//////////////:Admin////////////
  ///all//
  AllProvidersAd(page: number, size: number): any{
  //  return this.http.get(apiUrl + '/api/admin/Allproviders');
    const url = `${apiUrl}/api/admin/Allproviders?page=${page}&size=${size}`;
    return this.http.get(url);
  }
  ///all-blocked//
  blockedproviders(page: number, size: number): any{
   // return this.http.get(apiUrl + '/api/admin/blocked-providers');
    console.log("blockedproviders");
    const url = `${apiUrl}/api/admin/blocked-providers?page=${page}&size=${size}`;
    return this.http.get(url);
  }
  ///all-notblocked providers//
  NoblockedProvidersAd(page: number, size: number): any{
    //return this.http.get(apiUrl + '/api/admin/Not-blocked-providers');
    const url = `${apiUrl}/api/admin/Not-blocked-providers?page=${page}&size=${size}`;
    return this.http.get(url);
  }
  ///all- new providers//
  AllnewProvidersAd(page: number, size: number): any{
   // return this.http.get(apiUrl + '/api/admin/new-providers');
    const url = `${apiUrl}/api/admin/new-providers?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  ///get provider////
  getprovider(id: String): Observable<any> {
    return this.http.get(apiUrl + '/api/admin/provider/'+id);
  }

///delete provider
  deleteprovider(id: number): Observable<any> {
    console.log("service:"+id);
    return this.http.delete(apiUrl + '/api/admin/delete_provider/'+ id);
  }
///off provider
  Desactiveprovider(id: number): Observable<any> {
    return this.http.delete(apiUrl + '/api/admin/block-provider/'+id);
  }
///on provider
  Activeprovider(id: number): Observable<any> {

    return this.http.delete(apiUrl + '/api/admin/deblock-provider/'+ id);
  }

  ///all complaint-for admin //
  AllcomplaintAd(): any{
    return this.http.get<Array<Complaint>>(apiUrl + '/api/admin/All-Complaints');
  }
////admin- delete complaint///
  deletecomplaint(id: number): Observable<any> {
    return this.http.delete(apiUrl + '/api/admin/complaint/'+id+'/delete');
  }
  ////provider-complaint////
  getowncomplaint(id: number): any{
    return this.http.get<Array<Complaint>>(apiUrl + '/api/provider/'+id+'/All-Complaints');
  }


  //////////admin-contact///////////////////
  ///all contact-for admin //
  Allcontact(): any{
    return this.http.get<Array<ContactModel>>(apiUrl + '/api/admin/All-Contact');
  }
////admin- delete complaint///
  deletecontact(id: number): Observable<any> {
    return this.http.delete(apiUrl + '/api/admin/contact/'+id+'/delete');
  }
////////////////////::::



  onUpLoad(uploadData, id: number) {
    return this.http.post('http://localhost:8080/api/products/file/uploadFile/' + id, uploadData)
      .subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );

  }

  getproductImage(id: number) {
    // @ts-ignore
    return this.http.get<string>('http://localhost:8080/api/products/file/loadproductImage/' + id, {responseType: 'text'})
      .toPromise();
  }

}
