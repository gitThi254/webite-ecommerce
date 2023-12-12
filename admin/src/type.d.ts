interface Login {
  email: string;
  password: string;
}

type Customer = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  role: string;
};

type newCustomer = {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  role: string;
  password: string;
};

type Brand = {
  _id?: string;
  title: string;
};

type Category = {
  _id?: string;
  title: string;
};

type Color = {
  _id?: string;
  title: string;
};

type Data = {
  _id?: string;
  title: string;
};

type Coupon = {
  _id?: string;
  name: string;
  expiry: Date | any;
  discount: number;
};

type Blog = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  images: any;
};

type Image = {
  url: string;
  asset_id: string;
  public_id: string;
};

type Product = {
  _id?: string;
  title: string;
  description: string;
  brand: any;
  price: number;
  quantity: number;
  category: any;
  color: any;
  images: any;
};

type Color = {
  id: string;
  color: string;
};
