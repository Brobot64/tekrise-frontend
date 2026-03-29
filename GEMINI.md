# TekRise Test - Client

## Project Overview
This is the frontend client for the TekRise Test application. It is built with React, Vite, and TypeScript. It uses Tailwind CSS for styling and follows a modular component-based architecture.

## Tech Stack
- **React** (v18+)
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router** for routing
- **Axios** for API calls
- **React Hooks** for state management (useState, useEffect, useContext, etc.)
- **Tailwind UI Templates** (as reference for clean, responsive design)

## Colors
- **Main Red**: `#8a171a`
- **Main Blue**: `#292e78`

## Features
- **Authentication**: Login and Register pages.
- **Dashboard**: View available services, book services, and manage own services.
- **Booking Management**: View and update the status of user bookings.
- **Responsive Design**: Clean and interactive UI suitable for all devices.
- **Error & Loading States**: Clear feedback to users during network requests.

## Component Architecture
1. **Components**: Reusable UI elements (Buttons, Cards, Inputs, Navbar, Footer, etc.).
2. **Pages**: Full-page layouts (Home, Login, Register, Dashboard, Bookings).
3. **Hooks**: Custom hooks for reusable logic (useAuth, useServices, etc.).
4. **Services**: API interaction logic.
5. **Context**: Global state management (AuthContext).
6. **Types**: TypeScript interfaces and types.
7. **Utils**: Helper functions (formatting, validation, etc.).

## Implementation Details
- **Tailwind Configuration**: Custom colors (`primary-red`, `primary-blue`) are defined in `tailwind.config.js`.
- **API Integration**: Axios is used to communicate with the Express backend.
- **State Management**: React's `Context API` manages the authentication state.

## Setup
1. `npm install`
2. Create `.env` from `.env.example`.
3. `npm run dev` to start the development server.
