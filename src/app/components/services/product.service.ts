
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Observable, of} from 'rxjs';

import {apiUrl, environment} from "../../../environments/environment";
import {product} from "../models/product.model";
import {catchError} from "rxjs/operators";
import {Complaint} from "../models/Complaint.model";
import {Provider} from "../models/provider.model";

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private http: HttpClient) {
  }


  /////
  /////product quickview-peragraph////
  quickview(id: number): Observable<any> {
    return this.http.get(apiUrl + '/api/product/quickview/'+id);
  }



  ///get products diagnistic home/////

  Diagnostinew(): Observable<any> {
    console.log("Service Diagnostinew ");
    return this.http.get(apiUrl+'/api/product/Diagnostic-new');
  }
  Diagnostivendu(): Observable<any> {
    return this.http.get(apiUrl+'/api/product/Diagnostic-vendu');
  }
  Diagnostiautre(): Observable<any> {
    return this.http.get(apiUrl+'/api/product/Diagnostic-autre');
  }

  ///get products logiciel home/////

  logicienew(): Observable<any> {
    return this.http.get(apiUrl+'/api/product/logiciel-new');
  }
  logicievendu(): Observable<any> {
    return this.http.get(apiUrl+'/api/product/logiciel-vendu');
  }
  logicieautre(): Observable<any> {
    return this.http.get(apiUrl+'/api/product/logiciel-autre');

  }
  ///get products tendence home/////

  tendancnew(): Observable<any> {
    return this.http.get(apiUrl+'/api/product/tendence-new');
  }
/*
  tendancvendu(): Observable<any> {
    return this.http.get(apiUrl+'/api/admin/tendence-vendu');
  }
  tendancautre(): Observable<any> {
    return this.http.get(apiUrl+'/api/admin/tendence-autre');
  }
*/

  ////////Doctor//////////
  newComplaint(id: number,complaint: Complaint ): Observable<any> {
    // @ts-ignore
    return this.http.post(apiUrl+ '/api/User/product/'+id+'/Complaint/new', complaint).subscribe(res => {console.log(res); },
      err => console.log('Error Occured duringng uploading: ' + err)
    );

  }
  ////nos produits///
  getAll(page: number, size: number): Observable<any> {
    const url = `${apiUrl}/api/product/Allproducts?page=${page}&size=${size}`;
    return this.http.get(url)
    //return this.http.get(apiUrl+'/api/product/Allproducts')
      .pipe(
        catchError(e => {
          console.log("Getlist//"+e);
          return of(new product({}));
        })
      )
  }

  //////products by speciality/////
  getAllbyspeciality(id:String): Observable<any> {
    //const url = `${this.productUrl}?page=${page}&size=${size}`;
    //return this.http.get(url)
    return this.http.get(apiUrl+'/api/product/Allproducts/'+id)
      .pipe(
        catchError(e => {
          console.log("Getlist//"+e);
          return of(new product({}));
        })
      )
  }
  getAllbyspecialit(id:number,page: number, size: number): Observable<any> {

    const url = `${apiUrl}/api/product/Allproducts/${id}?page=${page}&size=${size}`;

    return this.http.get(url)
      .pipe(
        catchError(e => {
          console.log("Getlist getAllbyspecialit//"+e);
          return of(new product({}));
        })
      )
    //return this.http.get(apiUrl+'/api/product/Allproducts/'+id)

  }
  ///////////new products/////////
  getAllnewprod(page: number, size: number): Observable<any> {
    const url = `${apiUrl+'/api/product/Allnewprod'}?page=${page}&size=${size}`;
    //return this.http.get(url)
    return this.http.get(url)
      .pipe(
        catchError(e => {
          console.log("Getlist getAllnewprod//"+e);
          return of(new product({}));
        })
      )
  }

  ///get products tendence home/////

  relatedprod(speciality :number): Observable<any> {
    return this.http.get(apiUrl+'/api/product/related-product/'+speciality);
  }
  ////////////Admin////////////
  getAllInPage(page: number, size: number): Observable<any> {
    const url = `${apiUrl}/api/product/admin/Allproducts?page=${page}&size=${size}`;
    return this.http.get(url)
    //return this.http.get(apiUrl+'/api/product/admin/Allproducts')
      .pipe(
        catchError(e => {
          console.log("Getlist//"+e);
          return of(new product({}));
        })
      )
  }

  ///get-provider-products for admin/////
  ///all//
  productsproAd(id:String): Observable<any> {
    return this.http.get(apiUrl+'/api/admin/All-products/'+id);
  }
  ///off product
  Desactiveproduct(id:number): any {
    return this.http.delete(apiUrl+'/api/product/admin/block-product/'+id); }

///on product
  Activeproduct(id:number): any {
    return this.http.delete(apiUrl+'/api/product/admin/deblock-product/'+id); }

  ///get product////
  getDetailAd(id: String): Observable<any> {
    return this.http.get(environment.SERVER_API_URL + '/api/product/admin/product/'+id).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new product({}));
      })
    );
  }



  getImage(name: String):Observable<any> {
    return this.http.get(apiUrl + '/api/upload/image/get/' + name);
  }

  /////provider -and user////
  getDetail(id: String): Observable<any> {
    return this.http.get(environment.SERVER_API_URL + '/api/product/show/'+id);
  }
////get for update
  getproductup(id: String): Observable<any> {
    return this.http.get(environment.SERVER_API_URL + '/api/product/get/'+id);
  }
  ////////////////////file- image////////////
  uploadImagee(data: FormData,id: String): any{
    this.http.post(apiUrl+'/api/upload/image/'+ id, data)
      .subscribe(data => {console.log(data);  }, error => console.log(error));
  }
  uploadImage(data: FormData,id: number): any{
    this.http.post(apiUrl+'/api/upload/image/'+ id, data)
      .subscribe(data => {console.log(data);  }, error => console.log(error));
  }
  uploadFile(data: FormData,id: number): any{
    this.http.post(apiUrl+'/api/upload/File/'+ id, data)
      .subscribe(data => {console.log(data);  }, error => console.log(error));
  }
  deleteImage(id: number): Observable<any> {

    return this.http.delete(apiUrl + '/api/upload/delete_Image/'+ id);
  }

  /////////////////////////////////////////////:
 /* getAllProducts(): Promise<Array<productModel>> {
    return this.http.get<Array<productModel>>(environment.SERVER_API_URL + '/api/product').toPromise();
  }

  getAllSpecialities(): Promise<Array<any>> {
    return this.http.get<Array<any>>(environment.SERVER_API_URL + '/api/provider/specialities').toPromise();
  }


  getProduct(id: number): Promise<productModel> {
    return this.http.get<productModel>(environment.SERVER_API_URL + '/api/clients/' + id).toPromise();
  }

  getProvider(id: number): Promise<ProviderModel> {
    alert('Get provider function executed');
    return this.http.get<ProviderModel>(environment.SERVER_API_URL + '/api/provider/getProfil/' + id).toPromise();
  }*/
/*
  createProduct( uploadData: FormData,provider) {
    // @ts-ignore
  /!*  alert('create Product function executed');
    alert('Typeof upload data alert :' + typeof uploadData);
    alert('uploadData.get(images) alert :'+ uploadData.get('images'));
    alert('Typeof uploadData.get(images) alert :' + typeof uploadData.get('images'));
   *!/
   return this.http.post('http://localhost:8080/api/provider/addproduct'+provider,uploadData)
      .subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );
  }*/
  createProduct(provider,uploadData:FormData) {
    // @ts-ignore
    /*  alert('create Product function executed');
      alert('Typeof upload data alert :' + typeof uploadData);
      alert('uploadData.get(images) alert :'+ uploadData.get('images'));
      alert('Typeof uploadData.get(images) alert :' + typeof uploadData.get('images'));
     */
    return this.http.post('http://localhost:8080/api/provider/addproduct',uploadData)
      .subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );
  }
/*
createProduct(uploadData): Observable<any> {
    // @ts-ignore
    alert('create Product function executed');
    alert('Typeof upload data alert :' + typeof uploadData);
    alert('uploadData.get(images) alert :'+ uploadData.get('images'));
    alert('Typeof uploadData.get(images) alert :' + typeof uploadData.get('images'));
    alert('size of uploadData.get(images) from formdata alert :' + uploadData.get('images').lenght);
//    alert('Json Stringify alert :'+JSON.stringify(uploadData.get('images')));
  //  alert('Typeof Json Stringify alert :' + typeof JSON.stringify(uploadData.get('images')));
 //   alert('size of images from formdata alert :' + uploadData.get('images').lenght);
 //   const params = new HttpParams().set("produit",produit).set("images",Data);
     return this.http.post(environment.SERVER_API_URL + '/api/provider/addproduct',uploadData);
   }
*/
  updateProduct(id: number, Product: product): Observable<any> {
    // @ts-ignore
    return this.http.put(environment.SERVER_API_URL + '/api/clients/edit/' + id, Product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(environment.SERVER_API_URL + '/api/clients/delete/' + id);
    alert('Le produit est supprimé !!');
  }

  onUpLoad(uploadData, id: number) {
    return this.http.post('http://localhost:8080/api/image/uploadImage/' + id, uploadData)
      .subscribe(res => {console.log(res); },
        err => console.log('Error Occured duringng uploading: ' + err)
      );

  }

  getProductImage(id: number) {
    // @ts-ignore
    return this.http.get<string>('http://localhost:8080/api/image/uploadImage/' + id, {responseType: 'text'})
      .toPromise();
  }



}
