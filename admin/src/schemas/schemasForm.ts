import * as Yup from "yup";
export const schemaLogin = Yup.object({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "password must have at 6 characters"),
});

export const schemaCustomer = Yup.object({
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  email: Yup.string().email("Email is Invalid").required("Email is required"),
  mobile: Yup.string()
    .required("Mobile is required")
    .length(10, "Mobile must have at 10 characters"),
  role: Yup.string().required("Role is required"),
  password: Yup.string().required("Password is required"),
});

export const schemaBrand = Yup.object({
  title: Yup.string().required("Brand is required"),
});

export const schemaCategory = Yup.object({
  title: Yup.string().required("Category is required"),
});

export const schemaBlogCategory = Yup.object({
  title: Yup.string().required("Blog Category is required"),
});

export const schemaColor = Yup.object({
  title: Yup.string().required("Color is required"),
});

export const schemaCoupon = Yup.object({
  name: Yup.string().required("Color is required"),
  expiry: Yup.date().required("Date is required"),
  discount: Yup.number().required("Discount is required"),
});

export const schemaBlog = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  images: Yup.array().required("images is required"),
});

export const schemaProduct = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  color: Yup.array().required("color is required"),
  images: Yup.array().required("images is required"),

  quantity: Yup.number().required("Quantity is required"),
});
