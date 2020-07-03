// tslint:disable-next-line:class-name
export  class ContactModel {
  id :number;
  email: string;
  name: string;
  message: string;
  objet: string;
  phone : string;
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.objet = obj.objet;
    this.phone = obj.phone;
    this.message = obj.message;

  }
}
