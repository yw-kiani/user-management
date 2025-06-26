# 💼 User Management System (Internship Project)

A *secure, role-based user management system* built with Node.js, Express, and MongoDB — developed during my *Cybersecurity Internship. The system supports **Admin and User login*, includes access control, vulnerability testing (ZAP), logging (Winston), and follows modern security practices.

---

## 🚀 Features

### 👤 User Side

* User Registration & Login
* JWT-based authentication
* Secure session handling
* Access to protected routes like /, /game
* Flash message support

### 🛠 Admin Side

* Admin Registration & Login
* Admin Dashboard
* Add/Edit/Delete Users
* Search and view user details
* Admin-only access to /admin, /admin/add-user, etc.

### 🔐 Security Features

* Inputs validated & sanitized
* Passwords hashed using bcrypt
* JWT used for authentication (stored in cookies)
* Admin/User access controlled via middleware
* Helmet used for secure HTTP headers
* Logs activity with Winston
* Vulnerabilities tested with *OWASP ZAP*
* Final security report and ZAP report included

---

## 🛠 Technologies Used

| Category       | Tools/Technologies   |
| -------------- | -------------------- |
| Backend        | Node.js, Express.js  |
| Database       | MongoDB, Mongoose    |
| Authentication | Passport.js, JWT     |
| Security       | Helmet, ZAP, Winston |
| Views/Template | EJS                  |
| Logging        | Winston              |
| Testing        | Nmap, OWASP ZAP      |

---

---

## 📥 Installation & Usage

### Step 1: Clone the Repository

bash
<pre>git clone https://github.com/AbdulWasiu029/user-management.git</pre>

<pre>cd user-management</pre>


### Step 2: Install Dependencies

bash
<pre>npm install</pre>


### Step 3: Setup .env File

Create a .env file in the root and add:

env
<pre>MONGODB_URI=your_mongo_connection_string
SECRET=your_session_secret
JWT_SECRET=your_jwt_secret</pre>


### Step 4: Start the Server

bash
<pre>npm start</pre>


Then visit:
*User Login* → [http://localhost:3000/login](http://localhost:3000/login)
*Admin Login* → [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🛡 Security Reports Included

* ✅ assessment_report.pdf – Week-wise internship report
* ✅ security.log – Winston logs

---

## 📚 Internship Summary

This project is part of a *3-week internship*, where I:

* Built a role-based full-stack user management system
* Applied security best practices
* Performed testing using ZAP & Nmap
* Implemented JWT, Winston, Helmet, bcrypt, and more
* Documented all findings and created a final report
