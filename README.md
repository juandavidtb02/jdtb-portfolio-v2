# 🚀 Personal Portfolio

A modern interactive developer portfolio featuring gamified achievements, dynamic UI animations, and a fully functional contact system.

---

## ✨ Features

- 🎮 **Achievement system** with unlockable rewards for exploring the site
- 🔓 **Unlockable Instagram link** revealed after completing all achievements
- 📩 **Contact form** with real email sending via Resend API
- 🌍 **Language switching** between English and Spanish
- 📄 **Downloadable CV** directly from the hero section
- 🎨 **Retro arcade UI** with pixel art animations and neon effects
- ⚡ **Fast performance** powered by Next.js App Router
- 📱 **Fully responsive** design for all screen sizes

---

## 🛠️ Technologies Used

- **[Next.js](https://nextjs.org/)** — React framework with App Router
- **[React](https://react.dev/)** — UI component library
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Resend](https://resend.com/)** — Email API for contact form
- **[React Context](https://react.dev/reference/react/createContext)** — Achievements state management
- **[Sonner](https://sonner.emilkowal.ski/)** — Toast notifications
- **[Lucide React](https://lucide.dev/)** — Icon library

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# 1. Clone the repository
git clone <repo-url>

# 2. Navigate to project folder
cd jdtb-portfolio-v2

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env.local
# Then add your RESEND_API_KEY (see below)

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of the project:

```env
RESEND_API_KEY=your_api_key_here
```

| Variable         | Description                                   |
| ---------------- | --------------------------------------------- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |

> ⚠️ Never commit `.env.local` to version control.

---

## 📬 Contact Form

The contact form sends emails directly to the portfolio owner using the **Resend API**.

**Flow:**

```
User fills form → POST /api/contact → Resend API → Email Inbox
```

The API route (`/app/api/contact/route.ts`) handles:

- Input validation and sanitization
- Email formatting with HTML template
- Error handling with appropriate status codes

---

## 🎮 Achievements System

Users earn achievements by naturally interacting with the portfolio. Each unlock triggers a retro-style popup notification.

| Achievement               | Trigger                        |
| ------------------------- | ------------------------------ |
| 🧭 **Explorer**           | Scroll to the footer           |
| ⚔️ **War Mode Activated** | Click the Space Invader button |
| 🌍 **Polyglot**           | Switch the language            |
| 📄 **Prepared Recruiter** | Download the CV                |
| 👑 **Platinado**          | Complete all 4 achievements    |

Completing all achievements unlocks:

- A secret popup message
- The hidden **Instagram** social link in the footer

Progress is tracked with a 🏆 trophy indicator in the bottom-right corner. Click it to view your achievement list.

---

## 🚀 Deployment

This project is optimized for deployment on **[Vercel](https://vercel.com)**.

### Steps

1. Push your project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variables in **Settings → Environment Variables**:
   ```
   RESEND_API_KEY = your_api_key_here
   ```
4. Click **Deploy**

Vercel will automatically build and deploy on every push to `main`.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Juan Torres** — Fullstack & Backend Developer

|              | Link                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| 🐙 GitHub    | [github.com/juandavidtb02](https://github.com/juandavidtb02)                                                            |
| 💼 LinkedIn  | [linkedin.com/in/juan-david-torres-barreto-62a786255](https://www.linkedin.com/in/juan-david-torres-barreto-62a786255/) |
| 🌐 Portfolio | [your-portfolio-url.com](#)                                                                                             |

---

<p align="center">Made with ❤️ & code</p>
