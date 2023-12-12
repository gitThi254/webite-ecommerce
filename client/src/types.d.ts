type Login = {
  email: string;
  password: string;
};

type Register = {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
};

type Product = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  brand: any;
  price: number;
  quantity: number;
  category: any;
  color: any;
  images: any;
};

type Cart = {
  productId?: string;
  quantity: number;
  color: string;
};

type ListCart = {
  cart: Cart[];
};

type ShippingAddress = {
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  firstname: string;
  lastname: string;
  other: string;
  zipcode: string;
};
