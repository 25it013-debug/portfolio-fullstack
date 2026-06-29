# Personal Portfolio Website (Full-Stack Engineering Project)

A production-ready, fully responsive full-stack personal portfolio website built using **Node.js**, **Express.js**, **MongoDB (Mongoose)**, **HTML5**, **Vanilla CSS**, and **Vanilla JavaScript**.

## 🌟 Key Features
- **Responsive Mobile-First UI**: Modern glassmorphic aesthetics, dark theme, smooth animations, and interactive navigation.
- **Backend-Driven Dynamic Content**: REST APIs serve developer profile, technical skills, and portfolio project cards dynamically.
- **RESTful APIs**:
  - `GET /api/profile` - Fetches developer profile details, stats, and social links.
  - `GET /api/projects` - Fetches portfolio projects (supports filtering by category).
  - `GET /api/skills` - Fetches technical skill matrix grouped by categories.
- **Contact Form Integration**: Real-time server-side input validation (`express-validator`), database persistence (`ContactMessage` model), and server-side email notifications (`Nodemailer`).
- **Environment Configuration**: Secure `.env` handling for database connections, SMTP credentials, and server settings.
- **Layered MVC Architecture**: Clean modular separation across routes, controllers, models, services, and public static assets.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom CSS Variables, Glassmorphism, Responsive Grid), Vanilla JavaScript (Fetch API).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB & Mongoose ODM.
- **Security & Services**: Helmet, CORS, Express Validator, Nodemailer.

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local instance or MongoDB Atlas connection string)

### Steps
1. **Clone or navigate to the repository directory**:
   ```bash
   cd portfolio-fullstack
   ```

2. **Install Dependencies**:
   *(This step generates the `node_modules` folder)*
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio_db
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_password
   CONTACT_RECEIVER_EMAIL=dev@example.com
   NODE_ENV=development
   ```

4. **Seed Sample Data (Optional)**:
   Populate MongoDB with initial developer profile, skills, and project data:
   ```bash
   npm run seed
   ```

5. **Start the Application**:
   ```bash
   npm run dev
   # Or for production: npm start
   ```

6. **View in Browser**:
   Open `http://localhost:5000`
