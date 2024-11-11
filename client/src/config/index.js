export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      {
        id: "fruits_vegetables",
        label: "פירות וירקות",
      },
      {
        id: "meat_fish",
        label: "בשר ודגים",
      },
      {
        id: "legumes_grains",
        label: "קטניות ודגנים",
      },
      {
        id: "snacks_sweets",
        label: "חטיפים ומתוקים",
      },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "דף הבית",
    path: "/shop/home",
  },
  {
    id: "fruits_vegetables",
    label: "פירות וירקות",
    path: "/shop/listing",
  },
  {
    id: "meat_fish",
    label: "בשר ודגים",
    path: "/shop/listing",
  },
  {
    id: "legumes_grains",
    label: "קטניות ודגנים",
    path: "/shop/listing",
  },
  {
    id: "snacks_sweets",
    label: "חטיפים ומתוקים",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "חיפוש",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const filterOptions = {
  category: [
    {
      id: "fruits_vegetables",
      label: "פירות וירקות",
    },
    {
      id: "meat_fish",
      label: "בשר ודגים",
    },
    {
      id: "legumes_grains",
      label: "קטניות ודגנים",
    },
    {
      id: "snacks_sweets",
      label: "חטיפים ומתוקים",
    },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
