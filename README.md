# NexMail AI — Cold Mail Generator

An AI-powered outreach generator that helps job seekers craft high-converting cold emails, LinkedIn DMs, and follow-up messages from a single short prompt. Built on a MERN stack with Groq AI (Llama 3.3 70B).

---

## Features

- **4-in-1 AI output** — subject line, cold email body, LinkedIn DM, and follow-up email generated in one request
- **Smart context inference** — produces professional copy even from a 2–4 word prompt
- **OTP email verification** — users verify their email address before gaining access
- **JWT authentication** — stateless auth with protected API routes
- **Email history** — every generation is persisted per user
- **Fully responsive UI** — built with React 19 + Tailwind CSS v4

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, Tailwind CSS v4, React Router v7, Axios |
| Backend | Node.js, Express 5, MongoDB + Mongoose |
| Auth | JWT, Bcrypt.js, Nodemailer (OTP via Gmail) |
| AI | Groq API — `llama-3.3-70b-versatile` |

---

## Project Structure

```
ColdMailGenerator/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── aiController.js       # Groq API + email generation
│   │   └── authController.js     # Register / verify OTP / login
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT protect middleware
│   ├── models/
│   │   ├── User.js               # User schema (username, email, otp, isVerified)
│   │   └── EmailHistory.js       # Per-user generation history
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── aiRoutes.js
│   ├── utils/
│   │   └── emailSender.js        # Nodemailer OTP sender
│   └── server.js
│
└── frontend/
    └── src/
        ├── context/
        │   ├── authContext.jsx    # AuthProvider + localStorage hydration
        │   └── useAuth.jsx        # useAuth() hook
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── Signup.jsx
        │   ├── Login.jsx
        │   ├── VerifyOtp.jsx
        │   └── Dashboard.jsx
        ├── components/
        │   ├── Layout.jsx         # Sidebar + Navbar shell
        │   ├── Sidebar.jsx
        │   └── Navbar.jsx
        └── utils/
            └── api.js             # Axios instance with auth interceptor
```

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/register` | `{ name, email, password }` | Register — sends OTP to email |
| POST | `/verify-otp` | `{ email, otp }` | Verify OTP — returns JWT + user |
| POST | `/login` | `{ email, password }` | Login — returns JWT + user |

### AI — `/api/ai` *(protected — requires `Authorization: Bearer <token>`)*

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/generate-email` | `{ prompt }` | Generate 4-part outreach package |
| GET | `/history` | — | Fetch user's generation history |

#### Generate response shape

```json
{
  "subject": "Backend engineer with 2+ yrs scaling APIs",
  "emailBody": "...",
  "linkedInDm": "...",
  "followUpEmail": "..."
}
```

---

## Usage

1. **Sign up** with your name, email, and password
2. **Verify** your email using the 6-digit OTP sent to your inbox
3. **Log in** and open the Dashboard
4. **Enter a prompt** — anything from `"SDE role at fintech startup"` to a full paragraph
5. **Generate** — receive a subject line, cold email, LinkedIn DM, and follow-up in seconds
6. Copy any output with the clipboard button

---

## Author

**Kavin Prakash T**
- Follow best practices for cold outreach
- Maintain a confident, professional tone

Example inputs:
- "Software engineer role"
- "Backend developer at product company"
- "Full stack position at startup"

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Input validation and sanitization
- Rate limiting on AI API calls

## 👨‍💻 Author

**Kavin Prakash T**

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Made with ❤️ by Kavin Prakash T