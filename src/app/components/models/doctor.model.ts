// tslint:disable-next-line:class-name

import {product} from "./product.model";
import {Quotation} from "./Quotation";
import {Speciality} from "./Speciality.model";
import {Role} from "../enum/Role";


export class doctor {
  id :number;

  email: string;
  password: string;
  lastname: string;
  firstname: string;
  status: number;
  phone: string;
  role: string;
  address: string;
  active: boolean;
  speciality: Speciality;
   wishlist:product[];
   orderproduct:product[];
  // cart:Quotation=new Quotation();
  cart:Quotation;


  constructor() {
    this.active = true;
    this.role = Role.DOCTOR;
  }

  /*
  constructor(password :string,email :string,lastname :string, firstname :string, phone :string, speciality :string) {
    //super(password,email,lastname,firstname,phone);
    this.speciality = speciality;
  }*/
}
