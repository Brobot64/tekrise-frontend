# TekRise Test - Frontend Client

A modern, responsive React application built with Vite and TypeScript for the TekRise Academy Instructor Technical Assessment.

## ✨ Features

- **Modern UI/UX**: Built with Tailwind CSS and styled with TekRise's brand identity.
- **State Management**: Robust authentication and application state using React Context API.
- **Secure Navigation**: Protected routes for private user dashboards and bookings.
- **Service Discovery**: Interactive dashboard for viewing and booking marketplace services.
- **Real-time Feedback**: Optimistic UI updates with loading and error states for all API interactions.
- **Type Safety**: Fully typed with TypeScript for reliable development.

## 🛠 Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite 8+
- **Styling**: Tailwind CSS v4 (with PostCSS)
- **Icons**: Lucide React
- **HTTP Client**: Axios (with centralized interceptors)
- **Routing**: React Router DOM

## 🎨 Design System

- **Primary Red**: `#8a171a`
- **Primary Blue**: `#292e78`

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI elements (Button, Input, Navbar, etc.)
├── context/      # Global state (AuthContext)
├── hooks/        # Custom React hooks
├── pages/        # Full-page view components
├── services/     # API integration logic
├── types/        # TypeScript interfaces and types
└── utils/        # Helper functions and Axios configuration
```

## ⚙️ Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run Application**:
   ```bash
   # Development server
   npm run dev

   # Build for production
   npm run build

   # Preview production build
   npm run preview
   ```
