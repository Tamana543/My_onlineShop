# 🚗 CarHub – Full Stack Car Marketplace

🌍 **Live Demo:**  
[Live](https://carhubmain.onrender.com/)

---

## 📌 Overview

CarHub is a full-stack car marketplace web application built using **Node.js, Express, MongoDB, and EJS**.  
It provides secure authentication, product management, cart functionality, and order processing in a structured MVC architecture.

This project demonstrates backend security, session handling, and full CRUD functionality in a production-ready environment.

---

## ✨ Features

### 🔐 Authentication & Security
- User Signup & Login
- Password hashing with bcrypt
- Session-based authentication
- CSRF protection (csurf middleware)
- Secure Logout
- Password reset via token (email-based)
- Protected routes for authenticated users

### 🚘 Car Marketplace
- Browse all cars
- View detailed car information
- Add cars to cart
- Remove items from cart
- Place orders
- View order history
- payment / checkout system

### 🛠 Admin Dashboard
- Add new cars
- Edit existing cars
- Delete cars
- Manage product listings

---

## 🏗 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express-Session
- CSRF (csurf)
- bcrypt
- Nodemailer

### Frontend
- EJS (Embedded JavaScript Templates)
- Bootstrap
- Custom CSS

---

## 🔒 Security Implementation

- Passwords are securely hashed using bcrypt
- CSRF tokens required for all POST requests
- Sessions stored securely
- Authentication middleware protects sensitive routes
- Reset tokens expire automatically
---

## 📂 Project Structure


```
│── controllers/
│   └── shop.js
│   └── admin.js
│   └── auth.js
│
│── models/
│   ├── product.js
│   ├── user.js
│   ├── emailTemp.js
│   ├── invooiceTemp.js
│   └── order.js
│
│── routes/
│   └── shop.js
│   └── admin.js
│   └── auth.js
│   └── home.js
│
│── views/
│   ├── shop/
│   ├── admin/
│   └── includes/
│
│── public/
│   ├── css/
│   └── js/
│
│── data/
│── app.js
│── package.json
```

## Installation

```bash
git clone https://github.com/Tamana543/My_onlineShop.git
cd carhub
npm install
npm start

```
---
## Status

✔️👩‍💻 New Idea Added, Redeveloping started :) (Open for any further features :) 

---

## Author
**Tamana&lt;ReginaJS/&gt;** 

Website Developer

---


