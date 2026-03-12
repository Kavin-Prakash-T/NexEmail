# 🚀 Cold Mail Generator

An AI-powered cold email generator designed to help job seekers create professional, high-converting outreach emails to recruiters. Built with React, Node.js, Express, and powered by Groq AI.

## ✨ Features

- **AI-Powered Email Generation**: Generate personalized cold emails, LinkedIn DMs, and follow-up emails using advanced AI
- **Smart Context Understanding**: Generates professional emails even from minimal prompts
- **User Authentication**: Secure JWT-based authentication system
- **Email History**: Track and access all previously generated emails
- **Multiple Output Formats**: Get subject lines, email body, LinkedIn DM, and follow-up email in one go
- **Responsive Design**: Clean and modern UI built with React

## 🛠️ Tech Stack

### Frontend
- React 19
- Tailwind CSS V4
- Vite
- CSS3
- Axios

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing
- Groq AI API (Llama 3.3 70B model)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Groq API Key ([Get one here](https://console.groq.com))

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### AI Email Generation
- `POST /api/ai/generate-email` - Generate cold email (Protected)
  - Body: `{ "prompt": "your prompt here" }`
- `GET /api/ai/history` - Get email generation history (Protected)

## 📁 Project Structure

```
ColdMailGenerator/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── aiController.js    # AI email generation logic
│   │   └── authController.js  # Authentication logic
│   ├── middlewares/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── EmailHistory.js    # Email history schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── aiRoutes.js        # AI routes
│   │   └── authRoutes.js      # Auth routes
│   ├── utils/
│   │   └── emailSender.js     # Email utility
│   ├── server.js              # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx            # Main app component
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Enter Prompt**: Type a brief description (e.g., "SDE role at startup", "Backend engineer position")
3. **Generate**: Click generate to create your cold email package
4. **Review**: Get a complete package including:
   - Professional subject line
   - Email body
   - LinkedIn DM message
   - Follow-up email
5. **History**: Access all your previously generated emails anytime

## 🤖 AI Prompt Intelligence

The AI is trained to:
- Generate professional emails from minimal input
- Make smart assumptions about context
- Create personalized, non-generic content
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

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Made with ❤️ by Kavin Prakash T