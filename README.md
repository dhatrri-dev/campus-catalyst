# 🚀 Campus Catalyst - Your Campus, Supercharged

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-Fast%20Build-purple?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Campus Catalyst** is a premium, all-in-one platform designed to organize and elevate campus life. From note-sharing to roommate matching, it brings everything a student needs into a single, beautiful interface.

---

## ✨ Core Features

### 📒 Notes Hub
- **Real-time Sharing**: Upload and discover real class notes (PDFs/Images) from fellow students.
- **Interactive Feedback**: Rate notes with a 5-star system and leave comments to discuss content.
- **Fast Search**: Find exactly what you need with subject-code and tag-based filtering.

### 🏠 Roommate Match
- **Smart Matching**: AI-driven algorithm matches you with roommates based on lifestyle, sleep habits, and noise preferences.
- **Privacy First**: Strict gender-separated matching for hostel environments.
- **Connection Requests**: Send and receive connection requests to find your perfect housing partner.

### ⚙️ Admin & Automation
- **Campus Tasks**: Automated fee reminders, attendance report generators, and library due-date alerts.
- **Service Routing**: Hostel complaints and maintenance requests routed directly to wardens.

### 🛒 Marketplace & More
- **Campus Marketplace**: Safely buy and sell items within the university community.
- **Lost & Found**: Map-integrated tracking to help recover lost belongings quickly.
- **Timetable & Notice Board**: Stay up-to-date with your lectures and campus-wide announcements.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with a Custom Design System (Glassmorphism & Vibrant Gradients)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Routing**: React Router 7
- **Feedback**: React Hot Toast

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhatrri-dev/campus-catalyst.git
   cd campus-catalyst
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main Application logic & Routing
│   ├── App.css      # Core Design System & Component Styles
│   ├── supabase.js  # Supabase client configuration
│   └── main.jsx     # Entry point
├── supabase/        # SQL schemas & migrations (if applicable)
└── vite.config.js  # Build configuration
```

---

## 📸 Screenshots

> [!TIP]
> Add your own screenshots here to showcase the stunning UI!

| Home Dashboard | Notes Hub |
| :---: | :---: |
| ![Home](https://via.placeholder.com/400x250?text=Home+Dashboard) | ![Notes](https://via.placeholder.com/400x250?text=Notes+Hub) |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ for students everywhere</p>
