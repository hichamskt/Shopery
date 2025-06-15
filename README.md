# 🛒 Shopery – Organic E-commerce Platform

Shopery is a modern full-stack e-commerce platform focused on clean design, organic products, and fast performance. It features a React-based frontend, an Express backend, and Docker-based deployment. Built for scalability and ease of use.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
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

<pre> ```bash Shopery/ ├── shopery/ # React frontend │ ├── public/ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ └── App.jsx │ └── package.json │ ├── server/ # Express backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── uploads/ │ └── server.js │ ├── docker-compose.yml # Docker setup └── README.md # Project docs ``` </pre>


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/hichamskt/Shopery.git
cd Shopery



#  2. Environment Variables
server/.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

shopery/.env



# 3. Install Dependencies & Run
Using Docker:

docker-compose up --build

Manual:

cd server && npm install && npm start
cd shopery && npm install && npm start

## 🔌 API Endpoints

Auth
POST /api/auth/register
POST /api/auth/login

Products
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

Categories
GET /api/categories
POST /api/categories

Uploads
POST /api/upload — Image upload via Multer

## 🗃️ Database Models
Product
{
  name: String,
  price: Number,
  description: String,
  category: String,
  images: [String],
  inStock: Boolean
}
Category
{
  name: String,
  image: String
}
User
{
  username: String,
  email: String,
  passwordHash: String,
  role: { type: String, default: 'user' }
}

## 🚀 Deployment
Frontend: Vercel
Backend: Railway
Uploads: Saved on Railway backend under /uploads

##🔮 Future Improvements
💳 Stripe/PayPal Integration
📊 Admin Dashboard & Analytics
🔔 Email Notifications
🌍 i18n Support (Multilingual)

##👨‍💻 Author
Developed by Hicham Skoutti

