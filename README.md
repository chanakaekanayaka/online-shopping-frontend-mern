# 🏆 E-SHOP | Modern MERN E-commerce

**E-SHOP** is a premium, full-stack e-commerce platform dedicated to high-performance sports tools and equipment. Built with the **MERN Stack**, it features a seamless shopping experience, secure Google authentication, OTP-based security, and a robust administrative dashboard.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://online-shopping-frontend-mern.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/github-repo-blue.svg)](https://github.com/chanakaekanayaka/online-shopping-frontend-mern.git)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

---

## 👤 Author

**Chanaka Ekanayaka**
* **Live Link:** [E-SHOP](https://online-shopping-frontend-mern.vercel.app/)
* **GitHub:** [@chanakaekanayaka](https://github.com/chanakaekanayaka)

---

## 📸 Project Gallery

### 🏠 Customer Experience
The gateway to premium sports gear, featuring modern layouts and high-performance tools.
<p align="center">
  <img src="public/home.png" width="48%" alt="Home Page" />
  <img src="public/productoverview.png" width="48%" alt="Product Overview" />
</p>

### 🛒 Checkout & Orders
A streamlined path from cart selection to secure order placement.
<p align="center">
  <img src="public/cart.png" width="31%" alt="Cart" />
  <img src="public/checkout.png" width="31%" alt="Checkout" />
  <img src="public/order.png" width="31%" alt="Order Success" />
</p>

### 🛠️ Admin & Management
Powerful management system for site administrators to handle inventory and users.
<p align="center">
  <img src="public/admin.png" width="48%" alt="Admin Panel" />
  <img src="public/dashboard.png" width="48%" alt="User Dashboard" />
</p>

---

## ✨ Features

* **🔐 Advanced Authentication:** * Secure **Google Login** integration.
    * Traditional Email/Password with **Password Reset** functionality.
    * **OTP Verification** for enhanced account security.
* **🛒 Shopping Flow:** Real-time cart management and multi-step checkout.
* **🖼️ Cloud Storage:** Product and profile images are stored securely via **Firebase Storage**.
* **📊 Admin Powerhouse:** Full CRUD (Create, Read, Update, Delete) for products and order tracking.
* **📱 Responsive Design:** Modern, sleek UI built with **Tailwind CSS** for all device sizes.
* **🚀 Performance:** Fast API interactions using **Node.js** and **Express**.

---

## 🛠️ Tech Stack

### Frontend
* **React.js:** Component-based UI (Hooks & Context API).
* **Tailwind CSS:** Modern, utility-first styling.
* **Firebase:** Google Auth & Cloud Image Storage.
* **Axios:** Efficient API communication.

### Backend
* **Node.js & Express.js:** Scalable server-side logic and RESTful APIs.
* **MongoDB:** NoSQL database for flexible data storage (Users, Products, Orders).
* **Nodemailer:** OTP and Password Reset email delivery.
* **JWT:** Secure token-based session handling.

---

## 🏗️ Architecture



The application follows a decoupled architecture:
1.  **Frontend:** A React SPA that handles the view layer and interacts with Firebase for authentication and media.
2.  **Backend:** An Express server that processes business logic, interacts with the MongoDB database, and handles security protocols.
3.  **Security:** State is managed via React Context/Local State (No Redux) for a lightweight and efficient user experience.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas Account
* Firebase Project (Authentication & Storage enabled)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/chanakaekanayaka/online-shopping-frontend-mern.git](https://github.com/chanakaekanayaka/online-shopping-frontend-mern.git)
   cd online-shopping-frontend-mern
