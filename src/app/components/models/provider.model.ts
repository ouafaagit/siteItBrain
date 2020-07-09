
import {Speciality} from "./Speciality.model";
import {society} from "./society.model";
import {Role} from "../enum/Role";
import {product} from "./product.model";

export class Provider {
  id :number;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  phone: string;
  active: boolean;
  role: string;
  status: number;
  pricesubscription: number;
  type: boolean;
  name: string;
  emailsociety: string;

/*  emailsociety: string;
  numero_tel: string;*/
  //society : society;
 // products :{};
  Specialities :Speciality[];
  products :product[];
  constructor() {
    this.active = true;
    this.status = 2;
    this.role = Role.PROVIDER;
  }

/*
  constructor(password :string, email :string,lastname :string, firstnam :string, phon :string,name :string,
              emailsociety :string,numero_tel :string) {
    super(password,email,lastname,firstnam,phon);
    this.name = name;
    this.emailsociety =emailsociety;
    this.numero_tel =numero_tel;
  }*/

  /*  constructor(obj: any) {
    super();

    this.status = 0;
    this.name = obj.name;
    this.type = obj.type;
    this.emailsociety = obj.emailsociety;
    this.numero_tel = obj.numero_tel;
   // this.Society:obj.Society;
   // products:obj.products;
  }*/
}
