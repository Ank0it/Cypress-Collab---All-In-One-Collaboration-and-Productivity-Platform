# Cypress Collab - All-In-One Collaboration and Productivity Platform

![Application Logo](https://raw.githubusercontent.com/webprodigies/webprodigies-cypress/main/public/cover.png)

A modern SaaS collaboration platform built with Next.js 13, featuring real-time collaboration, workspace management, and seamless productivity tools.

## 🌟 Overview

Cypress Collab is a comprehensive collaboration platform that enables teams to work together in real-time. With features like live cursors, text selection, and real-time database synchronization, it provides a seamless collaborative experience.

## 🚀 Features

- 🤯 **Real-time cursors** - See team members' cursors in real-time
- 📝 **Real-time text selection** - Visual indicators of selected text
- ⏱️ **Real-time database and collaboration** - Instant updates across all clients
- 🟢 **Real-time presence** - Know who's online and active
- 🗑️ **Move to trash functionality** - Safe deletion with recovery options
- 😜 **Custom emoji picker** - Express yourself with emojis
- 🌙 **Light/Dark mode** - Beautiful UI in any theme
- 🚨 **Next.js 13 App Router** - Latest Next.js features
- 🗺️ **Free plan restrictions** - Flexible pricing tiers
- 💰 **Stripe payments** - Monthly subscription management
- 📧 **Custom email invitations** - Built-in 2FA and invitations
- ⚡️ **Supabase Row Level Security** - Secure data access
- 👨‍👨‍👧‍👦 **Real-time collaboration** - Multiple users working together
- 🤑 **Custom Rich text editor** - Powered by Quill with cursors
- 📚 **Profile settings** - Customizable user profiles
- 📍 **Payment portal** - Self-service subscription management
- 🔐 **Custom Authentication** - Secure user authentication
- ✳️ **Websockets** - Real-time communication
- 📣 **Optimistic UI** - Instant feedback
- 📱 **Fully responsive** - Works on all devices


### Features in this application.

- 🤯 Real-time cursors
- 📝 Real-time text selection
- ⏱️ Real-time database and collaboration
- 🟢 Real-time presence
- 🗑️ Move to trash functionality
- 😜 Custom emoji picker
- 🌙 Light mode dark mode
- 🚨 Next.js 13 app router
- 🗺️ Creating free plan restrictions
- 💰 Take monthly payments
- 📧 Custom email 2FA invitation
- ⚡️ Supabase Row level policy
- 👨‍👨‍👧‍👦 Real-time Collaboration
- 👾 Deployment
- 🤑 Custom Rich text editor
- 📚 Update profile settings
- 📍 Manage payments in a portal
- 🔐 Custom Authentication
- ✳️ Websockets
- 📣 Optimistic UI
- 📱 Responsive design

## 🛠️ Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Drizzle ORM
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **Real-time:** Socket.io + Supabase Realtime
- **Rich Text Editor:** Quill with quill-cursors
- **UI Components:** Radix UI + shadcn/ui

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (or Supabase account)
- Stripe account (for payments)
- Supabase account (for auth and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cypress-collab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in all required values in `.env` file. See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) for detailed instructions.

4. **Run database migrations**
   ```bash
   npm run generate
   npm run push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- [Environment Setup Guide](./ENV_SETUP_GUIDE.md) - Detailed guide for setting up environment variables
- [Production Checklist](./PRODUCTION_CHECKLIST.md) - Complete checklist for production deployment

## 🚀 Deployment

See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for a complete deployment guide.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

### Note on Dynamic Server Error

For the issue with dynamic server usage in layout.tsx, see:
[DynamicServerError: Dynamic server usage: cookies](https://github.com/vercel/next.js/issues/49373) 
