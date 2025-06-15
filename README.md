# 🛒 Shopery – Organic E-commerce Platform

Shopery is a modern full-stack e-commerce platform focused on clean design, organic products, and fast performance. It features a React-based frontend, an Express backend, and Docker-based deployment. Built for scalability and ease of use.

---

## 📌 Table of Contents

- [Overview](##overview)
- [Features](##features)
- [Tech Stack](##tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

---

## 🚀 Overview

**Shopery** is built to showcase and sell products with a focus on organic categories. The app includes user authentication, product display, category management, and image uploads.

---

## 🌟 Features

- User Authentication (Register / Login / Logout)
- Image upload support (via `/uploads`)
- Product filtering and category browsing
- Mobile-first responsive design
- Dockerized development environment

---

## 🛠️ Tech Stack

### Frontend:
- React
- React Router
- CSS Modules / Custom CSS

### Backend:
- Node.js + Express
- Multer for image uploads
- MongoDB (via Mongoose)

### DevOps:
- Docker + Docker Compose
- Railway (Backend hosting)
- Vercel (Frontend hosting)

---

## 📁 Project Structure

<pre> ```
  bash Shopery/ 
  ├── shopery/ # React frontend
  │ ├── public/ 
  │ ├── src/ 
  │ │ ├── components/
  │ │ ├── pages/
  │ │ ├── assets/
  │ │ ├── auth/
  │ │ ├── axios/
  │ │ ├── contexts/
  │ │ ├── hooks/
  │ │ ├── locales/
  │ │ ├── styles/
  │ │ ├── ui/
  │ │
  └── App.jsx 
  │ └── package.json 
  │ ├── server/ # Express backend 
  │ ├── controllers/ 
  │ ├── models/ 
  │ ├── routes/ 
  │ ├── uploads/ 
  │ └── server.js 
  │ ├── docker-compose.yml # Docker setup 
  └── README.md # Project docs ``` </pre>


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/hichamskt/Shopery.git
cd Shopery

```

###  2. Environment Variables
server/.env
```bash
### MongoDB connection
DATABASE_USER=shoperyuser
DATABASE=shoperydb
DATABASE_PASSWORD=yourStrongPassword123

#### Server port
PORT=5000

#### JWT Secrets (generate secure values)
ACCESS_TOKEN_SECRET=youraccesstokensecretstring
REFRESH_TOKEN_SECRET=yourrefreshtokensecretstring

#### URL of your frontend (e.g., Vercel deployment)
CLIENT_URL=https://shopery.vercel.app


```
shopery/.env
```
REACT_APP_BACKEND_URL=your-backend-url.com/api
REACT_APP_BASE_URL=your-frontend
```


### 3. Install Dependencies & Run
Using Docker:
```bash
docker-compose up --build
```
Manual:
```bash
cd server && npm install && npm start
cd shopery && npm install && npm start
```
## 🔌 API Endpoints

### 👤 User

- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Log in and receive tokens  
- `GET /api/auth/refresh` – Refresh access token  
- `POST /api/auth/changePassword` – Change user password  
- `GET /api/auth/logout` – Log out and clear refresh token  
- `POST /api/user/getuserbillinginfo` – Get user billing information  
- `POST /api/user/getUserInfo` – Get full user profile  
- `POST /api/user/getLikedProducts` – Fetch user's liked products  
- `POST /api/user/toggleLikedProduct` – Like or unlike a product  
- `POST /api/user/updateBillingAddress` – Update billing address  
- `POST /api/user/updateAcountSettings` – Update account settings



### 🛍️ Product

- `POST /api/products/addnewproduct` – Add a new product (with images & brand logo)
- `GET /api/products/gettopdiscountedproducts` – Get top discounted products
- `GET /api/products/getallproducts` – Get all products
- `GET /api/products/filtredProducts` – Get filtered products (based on query)
- `GET /api/products/getproductbyid/:productid` – Get product by ID

### 📦 Order

- `POST /api/orders/createorder` – Create a new order  
- `POST /api/orders/getuserorders` – Get all orders for a specific user  
- `GET /api/orders/getOrderById/:id` – Get details of a specific order by ID


### 🗂️ Category

- `POST /api/categories/addnewcategory` – Add a new category (with category image)  
- `GET /api/categories/getallcategories` – Get all categories  
- `GET /api/categories/getcategorieswithproductcount` – Get categories along with their product counts
 


## 🗃️ Database Models

### 🛍️ Product

```js
{
  name: { type: String, required: true },
  description: String,
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  category: { type: ObjectId, ref: 'Category', required: true },
  stock: { type: Number, default: 0, min: 0 },
  likedCount: { type: Number, default: 0 },
  tags: [String],
  bulletPoint: [String],
  images: [String],
  discount: { type: Number, default: 0 },
  popularty: { type: Number, default: 0 },
  branddescription: String,
  brandLogo: String,
  weigth: Number,
  color: String,
  type: String,

  // Ratings & Reviews
  rating: [
    {
      user_id: { type: ObjectId, ref: 'User' },
      rating: Number
    }
  ],
  review: [
    {
      user_id: { type: ObjectId, ref: 'User' },
      review: String
    }
  ],
  averageRating: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['Sold', 'Available', 'OutOfStock'],
    default: 'Available'
  },
  createdAt: { type: Date, default: Date.now }
}

```

### 🗂️ Category

```js
{
  name: {
    type: String,
    required: true,
    unique: true
  },
  categoryimg: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```
### 👤 User

```js
{
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: String,
  password: {
    type: String,
    required: true
  },
  images: String,
  
  // Billing Info
  billingAdresse: String,
  billingRegion: String,
  billingFirstName: String,
  billingLastName: String,
  billingEmail: String,
  billingphoneNumber: String,
  companyName: String,
  streetAdresse: String,
  city: String,
  zipCode: String,

  // Relationships & Auth
  orders: [ObjectId],         // Ref to Order
  likedProducts: [ObjectId],  // Ref to Product
  refreshToken: String,

  createdAt: { type: Date, default: Date.now }
}

```

### 📦 Order

```js
{
  userId: { type: ObjectId, ref: "User" },
  items: [
    {
      productId: { type: ObjectId, ref: 'Product', required: true },
      qnt: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  billingInfos: {
    billingFirstName: String,
    billingLastName: String,
    companyName: String,
    billingAdresse: String,
    billingRegion: String,
    city: String,
    zipCode: String,
    billingEmail: String,
    billingphoneNumber: String,
    OrderNotes: String
  },
  shippingInfos: {
    shippingFirstName: String,
    shippingLastName: String,
    shippingName: String,
    shippingAdresse: String,
    shippingRegion: String,
    shippingCity: String,
    shippingzipCode: String,
    shippingEmail: String,
    shippingphoneNumber: String,
    shippingNotes: String,
    shippingCompanyName: String
  },
  totalAmount: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
}
```
## 🚀 Deployment

- **Frontend**: Vercel  
- **Backend**: Railway  
- **Uploads**: Stored on Railway backend under `/uploads`

---

## 🔮 Future Improvements

- 💳 Stripe/PayPal Integration  
- 📊 Admin Dashboard & Analytics  
- 🔔 Email Notifications  
- 🌍 i18n Support (Multilingual)

---

## 👨‍💻 Author

Developed by **Hicham Skoutti**  
[GitHub – @hichamskt](https://github.com/hichamskt)


