import {Role} from "../enum/Role";
import {doctor} from "./doctor.model";
import {Provider} from "./provider.model";
import {product} from "./product.model";

export class Speciality {
  id :number;
  name: string;
  priceSpeciality: number;
  status: boolean;
  doctors : doctor[]=[];
  providers : Provider[]=[];
  products : product[]=[];
/*  constructor(obj :any) {
    this.id=obj.id;
    this.name=obj.name;
    this.priceSpeciality=obj.priceSpeciality;
    this.status=obj.status;


  }*/




}
