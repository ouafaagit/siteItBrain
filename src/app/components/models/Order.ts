import {doctor} from "./doctor.model";

export class Order {
    orderId: number;
    userId: number;
    buyerEmail: string;
    buyerName: string;
    buyerPhone: string;
    buyerAddress: string;
    orderAmount: string;
    orderStatus: string;
    createTime: string;
    updateTime: string;
  constructor(user:doctor){
    this.userId=user.id;
    this.buyerEmail=user.email;
    this.buyerAddress=user.address;
    this.buyerName=user.firstname+" "+user.lastname;
    this.buyerPhone=user.phone;
  }
}
