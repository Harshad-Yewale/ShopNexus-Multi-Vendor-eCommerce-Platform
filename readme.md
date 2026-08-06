<div align="center">

# 🛍️ ShopNexus — Multi-Vendor E-Commerce Platform

A full-stack multi-vendor e-commerce platform where users can shop as customers, apply to become sellers, list and manage their own products, and complete purchases through an integrated Razorpay checkout — all secured with JWT-based authentication.

### [🔗 View Live Demo](https://shopnexus-ecommerce.vercel.app)

</div>

---

## 🚀 How to Use the Live Demo

1. **Sign up** — use a real email address, since a verification OTP is sent to it
2. **Log in** with your new account
3. **Browse products**, add a few to your cart
4. Go to **Cart → Checkout**
5. **Add a shipping address** (any dummy details work)
6. Select **Razorpay** as the payment method and continue
7. Razorpay's **test-mode checkout** will open:
   - Enter any mobile number
   - Choose **Card** as the payment method:
     - Card number: `5555 5100 0008 1006`
     - Expiry: `12/29`
     - CVV: `123`
   - Enter OTP: `1234`
   - Wait a few seconds for the payment to process
8. Check **My Orders** to see your completed order
9. Try the **"Apply to become a Seller"** flow to see the seller onboarding process

> ⚠️ This is a test-mode payment integration — no real money is charged.

---

## ✨ Features

- 🔐 **JWT-based authentication** with httpOnly cookies, email OTP verification on signup, and session validation on app load
- 🛍️ **Product catalog** with categories, search, and detailed product pages
- 🛒 **Cart & checkout flow** with address management and order summary
- 💳 **Razorpay payment integration** (test mode supported)
- 📦 **Order tracking** — view past orders and order status
- 🏪 **Seller application system** — any user can apply to become a seller
- 📊 **Seller dashboard** — sellers can add, edit, and manage their own product listings
- 🛠️ **Admin panel** — review and approve/reject seller applications, view platform analytics
- 📈 **Analytics dashboard** for sales and platform insights
- 📱 **Responsive UI** built with Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

**Backend**

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate_JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Infrastructure**

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase_Postgres-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)

---

## 🧑‍💻 Getting Started Locally

### Prerequisites

- **Node.js** 18+ and npm
- **Java** 21 (JDK)
- **Maven** (or use the included `mvnw` wrapper — no separate install needed)
- A **PostgreSQL** database (local, or a free instance on [Supabase](https://supabase.com))
- A **Razorpay** account (test/sandbox keys are free)
- A **Cloudinary** account (free tier, for image uploads)
- An **SMTP/Brevo** account for sending OTP emails

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/E-commerceWebsite.git
cd E-commerceWebsite
```

### 2. Backend setup

```bash
cd backend
```

Create/update `src/main/resources/application.properties` with your own values (see [Environment Variables](#-environment-variables) below), or export them as environment variables — the project reads them via `${...}` placeholders either way.

Build and run:

```bash
./mvnw clean package -DskipTests
java -jar target/EcommerceWebsite-0.0.1-SNAPSHOT.jar
```

Or run directly without packaging:

```bash
./mvnw spring-boot:run
```

The backend starts on `http://localhost:8080` by default.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACK_END_URL=http://localhost:8080
```

Run the dev server:

```bash
npm run dev
```

The frontend starts on `http://localhost:5173` by default.

### 4. Open the app

Visit `http://localhost:5173` in your browser. You should be able to sign up, log in, and use the app end-to-end against your local backend.

---

## 🔑 Environment Variables

### Backend

| Variable | Description |
|---|---|
| `DB_URL` | JDBC connection string, e.g. `jdbc:postgresql://<host>/<db>?sslmode=require` |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `DB_DIALECT` | `org.hibernate.dialect.PostgreSQLDialect` |
| `JWT_SECRET_KEY` | Secret key used to sign JWTs |
| `JWT_EXP_TIME` | JWT expiry time (ms) |
| `JWT_COOKIE` | Name of the auth cookie |
| `RAZORPAY_KEY` | Razorpay API key (test or live) |
| `RAZORPAY_SECRET` | Razorpay API secret |
| `CLOUDINARY_URL` | Cloudinary connection URL for image uploads |
| `BREVO_API_KEY` | Brevo (Sendinblue) API key for sending OTP emails |
| `BREVO_SENDER_EMAIL` | Verified sender email for outgoing mail |
| `FRONTEND_URL` | Allowed frontend origin for CORS (no trailing slash) |
| `PORT` | Server port (Render sets this automatically; defaults to 8080 locally) |

### Frontend

| Variable | Description |
|---|---|
| `VITE_BACK_END_URL` | Base URL of the backend API (no trailing slash) |

---

## 📁 Project Structure

```
E-commerceWebsite/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/com/harshadcodes/EcommerceWebsite/
│   │   ├── controller/       # REST controllers (Auth, Product, Cart, Order, Payment, etc.)
│   │   ├── service/          # Business logic
│   │   ├── repositories/     # Spring Data JPA repositories
│   │   ├── model/            # JPA entities
│   │   ├── payload/          # Request/response DTOs
│   │   ├── security/         # JWT filters, Spring Security config, CORS
│   │   └── config/           # Cloudinary, Razorpay, Swagger, app config
│   └── pom.xml
│
└── frontend/                 # React (Vite) client
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/             # Route-level pages
    │   ├── store/             # Redux Toolkit slices/reducers/actions
    │   └── api/                # Axios instance & interceptors
    └── package.json
```

---

## 🚢 Deployment Notes

- The backend is containerized with a multi-stage `Dockerfile` and deployed on **Render**.
- The frontend is deployed on **Vercel**, pointing `VITE_BACK_END_URL` at the Render backend URL.
- Since Render's free tier spins down after inactivity and Supabase's free tier pauses idle databases, a lightweight `GET /api/public/health` endpoint is pinged periodically via **UptimeRobot** to keep both warm.

---

<div align="center">

Made with 💝 By Harshad Yewale.

</div>