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
- Admin Dashboard for product & category management
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

### 🔐 Auth
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Log in and receive tokens  

### 🛍️ Products
- `GET /api/products` – Retrieve all products  
- `GET /api/products/:id` – Get a product by ID  
- `POST /api/products` – Create a new product  
- `PUT /api/products/:id` – Update a product by ID  
- `DELETE /api/products/:id` – Delete a product by ID  

### 🗂️ Categories
- `GET /api/categories` – List all categories  
- `POST /api/categories` – Create a new category  

### 🖼️ Uploads
- `POST /api/upload` – Upload an image (via Multer)


## 🗃️ Database Models

### 🛍️ Product
```js
{
  name: String,
  price: Number,
  description: String,
  category: String,
  images: [String],
  inStock: Boolean
}
```
### 🗂️ Category
```js
{
  name: String,
  image: String
}
```
### 👤 User
```js
{
  username: String,
  email: String,
  passwordHash: String,
  role: { type: String, default: 'user' }
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


