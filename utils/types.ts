export interface IEvent {
  id: number;
  title: string;
  type: string;
  format: string;
  attend: number;
  eventDate: string;
  note: string;
  status: string;
  priority: number;
  prefecture: string;
  address1: string;
  address2: string;
  imgUrl: string;
  mainImg: number;
  tag: string;
  feature: string;
  benefit: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ICustomer {
  id: number;
  status: string;
  lastName: string;
  firstName: string;
  seiName: string;
  meiName: string;
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
  building: string;
  email: string;
  birthday: string;
  note: string;
  memo: string;
  employee: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IEventDateTime {
  date: string;
  time: number[];
}
