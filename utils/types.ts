export interface IEvent {
  id: number;
  title: string;
  type: string;
  format: string;
  attend: number;
  eventDate: string;
  note: string;
  status: string;
  statusBit: number;
  priority: number;
  prefecture: string;
  address1: string;
  address2: string;
  hiddenAddress: string;
  mapFormat: string;
  mailFormat: string;
  images: string;
  mainIndex: number;
  FPImages: string;
  tag: string;
  feature: string;
  benefit: string;
  propertyType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const initialEvent: IEvent = {
  id: -1,
  title: "",
  type: "",
  format: "",
  attend: 0,
  eventDate: "",
  note: "",
  status: "非公開",
  statusBit: 0,
  priority: 0,
  prefecture: "",
  address1: "",
  address2: "",
  hiddenAddress: "",
  mapFormat: "地図にピンを表示する",
  mailFormat: "住所を全て記載する",
  images: "",
  mainIndex: 0,
  FPImages: "",
  tag: "",
  feature: "",
  benefit: "",
  propertyType: "設定しない",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

export interface ICampaign {
  id: number;
  title: string;
  type: string;
  format: string;
  eventDate: string;
  status: string;
  statusBit: number;
  prefecture: string;
  address1: string;
  address2: string;
  hiddenAddress: string;
  mapFormat: string;
  featuredEvent: string;
  images: string;
  mainIndex: number;
  article: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const initialCampaign: ICampaign = {
  id: -1,
  title: "",
  type: "",
  format: "",
  eventDate: "",
  status: "非公開",
  statusBit: 0,
  prefecture: "",
  address1: "",
  address2: "",
  hiddenAddress: "",
  mapFormat: "地図にピンを表示する",
  featuredEvent: "",
  images: "",
  mainIndex: 0,
  article: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

export interface ICustomer {
  id: number;
  status: string;
  route: string;
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
  phone: string;
  birthYear: number;
  birthMonth: number;
  birthDate: number;
  note: string;
  memo: string;
  employee: string;
  delivery: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IAccount {
  id: number;
  approved: number;
  isAdmin: number;
  privilege: string;

  name: string;
  email: string;
  phone: string;

  password: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IEventDateTime {
  date: string;
  time: number[];
}

export interface IReserveDateTime {
  date: string;
  startTime: string;
  endTime: string;
}
