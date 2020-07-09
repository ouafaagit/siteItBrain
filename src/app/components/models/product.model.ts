// tslint:disable-next-line:class-name
import {Provider} from "./provider.model";
import {ImageModel} from "./image.model";
import {Speciality} from "./Speciality.model";
import {Complaint} from "./Complaint.model";

export class product {
  id: number;
  name: string;
  description: string;
  catalogue: string;
  reference : string;
  nombreVue: number;
  nombrewish: number;
  marque: string;
  blocked: boolean;
 // images:Array<ImageModel>=new Array<ImageModel>();
  pr_images:ImageModel[];
  complaint:Complaint[];
  provider: Provider;
  speciality: Speciality;
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    if(obj.picByte !=null) {
      this.pr_images[0].picByte = obj.picByte;
      this.speciality.name = obj.speciality;
    }else{
      this.catalogue = obj.catalogue;
      this.nombreVue = obj.nombreVue;
      this.marque = obj.marque;
      this.pr_images=obj.pr_images;
      this.provider = obj.provider;
      this.speciality = obj.speciality;

    }

  }
}
