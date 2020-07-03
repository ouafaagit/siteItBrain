import {product} from "./product.model";

export class Complaint {
  id :number;

  email: string;

  name: string;
  message: string;
  objet: string;
  status: boolean=false;
  product : product;
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.objet = obj.objet;
    this.status = obj.complaint;
    this.message = obj.message;

  }
}
