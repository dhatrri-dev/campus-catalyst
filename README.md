# Campus Catalyst

A web application designed to help students organize their daily campus life. It centralizes utilities like academic note sharing, roommate matching, and schedule management into a single interface.

## Description
Campus Catalyst is a utility platform built for students. It provides tools to share study resources, find compatible roommates based on habits, and keep track of campus activities like mess menus and lost items.

## Features
- **Academic Notes Hub**: Upload and download study materials in PDF or image format with community ratings and comments.
- **Roommate Matcher**: Find roommates by comparing lifestyle preferences like sleep cycles, noise tolerance, and cleanliness.
- **Campus Marketplace**: A internal board for students to buy or sell items within the campus community.
- **Lost & Found Tracker**: A real-time registry to report and recover lost belongings.
- **Digital Timetable**: Create and manage weekly class schedules with a visual interface.
- **Notice Board & Events**: Stay updated with campus-wide announcements and upcoming event RSVPs.

## Tech Stack
- **Frontend**: React 19, Vite, CSS3
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for notes and files)

## How to Run
1. **Clone the repository**:
   ```bash
   git clone https://github.com/dhatrri-dev/campus-catalyst.git
   cd campus-catalyst
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Build for production**:
   ```bash
   npm run build
   ```

## Author
- [Dhatrri](https://github.com/dhatrri-dev)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
