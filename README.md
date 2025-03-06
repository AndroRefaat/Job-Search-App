# Job Search App

## 📌 Project Description

The **Job Search App** is a web-based platform designed to connect job seekers with employers.  
It allows users to:

- Create accounts
- Post job opportunities
- Apply for jobs
- Communicate with potential employers or candidates

The project follows best practices in API development, authentication, and security.

---

## 🚀 Features

### 🔐 Authentication & Authorization

✔ User registration and login (JWT authentication)  
✔ Role-based access control (Job Seekers, HR, Company Owners)  
✔ Password hashing and reset functionality

### 📄 Job Management

✔ Companies can create, update, and delete job postings  
✔ Job seekers can browse and apply for jobs  
✔ Filtering and searching job listings

### 📩 Applications & Hiring Process

✔ Job seekers can apply for jobs with their profiles  
✔ HR can review, accept, or reject applications  
✔ Status tracking for job applications

### 💬 Real-time Chat (Optional)

✔ Secure messaging between recruiters and job seekers  
✔ Notifications for new messages

### 🛡️ Security & Optimization

✔ Data validation and error handling  
✔ API rate limiting to prevent abuse  
✔ Secure authentication and authorization methods  
✔ Deployment-ready with **Vercel**

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Vercel (Configured with `vercel.json`)
- **Tools & Libraries:**
  - `bcryptjs` for password hashing
  - `jsonwebtoken` for authentication
  - `dotenv` for environment variables
  - `express-validator` for input validation
  - `multer` for file uploads (if applicable)

---

## 🏗️ Project Structure

```
Job-Search-App/
│── src/
│   ├── controllers/        # Business logic for various features
│   ├── models/             # Mongoose models (Users, Jobs, Applications)
│   ├── routes/             # API routes
│   ├── middlewares/        # Authentication, validation, error handling
│   ├── utils/              # Helper functions
│── index.js                # Main server file
│── package.json            # Project dependencies
│── .env                    # Environment variables (not shared)
│── README.md               # Project documentation
│── vercel.json             # Deployment configuration for Vercel
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/job-search-app.git
cd job-search-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add the necessary configurations:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Run the Application

#### Development Mode:

```bash
npm run dev
```

#### Production Mode:

```bash
npm start
```

---

## 🚀 Deployment

This project is configured for **Vercel** deployment. To deploy:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel and deploy:
   ```bash
   vercel
   ```

---

## 🤝 Contribution

Want to contribute? Follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a pull request
