
import {HttpClient} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {doctor} from '../models/doctor.model';
import {apiUrl, environment} from "../../../environments/environment";
import {Speciality} from "../models/Speciality.model";
import {Provider} from "../models/provider.model";

// @ts-ignore
@Injectable({providedIn: 'root'})
export class DoctorService {

  constructor(private http: HttpClient, private router: Router) {
  }


  //////////////////////////////profile////////////
  update(user: doctor): Observable<doctor> {

    return this.http.put<doctor>(apiUrl+"/api/Doctor/Profil/update", user);    }

  get(id: number): Observable<any> {
    // const url = `${apiUrl}/profile/${email}`;
    return this.http.get<any>(apiUrl+"/api/Doctor/Profil/"+id);
  }


///////Admin//////////////
  ///all//
  AllDoctorsAd(): any{
    return this.http.get<Array<doctor>>(environment.SERVER_API_URL + '/api/admin/AllDoctors');
  }
//////////////

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
