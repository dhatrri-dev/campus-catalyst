# Campus Catalyst

**Campus Catalyst** is a student project built to simplify and enhance campus life through a unified platform. The system addresses common campus friction points such as resource sharing, housing compatibility, and operational transparency.

---

## 🏗️ Technical Architecture

- **Frontend**: React 19 + Vite (Single Page Application)
- **Styling & UX**: Vanilla CSS with a focus on Glassmorphism; Framer Motion for micro-interactions.
- **Backend-as-a-Service**: [Supabase](https://supabase.com/)
  - **PostgreSQL**: Relational data storage for profiles, notes, and community requests.
  - **Storage**: Cloud sync for academic documents (PDFs/Images).
  - **Authentication**: JWT-based secure user sessions.
- **State Management**: Atomic React Hooks for real-time UI synchronization.

---

## 📦 Core Modules

### 1. Academic Hub (Resource Sharing)
A peer-to-peer ecosystem for academic material exchange.
- **Cloud Document Storage**: Integrated with Supabase Storage for persistent file management.
- **Peer Review System**: Quantitative (star-rating) and qualitative (threaded comments) feedback loops.
- **Optimized Search**: Subject-code and metadata-based filtering for efficient discovery.

### 2. Community Match (Housing Compatibility)
A preference-weighted engine designed to improve roommate selection outcomes.
- **Custom Profile Schema**: Captures lifestyle habits (sleep, noise, cleanliness).
- **Matching Engine**: Logic-based filtering within strict gender-separated pools for hostel compliance.
- **Connection Protocol**: Integrated request/acceptance workflow for secure student outreach.

### 3. Campus Operations
Streamlining daily university logistics through dedicated CRUD modules.
- **Marketplace**: A secure, internal board for community trade.
- **Lost & Found Tracker**: A centralized registry for reporting and recovering lost items.
- **Notice Board & Events**: Live broadcast modules for official announcements and RSVP tracking.
- **Timetable Tracker**: A personalized schedule manager with semester-specific persistence.

### 4. Admin Moderation & Automation
A secure control panel (accessible via authorized credentials) for platform maintenance.
- **Content Moderation**: Ability to audit and prune community-uploaded files.
- **Automation Pipeline**: Control toggles for scheduled campus tasks (e.g., fee reminders, report generation).
- **Service Management**: Dynamic updating of mess menus and official notices.

---

## 🚀 Development Setup

### Prerequisites
- Node.js (v18+)
- Supabase project environment

### Installation

1. **Clone and Install**
   ```bash
   git clone https://github.com/dhatrri-dev/campus-catalyst.git
   cd campus-catalyst
   npm install
   ```

2. **Environment Configuration**
   Store your Supabase credentials in a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

---

## 📈 Future Scope
- **Push Notifications**: Transitioning from polling to real-time socket-based alerts.
- **File Preview**: Generating server-side thumbnails for PDF uploads.
- **Analytics Dashboard**: Aggregated insights for campus admins on resource utilization.

---

<p align="center"><i>Building the future of campus connectivity</i></p>
