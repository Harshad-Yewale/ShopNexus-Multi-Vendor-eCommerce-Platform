<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ShopNexus — Multi-Vendor E-Commerce Platform</title>
</head>
<body>

<h1>🛍️ ShopNexus — Multi-Vendor E-Commerce Platform</h1>
<p class="subtitle">A full-stack multi-vendor e-commerce platform where users can shop as customers, apply to become sellers, list and manage their own products, and complete purchases through an integrated Razorpay checkout — all secured with JWT-based authentication.</p>

<a class="live-link" href="https://shopnexus-ecommerce.vercel.app" target="_blank">🔗 View Live Demo</a>

<h2>How to Use the Live Demo</h2>
<div class="steps-box">
<ol>
    <li><strong>Sign up</strong> — use a real email address, since a verification OTP is sent to it</li>
    <li><strong>Log in</strong> with your new account</li>
    <li><strong>Browse products</strong>, add a few to your cart</li>
    <li>Go to <strong>Cart → Checkout</strong></li>
    <li><strong>Add a shipping address</strong> (any dummy details work)</li>
    <li>Select <strong>Razorpay</strong> as the payment method and continue</li>
    <li>Razorpay's <strong>test-mode checkout</strong> will open:
        <ul>
            <li>Enter any mobile number</li>
            <li>Choose <strong>Card</strong> as the payment method:
                <ul>
                    <li>Card number: <code>5555 5100 0008 1006</code></li>
                    <li>Expiry: <code>12/29</code></li>
                    <li>CVV: <code>123</code></li>
                </ul>
            </li>
            <li>Enter OTP: <code>1234</code></li>
            <li>Wait a few seconds for the payment to process</li>
        </ul>
    </li>
    <li>Check <strong>My Orders</strong> to see your completed order</li>
    <li>Try the <strong>"Apply to become a Seller"</strong> flow to see the seller onboarding process</li>
</ol>
</div>
<div class="note">⚠️ This is a test-mode payment integration — no real money is charged.</div>

<h2>Features</h2>
<ul>
    <li>🔐 <strong>JWT-based authentication</strong> with httpOnly cookies, email OTP verification on signup, and session validation on app load</li>
    <li>🛍️ <strong>Product catalog</strong> with categories, search, and detailed product pages</li>
    <li>🛒 <strong>Cart & checkout flow</strong> with address management and order summary</li>
    <li>💳 <strong>Razorpay payment integration</strong> (test mode supported)</li>
    <li>📦 <strong>Order tracking</strong> — view past orders and order status</li>
    <li>🏪 <strong>Seller application system</strong> — any user can apply to become a seller</li>
    <li>📊 <strong>Seller dashboard</strong> — sellers can add, edit, and manage their own product listings</li>
    <li>🛠️ <strong>Admin panel</strong> — review and approve/reject seller applications, view platform analytics</li>
    <li>📈 <strong>Analytics dashboard</strong> for sales and platform insights</li>
    <li>📱 <strong>Responsive UI</strong> built with Tailwind CSS</li>
</ul>

<h2>Tech Stack</h2>

<h3>Frontend</h3>
<div class="badge-row">
    <span class="badge">React 19</span>
    <span class="badge">Vite</span>
    <span class="badge">Redux Toolkit</span>
    <span class="badge">React Router v7</span>
    <span class="badge">Tailwind CSS v4</span>
    <span class="badge">Axios</span>
    <span class="badge">React Hook Form</span>
    <span class="badge">Recharts</span>
    <span class="badge">MUI</span>
    <span class="badge">React Hot Toast</span>
</div>

<h3>Backend</h3>
<div class="badge-row">
    <span class="badge">Java 21</span>
    <span class="badge">Spring Boot 4</span>
    <span class="badge">Spring Security + JWT</span>
    <span class="badge">Spring Data JPA / Hibernate</span>
    <span class="badge">PostgreSQL (Neon)</span>
    <span class="badge">Razorpay Java SDK</span>
    <span class="badge">Cloudinary</span>
    <span class="badge">ModelMapper</span>
    <span class="badge">Lombok</span>
    <span class="badge">springdoc-openapi</span>
</div>

<h3>Infrastructure / Deployment</h3>
<div class="badge-row">
    <span class="badge">Vercel (Frontend)</span>
    <span class="badge">Render + Docker (Backend)</span>
    <span class="badge">Neon (Database)</span>
    <span class="badge">UptimeRobot</span>
</div>

<h2>Getting Started Locally</h2>

<h3>Prerequisites</h3>
<ul>
    <li><strong>Node.js</strong> 18+ and npm</li>
    <li><strong>Java</strong> 21 (JDK)</li>
    <li><strong>Maven</strong> (or use the included <code>mvnw</code> wrapper — no separate install needed)</li>
    <li>A <strong>PostgreSQL</strong> database (local, or a free instance on <a href="https://neon.tech" target="_blank">Neon</a>)</li>
    <li>A <strong>Razorpay</strong> account (test/sandbox keys are free)</li>
    <li>A <strong>Cloudinary</strong> account (free tier, for image uploads)</li>
    <li>An <strong>SMTP/Brevo</strong> account for sending OTP emails</li>
</ul>

<h3>1. Clone the repository</h3>
<pre><code>git clone https://github.com/&lt;your-username&gt;/E-commerceWebsite.git
cd E-commerceWebsite</code></pre>

<h3>2. Backend setup</h3>
<pre><code>cd backend</code></pre>
<p>Create/update <code>src/main/resources/application.properties</code> with your own values (see Environment Variables below), or export them as environment variables — the project reads them via <code>${...}</code> placeholders either way.</p>
<p>Build and run:</p>
<pre><code>./mvnw clean package -DskipTests
java -jar target/EcommerceWebsite-0.0.1-SNAPSHOT.jar</code></pre>
<p>Or run directly without packaging:</p>
<pre><code>./mvnw spring-boot:run</code></pre>
<p>The backend starts on <code>http://localhost:8080</code> by default.</p>

<h3>3. Frontend setup</h3>
<pre><code>cd frontend
npm install</code></pre>
<p>Create a <code>.env</code> file in <code>frontend/</code>:</p>
<pre><code>VITE_BACK_END_URL=http://localhost:8080</code></pre>
<p>Run the dev server:</p>
<pre><code>npm run dev</code></pre>
<p>The frontend starts on <code>http://localhost:5173</code> by default.</p>

<h3>4. Open the app</h3>
<p>Visit <code>http://localhost:5173</code> in your browser. You should be able to sign up, log in, and use the app end-to-end against your local backend.</p>

<h2>Environment Variables</h2>

<h3>Backend</h3>
<table>
<tr><th>Variable</th><th>Description</th></tr>
<tr><td><code>DB_URL</code></td><td>JDBC connection string, e.g. <code>jdbc:postgresql://&lt;host&gt;/&lt;db&gt;?sslmode=require</code></td></tr>
<tr><td><code>DB_USERNAME</code></td><td>Database username</td></tr>
<tr><td><code>DB_PASSWORD</code></td><td>Database password</td></tr>
<tr><td><code>DB_DIALECT</code></td><td><code>org.hibernate.dialect.PostgreSQLDialect</code></td></tr>
<tr><td><code>JWT_SECRET_KEY</code></td><td>Secret key used to sign JWTs</td></tr>
<tr><td><code>JWT_EXP_TIME</code></td><td>JWT expiry time (ms)</td></tr>
<tr><td><code>JWT_COOKIE</code></td><td>Name of the auth cookie</td></tr>
<tr><td><code>RAZORPAY_KEY</code></td><td>Razorpay API key (test or live)</td></tr>
<tr><td><code>RAZORPAY_SECRET</code></td><td>Razorpay API secret</td></tr>
<tr><td><code>CLOUDINARY_URL</code></td><td>Cloudinary connection URL for image uploads</td></tr>
<tr><td><code>BREVO_API_KEY</code></td><td>Brevo (Sendinblue) API key for sending OTP emails</td></tr>
<tr><td><code>BREVO_SENDER_EMAIL</code></td><td>Verified sender email for outgoing mail</td></tr>
<tr><td><code>FRONTEND_URL</code></td><td>Allowed frontend origin for CORS (no trailing slash)</td></tr>
<tr><td><code>PORT</code></td><td>Server port (Render sets this automatically; defaults to 8080 locally)</td></tr>
</table>

<h3>Frontend</h3>
<table>
<tr><th>Variable</th><th>Description</th></tr>
<tr><td><code>VITE_BACK_END_URL</code></td><td>Base URL of the backend API (no trailing slash)</td></tr>
</table>

<h2>Project Structure</h2>
<pre><code>E-commerceWebsite/
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
    └── package.json</code></pre>

<h2>Deployment Notes</h2>
<ul>
    <li>The backend is containerized with a multi-stage <code>Dockerfile</code> and deployed on <strong>Render</strong>.</li>
    <li>The frontend is deployed on <strong>Vercel</strong>, pointing <code>VITE_BACK_END_URL</code> at the Render backend URL.</li>
    <li>Since Render's free tier spins down after inactivity and Neon's free tier pauses idle databases, a lightweight <code>GET /api/public/health</code> endpoint is pinged periodically via <strong>UptimeRobot</strong> to keep both warm.</li>
</ul>

<hr>
<p style="color:#6b7280; font-size:0.85em;">Made with 💝 By Harshad Yewale.</p>

</body>
</html>