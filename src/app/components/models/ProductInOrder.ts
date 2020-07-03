import {product} from "./product.model";
import {ImageModel} from "./image.model";


export class ProductInOrder {
    productId: number;
  providerId: number;
    productName: string;
  productMarque: string;
  productReference: string;
  productIcon: ImageModel;
  productTyp: string;
    count: number;

    constructor(productInfo:any, quantity = 1){
        this.productId = productInfo.id;
        this.productName = productInfo.name;
        this.productMarque = productInfo.marque;
        this.productReference = productInfo.reference;
      if(productInfo.picByte !=null) {
        this.productIcon = productInfo.picByte;
        this.productTyp = productInfo.speciality;
      }else {
        this.productTyp = productInfo.speciality.name;
        if(productInfo.provider.id!=null){
          this.providerId = productInfo.provider.id;

        }
        this.productIcon = productInfo.pr_images[0];
      }
        this.count = quantity;
    }
}
