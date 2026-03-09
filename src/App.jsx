import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import "./App.css";

function useInView(t = 0.15) { const ref = useRef(null); const [inView, setInView] = useState(false); useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []); return [ref, inView]; }
function useCounter(target, duration = 2000, active = false) { const [count, setCount] = useState(0); useEffect(() => { if (!active) return; let start = 0; const step = target / (duration / 16); const timer = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(start)); }, 16); return () => clearInterval(timer); }, [active, target, duration]); return count; }

const I = {
    Notes: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    Roommate: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Admin: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    Home: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>,
    Upload: () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16,16 12,12 8,16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>,
    Search: () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Star: () => <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>,
    Bot: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><circle cx="8" cy="16" r="1" fill="currentColor" /><circle cx="16" cy="16" r="1" fill="currentColor" /></svg>,
    Arrow: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>,
    Check: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12" /></svg>,
    Zap: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>,
    Play: () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>,
    Pause: () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>,
    Eye: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    EyeOff: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
    Mail: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    Lock: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    User: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    LogOut: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    Download: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="8,17 12,21 16,17" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" /></svg>,
    Clipboard: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="12" y2="17" /></svg>,
    Trash: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Utensils: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><line x1="7" y1="2" x2="7" y2="22" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" /></svg>,
    MapPin: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    Calendar: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Heart: () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
    UserCircle: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>,
    Edit2: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>,
    Camera: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    Bell: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    Timetable: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="14" x2="8" y2="14" strokeWidth="3" strokeLinecap="round" /><line x1="12" y1="14" x2="12" y2="14" strokeWidth="3" strokeLinecap="round" /><line x1="16" y1="14" x2="16" y2="14" strokeWidth="3" strokeLinecap="round" /><line x1="8" y1="18" x2="8" y2="18" strokeWidth="3" strokeLinecap="round" /><line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round" /></svg>,
    Plus: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    X: () => <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    ShoppingBag: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
};

const TAG_COLORS = { "Exam Prep": "#6366f1", "Cheat Sheets": "#ec4899", "Summary": "#f59e0b", "Mind Maps": "#10b981" };
const COURSES = { "B.Tech": 8, "M.Tech": 4, "MBA": 4, "BCA": 6, "MCA": 4, "B.Sc": 6, "M.Sc": 4, "B.Com": 6, "B.Arch": 10, "Other": 8 };
const TT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TT_TIMES = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const TT_COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#ef4444", "#14b8a6"];
const TASKS = [
    { id: 1, title: "Fee Payment Reminder", status: "active", runs: 1240, type: "Email", lastRun: "2h ago", desc: "Auto-reminds students 7 days before due date", progress: 78 },
    { id: 2, title: "Attendance Report Generator", status: "active", runs: 380, type: "Report", lastRun: "1d ago", desc: "Generates weekly attendance PDFs for faculty", progress: 92 },
    { id: 3, title: "Library Due Date Alerts", status: "paused", runs: 892, type: "SMS", lastRun: "3d ago", desc: "Alerts students 2 days before book return", progress: 45 },
    { id: 4, title: "Exam Schedule Publisher", status: "active", runs: 56, type: "Notification", lastRun: "5h ago", desc: "Pushes exam timetables to student dashboard", progress: 60 },
    { id: 5, title: "Hostel Complaint Tracker", status: "draft", runs: 0, type: "Form", lastRun: "—", desc: "Routes complaints to respective wardens", progress: 0 },
];

// AUTH
function AuthPage({ onAuth, theme, toggleTheme }) {
    const [mode, setMode] = useState("login"); const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [showPass, setShowPass] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState("");
    const [mounted, setMounted] = useState(false); useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);
    const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(""); };
    const sw = m => { setMode(m); setError(""); setSuccess(""); setForm({ name: "", email: "", password: "", confirm: "" }); };
    const sendReset = async () => {
        setError(""); setSuccess("");
        if (!form.email) return setError("Please enter your email.");
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(form.email, { redirectTo: window.location.origin });
            if (error) throw error;
            setSuccess("Password reset email sent! Check your inbox.");
        } catch (e) { setError(e.message || "Something went wrong."); }
        setLoading(false);
    };
    const go = async () => {
        setError(""); setSuccess("");
        if (!form.email || !form.password) return setError("Please fill in all fields.");
        if (mode === "register") { if (!form.name) return setError("Please enter your name."); if (form.password !== form.confirm) return setError("Passwords don't match."); if (form.password.length < 6) return setError("Min 6 characters."); }
        setLoading(true);
        try {
            if (mode === "login") { const { data, error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password }); if (error) throw error; onAuth(data.user); }
            else { const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.name } } }); if (error) throw error; if (data.user && !data.session) { setSuccess("Check your email to confirm, then log in!"); setMode("login"); } else if (data.user) onAuth(data.user); }
        } catch (e) { setError(e.message || "Something went wrong."); }
        setLoading(false);
    };
    return (
        <div className="auth-page">
            {/* Theme toggle button - top right corner */}
            <button
                onClick={toggleTheme}
                style={{
                    position: "fixed", top: 16, right: 16, zIndex: 200,
                    width: 44, height: 44, borderRadius: "50%",
                    background: theme === "light" ? "#FFFFFF" : "var(--card)",
                    border: "1px solid var(--border)",
                    cursor: "pointer", fontSize: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "var(--shadow)", transition: "all 0.3s"
                }}
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
                {theme === "light" ? "🌙" : "☀️"}
            </button>
            <div className="auth-bg"><div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" /></div>
            <div className={`auth-card ${mounted ? "animate-in" : ""}`}>
                {/* Left panel */}
                <div className="auth-brand">
                    <div className="brand-logo"><I.Zap /></div>
                    <span className="brand-name">Campus<b>Catalyst</b></span>
                    <p className="auth-brand-sub">&ldquo;Organize your campus life, beautifully.&rdquo;</p>
                </div>
                {/* Right panel */}
                <div className="auth-right">
                    <div className="auth-tabs"><button className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => sw("login")}>Sign In</button><button className={`auth-tab ${mode === "register" ? "active" : ""}`} onClick={() => sw("register")}>Register</button></div>
                    <div className="auth-form">
                        <h2 className="auth-title">{mode === "forgot" ? "Reset Password" : mode === "login" ? "Welcome Back!" : "Join CampusCatalyst"}</h2>
                        <p className="auth-sub">{mode === "forgot" ? "Enter your email and we'll send a reset link" : mode === "login" ? "Sign in to continue" : "Create your free account today"}</p>
                        {mode === "register" && <div className="inp-group animate-in"><label>Full Name</label><div className="inp-wrap"><I.User /><input className="auth-inp" placeholder="Arjun Kumar" value={form.name} onChange={e => update("name", e.target.value)} /></div></div>}
                        <div className="inp-group"><label>Email</label><div className="inp-wrap"><I.Mail /><input className="auth-inp" type="email" placeholder="you@college.edu" value={form.email} onChange={e => update("email", e.target.value)} onKeyDown={e => e.key === "Enter" && (mode === "forgot" ? sendReset() : go())} /></div></div>
                        {mode !== "forgot" && <div className="inp-group"><label>Password</label><div className="inp-wrap"><I.Lock /><input className="auth-inp" type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => update("password", e.target.value)} onKeyDown={e => e.key === "Enter" && go()} /><button className="eye-btn" onClick={() => setShowPass(s => !s)}>{showPass ? <I.EyeOff /> : <I.Eye />}</button></div></div>}
                        {mode === "register" && <div className="inp-group animate-in"><label>Confirm Password</label><div className="inp-wrap"><I.Lock /><input className="auth-inp" type={showPass ? "text" : "password"} placeholder="••••••••" value={form.confirm} onChange={e => update("confirm", e.target.value)} onKeyDown={e => e.key === "Enter" && go()} /></div></div>}
                        {mode === "login" && <div style={{ textAlign: "right", marginTop: -8, marginBottom: 8 }}><button className="switch-link" onClick={() => sw("forgot")} style={{ fontSize: 13 }}>Forgot Password?</button></div>}
                        {error && <div className="auth-error">⚠️ {error}</div>}
                        {success && <div className="auth-success">✅ {success}</div>}
                        <button className={`btn-glow full ${loading ? "loading" : ""}`} onClick={mode === "forgot" ? sendReset : go} disabled={loading}>{loading ? <span className="spinner" /> : mode === "forgot" ? "Send Reset Link" : mode === "login" ? "Login" : "Create Account"}</button>
                        <p className="auth-switch">{mode === "forgot" ? "Remember it? " : mode === "login" ? "Don't have an account? " : "Already have an account? "}<button className="switch-link" onClick={() => sw(mode === "forgot" ? "login" : mode === "login" ? "register" : "login")}>{mode === "forgot" ? "Back to Sign In" : mode === "login" ? "Register" : "Sign in"}</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// NAVBAR
function Navbar({ page, setPage, user, onLogout, theme, toggleTheme }) {
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [stats, setStats] = useState(null);
    const menuRef = useRef();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Clickaway to close menu
    useEffect(() => {
        if (!showMenu) return;
        const handle = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false); };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [showMenu]);

    // Fetch stats when menu opens
    useEffect(() => {
        if (!showMenu || stats) return;
        (async () => {
            const [{ count: notesCount }] = await Promise.all([
                supabase.from("notes").select("*", { count: "exact", head: true }).eq("author_id", user.id),
            ]);
            setStats({ notes: notesCount || 0 });
        })();
    }, [showMenu]);


    const ADMIN_EMAILS = ["nagapatla.dhatrri2024@vitstudent.ac.in"];
    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(user?.email?.toLowerCase().trim());
    const nav = [
        { id: "home", label: "Home", icon: <I.Home /> },
        { id: "notes", label: "Notes Hub", icon: <I.Notes /> },
        ...(!isAdmin ? [{ id: "roommate", label: "Roommate Match", icon: <I.Roommate /> }] : []),
        ...(!isAdmin ? [{ id: "mess", label: "Mess Menu", icon: <I.Utensils /> }] : []),
        ...(!isAdmin ? [{ id: "lostfound", label: "Lost & Found", icon: <I.MapPin /> }] : []),
        ...(!isAdmin ? [{ id: "marketplace", label: "Marketplace", icon: <I.ShoppingBag /> }] : []),
        ...(!isAdmin ? [{ id: "timetable", label: "Timetable", icon: <I.Timetable /> }] : []),
        ...(!isAdmin ? [{ id: "profile", label: "My Profile", icon: <I.UserCircle /> }] : []),
        { id: "notices", label: "Notice Board", icon: <I.Bell /> },
        { id: "events", label: "Events", icon: <I.Calendar /> },
        ...(isAdmin ? [{ id: "admin", label: "Admin Tasks", icon: <I.Admin /> }] : []),
    ];
    const initials = user?.user_metadata?.full_name ? user.user_metadata.full_name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : user?.email?.slice(0, 2).toUpperCase() || "CC";
    const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : null;

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="nav-brand" onClick={() => setPage("home")}><div className="brand-logo"><I.Zap /></div><span className="brand-name">Campus<b>Catalyst</b></span></div>
            <div className="nav-links">{nav.map(n => <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>{n.icon} <span>{n.label}</span>{page === n.id && <div className="nav-active-pill" />}</button>)}</div>
            <button
                onClick={toggleTheme}
                style={{
                    background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 20,
                    width: 42, height: 24, cursor: "pointer", position: "relative",
                    display: "flex", alignItems: "center", padding: "0 3px",
                    transition: "background 0.3s", marginRight: 10,
                    justifyContent: theme === "light" ? "flex-end" : "flex-start"
                }}
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
                <span style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: theme === "light" ? "#f59e0b" : "var(--accent3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, transition: "all 0.3s"
                }}>{theme === "light" ? "☀️" : "🌙"}</span>
            </button>
            <div className="nav-right" style={{ position: "relative" }} ref={menuRef}>
                <div className="nav-avatar" onClick={() => setShowMenu(s => !s)}><span>{initials}</span><div className="avatar-ring" /></div>
                {showMenu && (
                    <div className="user-menu animate-slide-down">
                        {/* Avatar + Name */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 14, borderBottom: "1px solid var(--border)", marginBottom: 14 }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,var(--accent),#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "white", flexShrink: 0, boxShadow: "0 0 14px #6366f155" }}>{initials}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.user_metadata?.full_name || user?.email?.split("@")[0]}</div>
                                <div style={{ fontSize: 11, color: "var(--muted2)", marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</div>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: isAdmin ? "#f59e0b18" : "#6366f118", color: isAdmin ? "#f59e0b" : "var(--accent3)", border: `1px solid ${isAdmin ? "#f59e0b44" : "#6366f144"}` }}>{isAdmin ? "⚙️ Admin" : "🎓 Student"}</span>
                            </div>
                        </div>

                        {/* Stats */}
                        {!isAdmin && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginBottom: 14 }}>
                                {[
                                    { label: "Notes Uploaded", val: stats?.notes ?? "…", icon: "📒" },
                                ].map(s => (
                                    <div key={s.label} style={{ background: "var(--bg3)", borderRadius: 10, padding: "8px 6px", textAlign: "center", border: "1px solid var(--border)" }}>
                                        <div style={{ fontSize: 14 }}>{s.icon}</div>
                                        <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>{s.val}</div>
                                        <div style={{ fontSize: 10, color: "var(--muted2)" }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/*Joined date */}
                        {joinedDate && <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14, display: "flex", alignItems: "center", gap: 5 }}>🗓️ Joined {joinedDate}</div>}

                        {!isAdmin && (
                            <button className="user-menu-btn" style={{ width: "100%", marginBottom: 6 }} onClick={() => { setPage("profile"); setShowMenu(false); }}><I.UserCircle /> My Profile</button>
                        )}

                        {/* Sign Out */}
                        <button className="user-menu-btn" style={{ width: "100%", marginTop: 4 }} onClick={() => { onLogout(); setShowMenu(false); }}><I.LogOut /> Sign Out</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

function Counter({ target, suffix = "", active }) { const val = useCounter(target, 2000, active); return <>{val.toLocaleString()}{suffix}</>; }

// HOME
function HomePage({ setPage, user }) {
    const [sR, sV] = useInView(); const [fR, fV] = useInView(); const [m, setM] = useState(false);
    const [userStats, setUserStats] = useState({ notes: 0, likes: 0, matches: 0, lastUpload: "—" });

    useEffect(() => {
        setTimeout(() => setM(true), 50);
        if (user) fetchUserStats();
    }, [user]);

    const fetchUserStats = async () => {
        const ADMIN_EMAILS = ["nagapatla.dhatrri2024@vitstudent.ac.in"];
        const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(user?.email?.toLowerCase().trim());
        if (isAdmin) return;

        try {
            // My Notes
            const { count: nC } = await supabase.from("notes").select("*", { count: "exact", head: true }).eq("author_id", user.id);
            // Notes Liked (from note_likes table)
            const { count: lC } = await supabase.from("note_likes").select("*", { count: "exact", head: true }).eq("user_id", user.id);
            // My Matches (proxied by profile count for now)
            const { data: p } = await supabase.from("profiles").select("gender").eq("id", user.id).single();
            let mT = 0;
            if (p?.gender) {
                const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true }).neq("id", user.id).eq("gender", p.gender);
                mT = count || 0;
            }
            // Recently Uploaded
            const { data: lN } = await supabase.from("notes").select("created_at").eq("author_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();

            setUserStats({
                notes: nC || 0,
                likes: lC || 0,
                matches: mT || 0,
                lastUpload: lN ? new Date(lN.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"
            });
        } catch (e) { console.error("Stats error:", e); }
    };

    const name = user?.user_metadata?.full_name?.split(" ")[0] || "there";
    const ADMIN_EMAILS = ["nagapatla.dhatrri2024@vitstudent.ac.in"];
    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(user?.email?.toLowerCase().trim());

    return (
        <div className="page home-page">
            <div className="bg-orbs"><div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" /></div>
            <div className="hero">
                <div className={`hero-badge ${m ? "animate-in" : ""}`}><span className="badge-dot" />🎓 Welcome back, {name}!</div>
                <h1 className={`hero-title ${m ? "animate-in" : ""}`} style={{ animationDelay: "0.1s" }}>Your Campus.<br /><span className="hero-gradient">Supercharged.</span></h1>
                <p className={`hero-sub ${m ? "animate-in" : ""}`} style={{ animationDelay: "0.2s" }}>Share notes, find your ideal roommate, and discover campus life — all in one place.</p>
                <div className={`hero-btns ${m ? "animate-in" : ""}`} style={{ animationDelay: "0.3s" }}>
                    <button className="btn-glow" onClick={() => setPage("notes")}><span>Explore Notes</span><I.Arrow /></button>
                    {!isAdmin && <button className="btn-glass" onClick={() => setPage("roommate")}>Find Roommate</button>}
                </div>
                <div className={`hero-floaters ${m ? "animate-in" : ""}`} style={{ animationDelay: "0.5s" }}>
                    <div className="floater floater-1">📒 Real notes being shared</div>
                    <div className="floater floater-2">🏠 Real matches found!</div>
                    <div className="floater floater-3">⚙️ Tasks automated</div>
                </div>
            </div>

            {!isAdmin && (
                <div className="stats-section" ref={sR}>
                    {[
                        { num: userStats.notes, label: "My Notes", icon: "📒" },
                        { num: userStats.likes, label: "Notes Liked", icon: "❤️" },
                        { num: userStats.matches, label: "My Matches", icon: "🏠" },
                        { date: userStats.lastUpload, label: "Recently Uploaded", icon: "📅" }
                    ].map((s, i) => (
                        <div key={s.label} className={`stat-card ${sV ? "animate-in" : ""}`} style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="stat-icon">{s.icon}</div>
                            <div className="stat-num">
                                {s.date ? s.date : <Counter target={s.num} active={sV} />}
                            </div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            )}

            <div className="features-section" ref={fR}>
                <div className={`section-label ${fV ? "animate-in" : ""}`}>Everything you need</div>
                <div className="features-grid">
                    {[{ icon: "📒", title: "Note Sharing", desc: "Upload real PDFs, discover notes from real students on your campus.", page: "notes", color: "#6366f1", tag: "Real uploads" }, { icon: "🏠", title: "Roommate Matching", desc: "Get matched with real students based on actual lifestyle preferences.", page: "roommate", color: "#ec4899", tag: "Real profiles" }, { icon: "⚙️", title: "Admin Automation", desc: "Automate fee reminders, attendance reports, and complaint routing.", page: "admin", color: "#f59e0b", tag: "5 automations" }].map((f, i) => (
                        <div key={f.title} className={`feature-card ${fV ? "animate-in" : ""}`} style={{ animationDelay: `${i * 0.12}s`, "--card-accent": f.color }} onClick={() => setPage(f.page)}>
                            <div className="feature-glow" /><div className="feature-tag">{f.tag}</div><div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3><p>{f.desc}</p><div className="feature-cta"><span>Explore</span><I.Arrow /></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



// NOTES (REAL)
function NoteCommentsPanel({ noteId, user }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [posting, setPosting] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        fetchComments();
    }, [noteId]);

    const fetchComments = async () => {
        const { data } = await supabase
            .from("note_comments")
            .select("*")
            .eq("note_id", noteId)
            .order("created_at", { ascending: true });
        if (data) setComments(data);
    };

    const postComment = async () => {
        if (!text.trim()) return;
        setPosting(true);
        const { error } = await supabase.from("note_comments").insert({
            note_id: noteId,
            user_id: user.id,
            author_name: user.user_metadata?.full_name || user.email.split("@")[0],
            text: text.trim(),
        });
        if (!error) { setText(""); await fetchComments(); }
        setPosting(false);
    };

    const timeAgo = (ts) => {
        const diff = (Date.now() - new Date(ts)) / 1000;
        if (diff < 60) return "just now";
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    return (
        <div className="comments-panel">
            {comments.length === 0 && (
                <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: "8px 0" }}>No comments yet — be the first! 💬</div>
            )}
            <div className="comments-list">
                {comments.map(c => (
                    <div key={c.id} className="comment-row">
                        <div className="comment-avatar">{c.author_name?.slice(0, 1).toUpperCase()}</div>
                        <div className="comment-body">
                            <div className="comment-meta"><b>{c.author_name}</b> · <span>{timeAgo(c.created_at)}</span></div>
                            <div className="comment-text">{c.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="comment-input-row">
                <div className="comment-avatar" style={{ background: "linear-gradient(135deg,var(--accent),#a855f7)" }}>
                    {(user.user_metadata?.full_name || user.email).slice(0, 1).toUpperCase()}
                </div>
                <input
                    ref={inputRef}
                    className="comment-inp"
                    placeholder="Write a comment..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && postComment()}
                />
                <button className="comment-send" onClick={postComment} disabled={!text.trim() || posting}>
                    {posting ? "…" : "↵"}
                </button>
            </div>
        </div>
    );
}

function StarRating({ noteId, userId, initialRating = 0, avgRating = 0, ratingCount = 0, onRate }) {
    const [hovered, setHovered] = useState(0);
    const [userRating, setUserRating] = useState(initialRating);

    const handleRate = async (star) => {
        setUserRating(star);
        await supabase.from("note_ratings").upsert({ note_id: noteId, user_id: userId, rating: star }, { onConflict: "note_id,user_id" });
        if (onRate) onRate(noteId, star);
    };

    const display = hovered || userRating;
    const avg = avgRating ? avgRating.toFixed(1) : "—";

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map(star => (
                    <button key={star}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => handleRate(star)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 1px", transition: "transform 0.1s", transform: hovered >= star ? "scale(1.2)" : "scale(1)" }}
                    >
                        <svg width="14" height="14" fill={display >= star ? "#f59e0b" : "none"} stroke={display >= star ? "#f59e0b" : "var(--muted)"} strokeWidth="2" viewBox="0 0 24 24">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                    </button>
                ))}
            </div>
            <span style={{ fontSize: 11, color: "var(--muted2)" }}>
                {avg} {ratingCount > 0 && <span style={{ opacity: 0.7 }}>({ratingCount})</span>}
            </span>
        </div>
    );
}

function NotesPage({ user }) {
    const [notes, setNotes] = useState([]); const [search, setSearch] = useState(""); const [filter, setFilter] = useState("All");
    const [liked, setLiked] = useState([]); const [showUpload, setShowUpload] = useState(false); const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState(""); const [form, setForm] = useState({ title: "", subject: "", tag: "Exam Prep" }); const [file, setFile] = useState(null);
    const [mounted, setMounted] = useState(false); const fileRef = useRef();
    const [userRatings, setUserRatings] = useState({});
    const [noteRatingStats, setNoteRatingStats] = useState({});
    const [noteLikeStats, setNoteLikeStats] = useState({});
    const [sortBy, setSortBy] = useState("newest");
    const [expandedComments, setExpandedComments] = useState(new Set());
    const toggleComments = (id) => setExpandedComments(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

    useEffect(() => { setTimeout(() => setMounted(true), 50); fetchNotes(); fetchUserRatings(); fetchUserLikes(); }, []);

    const fetchNotes = async () => {
        const { data } = await supabase.from("notes").select("*").order("created_at", { ascending: false });
        if (data) {
            setNotes(data);
            fetchRatingStats(data.map(n => n.id));
            fetchLikeStats();
        }
    };

    const fetchUserRatings = async () => {
        const { data } = await supabase.from("note_ratings").select("note_id, rating").eq("user_id", user.id);
        if (data) {
            const map = {};
            data.forEach(r => { map[r.note_id] = r.rating; });
            setUserRatings(map);
        }
    };

    const fetchUserLikes = async () => {
        const { data } = await supabase.from("note_likes").select("note_id").eq("user_id", user.id);
        if (data) setLiked(data.map(l => l.note_id));
    };

    const fetchLikeStats = async () => {
        const { data } = await supabase.from("note_likes").select("note_id");
        if (data) {
            const counts = {};
            data.forEach(l => { counts[l.note_id] = (counts[l.note_id] || 0) + 1; });
            setNoteLikeStats(counts);
        }
    };

    const fetchRatingStats = async (noteIds) => {
        if (!noteIds.length) return;
        const { data } = await supabase.from("note_ratings").select("note_id, rating");
        if (data) {
            const stats = {};
            data.forEach(r => {
                if (!stats[r.note_id]) stats[r.note_id] = { sum: 0, count: 0 };
                stats[r.note_id].sum += r.rating;
                stats[r.note_id].count += 1;
            });
            const result = {};
            Object.entries(stats).forEach(([id, s]) => { result[id] = { avg: s.sum / s.count, count: s.count }; });
            setNoteRatingStats(result);
        }
    };

    const handleRate = async (noteId, star) => {
        setUserRatings(r => ({ ...r, [noteId]: star }));
        setNoteRatingStats(s => {
            const prev = s[noteId] || { avg: 0, count: 0 };
            const wasRated = userRatings[noteId];
            const newCount = wasRated ? prev.count : prev.count + 1;
            const newSum = wasRated ? (prev.avg * prev.count - wasRated + star) : (prev.avg * prev.count + star);
            return { ...s, [noteId]: { avg: newSum / newCount, count: newCount } };
        });
        await supabase.from("note_ratings").upsert({ note_id: noteId, user_id: user.id, rating: star }, { onConflict: "note_id,user_id" });
    };

    const toggleLike = async (noteId) => {
        const isLiked = liked.includes(noteId);
        if (isLiked) {
            setLiked(l => l.filter(id => id !== noteId));
            setNoteLikeStats(s => ({ ...s, [noteId]: Math.max(0, (s[noteId] || 0) - 1) }));
            const { error } = await supabase.from("note_likes").delete().eq("note_id", noteId).eq("user_id", user.id);
            if (error) console.error("Unlike error:", error.message);
        } else {
            setLiked(l => [...l, noteId]);
            setNoteLikeStats(s => ({ ...s, [noteId]: (s[noteId] || 0) + 1 }));
            const { error } = await supabase.from("note_likes").insert({ note_id: noteId, user_id: user.id });
            if (error) console.error("Like error:", error.message);
        }
    };

    const handleUpload = async () => {
        if (!form.title || !form.subject) return setMsg("Please fill title and subject.");
        setUploading(true); setMsg("");
        try {
            let file_url = null;
            if (file) { const ext = file.name.split(".").pop(); const fn = `${Date.now()}_${user.id}.${ext}`; const { error: e } = await supabase.storage.from("notes").upload(fn, file); if (e) throw e; const { data: u } = supabase.storage.from("notes").getPublicUrl(fn); file_url = u.publicUrl; }
            const { error } = await supabase.from("notes").insert({ title: form.title, subject: form.subject, tag: form.tag, author_id: user.id, author_name: user.user_metadata?.full_name || user.email, file_url, pages: file ? Math.floor(Math.random() * 15) + 1 : 0 });
            if (error) throw error;
            setMsg("✅ Note uploaded!"); setForm({ title: "", subject: "", tag: "Exam Prep" }); setFile(null); fetchNotes(); setTimeout(() => setShowUpload(false), 1500);
        } catch (e) { setMsg("❌ " + e.message); }
        setUploading(false);
    };

    const tags = ["All", "Exam Prep", "Summary", "Cheat Sheets", "Mind Maps"];
    const filtered = notes
        .filter(n => (filter === "All" || n.tag === filter) && (n.title?.toLowerCase().includes(search.toLowerCase()) || n.subject?.toLowerCase().includes(search.toLowerCase())))
        .sort((a, b) => {
            if (sortBy === "top-rated") {
                const avgA = noteRatingStats[a.id]?.avg || 0;
                const avgB = noteRatingStats[b.id]?.avg || 0;
                return avgB - avgA;
            }
            return 0; // keep default (newest from DB)
        });

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div><div className="page-eyebrow">Study Smarter</div><h2 className="page-title">Notes <span className="title-accent">Hub</span></h2><p className="page-sub">Upload and discover real class notes from your campus</p></div>
                <button className="btn-glow sm" onClick={() => setShowUpload(!showUpload)}><I.Upload /> Upload Note</button>
            </div>
            {showUpload && (
                <div className="upload-panel animate-slide-down">
                    <h3>📎 Share a Note</h3>
                    <div className="form-row">
                        <input className="inp" placeholder="Note Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                        <input className="inp" placeholder="Subject Code (e.g. CS301)" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                    </div>
                    <div className="form-row">
                        <select className="inp" value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}>{tags.slice(1).map(t => <option key={t}>{t}</option>)}</select>
                        <div className="file-drop" onClick={() => fileRef.current.click()}><I.Upload /><span>{file ? `✅ ${file.name}` : "Click to attach PDF / Image"}</span><input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} /></div>
                    </div>
                    {msg && <div className={msg.startsWith("✅") ? "auth-success" : "auth-error"}>{msg}</div>}
                    <div className="upload-actions">
                        <button className={`btn-glow sm ${uploading ? "loading" : ""}`} onClick={handleUpload} disabled={uploading}>{uploading ? <span className="spinner" /> : "Publish Note"}</button>
                        <button className="btn-ghost" onClick={() => setShowUpload(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <div className={`search-bar-row ${mounted ? "animate-in" : ""}`} style={{ animationDelay: "0.1s" }}>
                <div className="search-box"><I.Search /><input className="search-inp" placeholder="Search notes, subjects..." value={search} onChange={e => setSearch(e.target.value)} />{search && <button className="clear-btn" onClick={() => setSearch("")}>✕</button>}</div>
                <div className="tag-filters">
                    {tags.map(t => <button key={t} className={`tag-pill ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>{t}</button>)}
                    <div style={{ borderLeft: "1px solid var(--border)", height: 20, margin: "0 4px" }} />
                    <button className={`tag-pill ${sortBy === "newest" ? "active" : ""}`} onClick={() => setSortBy("newest")}>🕐 Newest</button>
                    <button className={`tag-pill ${sortBy === "top-rated" ? "active" : ""}`} onClick={() => setSortBy("top-rated")}>⭐ Most Rated</button>
                </div>
            </div>
            {notes.length === 0 && <div className="empty-state"><div className="empty-icon">📒</div><p>No notes yet! Be the first to <b>upload one</b>.</p></div>}
            <div className="notes-grid">
                {filtered.map((note, i) => (
                    <div key={note.id} className={`note-card ${mounted ? "animate-in" : ""}`} style={{ animationDelay: `${i * 0.07}s`, "--note-color": TAG_COLORS[note.tag] || "#6366f1" }}>
                        <div className="note-color-bar" />
                        <div className="note-top"><span className="note-subject">{note.subject}</span><span className="note-tag">{note.tag}</span></div>
                        <h3 className="note-title">{note.title}</h3>
                        <p className="note-meta">by {note.author_name} · {new Date(note.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} {note.pages > 0 ? `· ${note.pages}p` : ""}</p>
                        {/* ⭐ Star Rating */}
                        <div style={{ marginBottom: 10 }}>
                            <StarRating
                                noteId={note.id}
                                userId={user.id}
                                initialRating={userRatings[note.id] || 0}
                                avgRating={noteRatingStats[note.id]?.avg || 0}
                                ratingCount={noteRatingStats[note.id]?.count || 0}
                                onRate={handleRate}
                            />
                        </div>
                        <div className="note-footer">
                            <button className={`like-btn ${liked.includes(note.id) ? "liked" : ""}`} onClick={() => toggleLike(note.id)}><I.Heart /> {noteLikeStats[note.id] || 0}</button>
                            <button className={`comment-toggle-btn ${expandedComments.has(note.id) ? "active" : ""}`} onClick={() => toggleComments(note.id)}>
                                💬 Comments{expandedComments.has(note.id) ? " ▲" : " ▼"}
                            </button>
                            {note.file_url ? <a href={note.file_url} target="_blank" rel="noreferrer" className="btn-ghost sm" style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}><I.Download /> Download</a> : <span className="btn-ghost sm" style={{ opacity: 0.4, cursor: "default" }}>No file</span>}
                        </div>
                        {expandedComments.has(note.id) && <NoteCommentsPanel noteId={note.id} user={user} />}
                    </div>
                ))}
            </div>

        </div>
    );
}

// ROOMMATE (REAL)
function RoommatePage({ user }) {
    const [step, setStep] = useState("loading");
    const [prefs, setPrefs] = useState({ sleep: "", noise: "", cleanliness: 3, hobbies: [], year: "", major: "", gender: "" });
    const [matches, setMatches] = useState([]);
    const [connected, setConnected] = useState([]);   // IDs we've sent a request to
    const [incomingReqs, setIncomingReqs] = useState([]); // incoming requests for notification
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const [userGender, setUserGender] = useState("");
    const [mounted, setMounted] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    useEffect(() => { setTimeout(() => setMounted(true), 50); checkProfile(); fetchConnections(); fetchIncomingRequests(); }, []);

    const checkProfile = async () => {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (data) {
            setPrefs(p => ({ ...p, ...data, hobbies: data.hobbies || [], gender: data.gender || "" }));
            if (!data.gender) {
                setStep("form");
            } else {
                setUserGender(data.gender);
                fetchMatches(data.gender);
                setStep("matches");
            }
        } else setStep("form");
    };

    const fetchMatches = async (gender) => {
        // Only fetch profiles of the same gender — strict separation
        const g = gender || userGender || prefs.gender;
        const query = supabase.from("profiles").select("*").neq("id", user.id);
        if (g) query.eq("gender", g);
        const { data } = await query;
        if (data) setMatches(data);
    };

    const saveProfile = async () => {
        if (!prefs.sleep || !prefs.noise || !prefs.year || !prefs.major || !prefs.gender) return setMsg("Please fill all fields including gender.");
        setSaving(true); setMsg("");
        const { error } = await supabase.from("profiles").upsert({
            id: user.id,
            full_name: user.user_metadata?.full_name || user.email,
            year: prefs.year, major: prefs.major,
            sleep: prefs.sleep, noise: prefs.noise,
            cleanliness: prefs.cleanliness,
            hobbies: prefs.hobbies,
            gender: prefs.gender,
        });
        if (error) { setMsg("❌ " + error.message); setSaving(false); return; }
        setUserGender(prefs.gender);
        await fetchMatches(prefs.gender); setStep("matches"); setSaving(false);
    };

    const deleteProfile = async () => {
        if (!window.confirm("Delete your roommate profile? You can re-create it anytime.")) return;
        await supabase.from("profiles").delete().eq("id", user.id);
        setPrefs({ sleep: "", noise: "", cleanliness: 3, hobbies: [], year: "", major: "", gender: "" });
        setStep("form");
    };

    const fetchConnections = async () => {
        const { data } = await supabase.from("roommate_requests").select("to_user_id").eq("from_user_id", user.id);
        if (data) setConnected(data.map(r => r.to_user_id));
    };

    const fetchIncomingRequests = async () => {
        // Step 1: get IDs of people who sent us a request
        const { data: reqs, error } = await supabase
            .from("roommate_requests")
            .select("from_user_id")
            .eq("to_user_id", user.id)
            .eq("status", "pending");
        if (error) { console.error("fetchIncomingRequests error:", error.message); return; }
        if (!reqs || reqs.length === 0) { setIncomingReqs([]); return; }

        // Step 2: get profile names for those IDs
        const ids = reqs.map(r => r.from_user_id);
        const { data: profiles } = await supabase
            .from("profiles")
            .select("id, full_name")
            .in("id", ids);

        const nameMap = {};
        (profiles || []).forEach(p => { nameMap[p.id] = p.full_name; });

        setIncomingReqs(reqs.map(r => ({
            from_user_id: r.from_user_id,
            name: nameMap[r.from_user_id] || "A student"
        })));
    };

    const sendConnect = async (toUserId, toName) => {
        if (connected.includes(toUserId)) return;
        setConnected(c => [...c, toUserId]);
        const { error } = await supabase.from("roommate_requests").insert({
            from_user_id: user.id,
            to_user_id: toUserId,
            status: "pending",
        });
        if (error) {
            if (error.message.toLowerCase().includes("duplicate") || error.code === "23505") {
                // already sent — keep as Sent
            } else {
                console.error("Connect error:", error.message);
                setConnected(c => c.filter(id => id !== toUserId));
                setMsg("❌ Could not send request: " + error.message + "\n→ Make sure the roommate_requests table exists in Supabase!");
            }
        } else {
            setMsg("✅ Connection request sent!");
            setTimeout(() => setMsg(""), 3000);
        }
    };

    const acceptRequest = async (fromUserId) => {
        await supabase.from("roommate_requests").update({ status: "accepted" })
            .eq("from_user_id", fromUserId).eq("to_user_id", user.id);
        setIncomingReqs(r => r.filter(x => x.from_user_id !== fromUserId));
    };

    const declineRequest = async (fromUserId) => {
        await supabase.from("roommate_requests").delete()
            .eq("from_user_id", fromUserId).eq("to_user_id", user.id);
        setIncomingReqs(r => r.filter(x => x.from_user_id !== fromUserId));
    };

    const calcMatch = r => {
        let s = 50;
        if (r.sleep === prefs.sleep) s += 20;
        if (r.noise === prefs.noise) s += 15;
        s += (5 - Math.abs((r.cleanliness || 3) - prefs.cleanliness)) * 3;
        s += (r.hobbies || []).filter(h => prefs.hobbies.includes(h)).length * 3;
        return Math.min(99, Math.max(30, s));
    };

    const mc = m => m >= 85 ? "#22c55e" : m >= 70 ? "#f59e0b" : "#ef4444";
    const ml = m => m >= 85 ? "Excellent" : m >= 70 ? "Good" : "Fair";
    const hobbies = ["Gaming", "Music", "Reading", "Sports", "Coding", "Cooking", "Chess", "Photography", "Movies", "Gym"];
    const th = h => setPrefs(p => ({ ...p, hobbies: p.hobbies.includes(h) ? p.hobbies.filter(x => x !== h) : [...p.hobbies, h] }));

    const genderGradient = g => g === "Female" ? "linear-gradient(135deg,#ec4899,#f472b6)" : g === "Male" ? "linear-gradient(135deg,#3b82f6,#6366f1)" : "linear-gradient(135deg,#6366f1,#a855f7)";
    const genderIcon = g => g === "Female" ? "👩" : g === "Male" ? "👦" : "🧑";
    const genderLabel = g => g === "Female" ? "Girls Hostel" : g === "Male" ? "Boys Hostel" : "Others";

    if (step === "loading") return <div className="page"><div className="empty-state"><div className="empty-icon">⏳</div><p>Loading...</p></div></div>;

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div><div className="page-eyebrow">AI Powered</div><h2 className="page-title">Roommate <span className="title-accent">Match</span></h2><p className="page-sub">Real matches based on real student profiles — boys & girls separate</p></div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {/* 🔔 Notification Bell */}
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => { setNotifOpen(o => { if (!o) fetchIncomingRequests(); return !o; }); }}
                            style={{ position: "relative", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 12px", cursor: "pointer", color: "var(--text)", fontSize: 16 }}
                        >
                            🔔
                            {incomingReqs.length > 0 && (
                                <span style={{ position: "absolute", top: -6, right: -6, background: "#ef4444", color: "white", borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {incomingReqs.length}
                                </span>
                            )}
                        </button>
                        {notifOpen && (
                            <div style={{ position: "absolute", right: 0, top: 44, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, width: 280, zIndex: 100, boxShadow: "var(--shadow-lg)" }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>🔔 Connection Requests</div>
                                {incomingReqs.length === 0 ? (
                                    <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: "8px 0" }}>No pending requests</div>
                                ) : incomingReqs.map(req => (
                                    <button
                                        key={req.from_user_id}
                                        onClick={() => acceptRequest(req.from_user_id)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            marginBottom: 8,
                                            padding: "10px 14px",
                                            background: "var(--bg3)",
                                            borderRadius: 12,
                                            border: "1px solid var(--border)",
                                            cursor: "pointer",
                                            width: "100%",
                                            textAlign: "left",
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent2)"}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                                    >
                                        <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                                            🏠 {req.name} wants to connect!
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {step === "matches" && <button className="btn-ghost" onClick={() => setStep("form")}>Edit Profile</button>}
                    <button className="btn-ghost" onClick={deleteProfile} style={{ color: "#ef4444", borderColor: "#ef444433" }}>🗑 Delete My Profile</button>
                </div>
            </div>

            {step === "form" && (
                <div className={`pref-form ${mounted ? "animate-in" : ""}`}>
                    <div className="pref-form-inner">

                        {/* Gender Selection — shown first and prominently */}
                        <div className="pref-section">
                            <div className="pref-label">🚻 Your Gender</div>
                            <div className="option-row">
                                {[{ val: "Male", icon: "👦" }, { val: "Female", icon: "👩" }, { val: "Other", icon: "🧑" }].map(g => (
                                    <button key={g.val} className={`option-chip ${prefs.gender === g.val ? "active" : ""}`} onClick={() => setPrefs(p => ({ ...p, gender: g.val }))}>
                                        {g.icon} {g.val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-row" style={{ marginBottom: 20 }}>
                            <div><label style={{ fontSize: 12, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Your Year</label><select className="inp" value={prefs.year} onChange={e => setPrefs(p => ({ ...p, year: e.target.value }))}><option value="">Select Year</option>{["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => <option key={y}>{y}</option>)}</select></div>
                            <div><label style={{ fontSize: 12, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Your Major</label><input className="inp" placeholder="e.g. Computer Science" value={prefs.major} onChange={e => setPrefs(p => ({ ...p, major: e.target.value }))} /></div>
                        </div>
                        <div className="pref-section"><div className="pref-label">🌙 Sleep Schedule</div><div className="option-row">{["Early Bird", "Night Owl", "Flexible"].map(s => <button key={s} className={`option-chip ${prefs.sleep === s ? "active" : ""}`} onClick={() => setPrefs(p => ({ ...p, sleep: s }))}>{s === "Early Bird" ? "🌅" : s === "Night Owl" ? "🦉" : "😴"} {s}</button>)}</div></div>
                        <div className="pref-section"><div className="pref-label">🔊 Noise Preference</div><div className="option-row">{["Quiet", "Moderate", "Loud"].map(n => <button key={n} className={`option-chip ${prefs.noise === n ? "active" : ""}`} onClick={() => setPrefs(p => ({ ...p, noise: n }))}>{n === "Quiet" ? "🤫" : n === "Moderate" ? "💬" : "🎉"} {n}</button>)}</div></div>
                        <div className="pref-section"><div className="pref-label">✨ Cleanliness — <b style={{ color: "#818cf8" }}>{prefs.cleanliness}/5</b></div><div className="slider-track"><input type="range" min="1" max="5" value={prefs.cleanliness} onChange={e => setPrefs(p => ({ ...p, cleanliness: +e.target.value }))} className="slider" /><div className="slider-labels">{["Chill", "", "Average", "", "Spotless"].map((l, i) => <span key={i}>{l}</span>)}</div></div></div>
                        <div className="pref-section"><div className="pref-label">🎯 Your Interests</div><div className="hobbies-grid">{hobbies.map(h => <button key={h} className={`hobby-chip ${prefs.hobbies.includes(h) ? "active" : ""}`} onClick={() => th(h)}>{prefs.hobbies.includes(h) && <I.Check />} {h}</button>)}</div></div>
                        {msg && <div className={msg.startsWith("❌") ? "auth-error" : "auth-success"}>{msg}</div>}
                        <button className={`btn-glow full ${saving ? "loading" : ""}`} onClick={saveProfile} disabled={saving}>{saving ? <span className="spinner" /> : "Save & Find Matches ✨"}</button>
                    </div>
                </div>
            )}

            {step === "matches" && (
                <div className="matches-wrap">
                    {/* Status msg for connect actions */}
                    {msg && (
                        <div style={{ marginBottom: 12, padding: "10px 16px", borderRadius: 10, background: msg.startsWith("❌") ? "#ef444418" : "#22c55e18", border: `1px solid ${msg.startsWith("❌") ? "#ef444444" : "#22c55e44"}`, color: msg.startsWith("❌") ? "#ef4444" : "#22c55e", fontSize: 13, fontWeight: 600 }}>
                            {msg}
                        </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "8px 18px", borderRadius: 100,
                            background: userGender === "Female" ? "#ec489915" : userGender === "Male" ? "#3b82f615" : "var(--glow2)",
                            border: `1px solid ${userGender === "Female" ? "#ec489944" : userGender === "Male" ? "#3b82f644" : "var(--border)"}`,
                            color: userGender === "Female" ? "#f472b6" : userGender === "Male" ? "#60a5fa" : "var(--accent2)",
                            fontWeight: 600, fontSize: 13
                        }}>
                            {genderIcon(userGender)} {genderLabel(userGender)} Pool
                        </div>
                        <span style={{ fontSize: 13, color: "var(--muted2)" }}>
                            <b style={{ color: "var(--accent2)" }}>{matches.length}</b> match{matches.length !== 1 ? "es" : ""} found
                        </span>
                    </div>

                    {matches.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">{genderIcon(userGender)}</div>
                            <p>No other {userGender === "Male" ? "male" : userGender === "Female" ? "female" : ""} students yet — share the app! 🚀</p>
                        </div>
                    )}

                    <div className="roommates-list">
                        {matches.map((r, i) => {
                            const score = calcMatch(r); return (
                                <div key={r.id} className="roommate-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className="rm-avatar" style={{ background: genderGradient(r.gender) }}>
                                        {genderIcon(r.gender)}
                                    </div>
                                    <div className="rm-body">
                                        <div className="rm-top">
                                            <div>
                                                <h3 className="rm-name">{r.full_name || "Anonymous"}</h3>
                                                <p className="rm-sub">
                                                    {r.gender && <span style={{ marginRight: 6, fontSize: 11, padding: "2px 8px", borderRadius: 8, background: r.gender === "Female" ? "#ec489918" : r.gender === "Male" ? "#3b82f618" : "var(--glow2)", color: r.gender === "Female" ? "#f472b6" : r.gender === "Male" ? "#60a5fa" : "var(--accent2)", border: `1px solid ${r.gender === "Female" ? "#ec489933" : r.gender === "Male" ? "#3b82f633" : "var(--border)"}` }}>{genderIcon(r.gender)} {r.gender}</span>}
                                                    {r.year} · {r.major}
                                                </p>
                                            </div>
                                            <div className="match-badge" style={{ color: mc(score), borderColor: `${mc(score)}44`, background: `${mc(score)}11` }}><span className="match-pct">{score}%</span><span className="match-lbl">{ml(score)}</span></div>
                                        </div>
                                        <div className="rm-chips"><span className="rm-chip">🌙 {r.sleep}</span><span className="rm-chip">🔊 {r.noise}</span><span className="rm-chip">✨ {r.cleanliness}/5</span></div>
                                        <div className="rm-hobbies">{(r.hobbies || []).map(h => <span key={h} className="hobby-tag">{h}</span>)}</div>
                                        <div className="match-bar-wrap"><div className="match-bar"><div className="match-bar-fill" style={{ width: `${score}%`, background: mc(score) }} /></div></div>
                                    </div>
                                    <button className={`connect-btn ${connected.includes(r.id) ? "connected" : ""}`} onClick={() => sendConnect(r.id, r.full_name)}>{connected.includes(r.id) ? <><I.Check /> Sent</> : "Connect"}</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

// ADMIN
const ADMIN_EMAILS = ["nagapatla.dhatrri2024@vitstudent.ac.in"];

function AdminPage({ user }) {
    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(user?.email?.toLowerCase().trim());
    if (!isAdmin) return (
        <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
            <div className="empty-state">
                <div className="empty-icon">🔒</div>
                <h3 style={{ color: "var(--text)", marginBottom: 8 }}>Access Denied</h3>
                <p>This page is only accessible to <b>admin users</b>.</p>
            </div>
        </div>
    );

    const [tab, setTab] = useState("overview");
    const [tasks, setTasks] = useState(TASKS);
    const [showNew, setShowNew] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [sR, sV] = useInView();
    const [stats, setStats] = useState({ notes: 0, profiles: 0, tasks: 0, active: 0 });
    const [allNotes, setAllNotes] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const [deleting, setDeleting] = useState(null);
    const [announce, setAnnounce] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [savingAnnounce, setSavingAnnounce] = useState(false);
    const [newTaskForm, setNewTaskForm] = useState({ name: "", type: "Email", desc: "" });

    useEffect(() => {
        setTimeout(() => setMounted(true), 50);
        fetchLiveStats();
        fetchAllNotes();
        fetchAllProfiles();
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const { data } = await supabase.from("campus_announcements").select("*").order("created_at", { ascending: false });
        if (data) setAnnouncements(data);
    };

    const fetchLiveStats = async () => {
        const [{ count: notesCount }, { count: profilesCount }] = await Promise.all([
            supabase.from("notes").select("*", { count: "exact", head: true }),
            supabase.from("profiles").select("*", { count: "exact", head: true }),
        ]);
        setStats(s => ({ ...s, notes: notesCount || 0, profiles: profilesCount || 0, tasks: TASKS.length, active: TASKS.filter(t => t.status === "active").length }));
    };

    const fetchAllNotes = async () => {
        const { data } = await supabase.from("notes").select("*").order("created_at", { ascending: false });
        if (data) setAllNotes(data);
    };

    const fetchAllProfiles = async () => {
        const { data } = await supabase.from("profiles").select("*").order("full_name", { ascending: true });
        if (data) setAllProfiles(data);
    };

    const deleteNote = async (id) => {
        setDeleting(id);
        await supabase.from("notes").delete().eq("id", id);
        setAllNotes(n => n.filter(note => note.id !== id));
        setStats(s => ({ ...s, notes: Math.max(0, s.notes - 1) }));
        setDeleting(null);
    };

    const postAnnouncement = async () => {
        if (!announce.trim()) return;
        setSavingAnnounce(true);
        const { data, error } = await supabase.from("campus_announcements").insert({
            text: announce.trim(),
            author: "Admin"
        }).select();
        setSavingAnnounce(false);
        if (!error && data) {
            setAnnouncements(a => [data[0], ...a]);
            setAnnounce("");
        }
    };

    const deleteAnnouncement = async (id) => {
        setAnnouncements(a => a.filter(x => x.id !== id));
        await supabase.from("campus_announcements").delete().eq("id", id);
    };

    const toggle = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, status: t.status === "active" ? "paused" : "active" } : t));
    const sc = { active: { color: "#22c55e", bg: "#22c55e18", label: "Live" }, paused: { color: "#f59e0b", bg: "#f59e0b18", label: "Paused" }, draft: { color: "#6b7280", bg: "#6b728018", label: "Draft" } };

    const addTask = () => {
        if (!newTaskForm.name.trim()) return;
        const newTask = { id: Date.now(), title: newTaskForm.name, status: "draft", runs: 0, type: newTaskForm.type, lastRun: "—", desc: newTaskForm.desc || "Newly created automation.", progress: 0 };
        setTasks(t => [...t, newTask]);
        setStats(s => ({ ...s, tasks: s.tasks + 1 }));
        setNewTaskForm({ name: "", type: "Email", desc: "" });
        setShowNew(false);
    };

    const TABS = [
        { id: "overview", icon: "📊", label: "Overview" },
        { id: "notes", icon: "📒", label: `Notes (${allNotes.length})` },
        { id: "profiles", icon: "🏠", label: `Profiles (${allProfiles.length})` },
        { id: "automations", icon: "⚙️", label: "Automations" },
        { id: "announcements", icon: "📢", label: "Announcements" },
        { id: "mess", icon: "🍽️", label: "Mess Menu" },
    ];

    return (
        <div className="page">
            {/* Header */}
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div>
                    <div className="page-eyebrow">Smart Campus</div>
                    <h2 className="page-title">Admin <span className="title-accent">Dashboard</span></h2>
                    <p className="page-sub">Live control panel — manage notes, profiles & automations</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e44", borderRadius: 20, padding: "4px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
                        Live
                    </div>
                    <button className="btn-glow sm" onClick={fetchLiveStats}>↻ Refresh</button>
                </div>
            </div>

            {/* Live Stats Row */}
            <div className="admin-stats-grid" ref={sR} style={{ marginBottom: 28 }}>
                {[
                    { icon: "📒", num: stats.notes, label: "Notes Uploaded", color: "#6366f1" },
                    { icon: "🏠", num: stats.profiles, label: "Roommate Profiles", color: "#ec4899" },
                    { icon: "⚙️", num: tasks.length, label: "Automations", color: "#f59e0b" },
                    { icon: "✅", num: tasks.filter(t => t.status === "active").length, label: "Active Tasks", color: "#22c55e" },
                ].map((s, i) => (
                    <div key={s.label} className={`admin-stat ${sV ? "animate-in" : ""}`} style={{ animationDelay: `${i * 0.08}s`, borderTop: `3px solid ${s.color}` }}>
                        <div className="admin-stat-icon">{s.icon}</div>
                        <div className="admin-stat-num" style={{ color: s.color }}><Counter target={s.num} active={sV} /></div>
                        <div className="admin-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tab Nav */}
            <div style={{ display: "flex", gap: 6, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 0, overflowX: "auto" }}>
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "10px 18px", borderRadius: "8px 8px 0 0", border: "none", background: tab === t.id ? "var(--card)" : "transparent", color: tab === t.id ? "var(--accent)" : "var(--muted2)", fontWeight: tab === t.id ? 600 : 400, cursor: "pointer", fontSize: 13, whiteSpace: "nowrap", borderBottom: tab === t.id ? "2px solid var(--accent)" : "2px solid transparent", transition: "all .2s", display: "flex", alignItems: "center", gap: 6 }}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* ── OVERVIEW TAB ── */}
            {tab === "overview" && (
                <div className={mounted ? "animate-in" : ""}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                        {/* Recent Notes */}
                        <div className="upload-panel" style={{ margin: 0 }}>
                            <h3 style={{ marginBottom: 14, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>📒 Recent Notes <span style={{ fontSize: 11, color: "var(--muted2)", fontWeight: 400, marginLeft: "auto" }}>Live from DB</span></h3>
                            {allNotes.slice(0, 4).map(n => (
                                <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{n.title}</div>
                                        <div style={{ fontSize: 11, color: "var(--muted2)" }}>{n.subject} · {n.author_name}</div>
                                    </div>
                                    <span style={{ fontSize: 11, color: "var(--muted2)" }}>{new Date(n.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                                </div>
                            ))}
                            {allNotes.length === 0 && <div style={{ color: "var(--muted2)", fontSize: 13, textAlign: "center", padding: 20 }}>No notes yet</div>}
                            <button className="btn-ghost" style={{ marginTop: 12, width: "100%", fontSize: 12 }} onClick={() => setTab("notes")}>View All Notes →</button>
                        </div>
                        {/* Recent Profiles */}
                        <div className="upload-panel" style={{ margin: 0 }}>
                            <h3 style={{ marginBottom: 14, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>🏠 Roommate Profiles <span style={{ fontSize: 11, color: "var(--muted2)", fontWeight: 400, marginLeft: "auto" }}>Live from DB</span></h3>
                            {allProfiles.slice(0, 4).map(p => (
                                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{(p.full_name || "??").slice(0, 2).toUpperCase()}</div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{p.full_name || "Anonymous"}</div>
                                            <div style={{ fontSize: 11, color: "var(--muted2)" }}>{p.year} · {p.major}</div>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 11, color: "var(--muted2)", background: "var(--card-alt)", padding: "2px 8px", borderRadius: 8 }}>🌙 {p.sleep}</span>
                                </div>
                            ))}
                            {allProfiles.length === 0 && <div style={{ color: "var(--muted2)", fontSize: 13, textAlign: "center", padding: 20 }}>No profiles yet</div>}
                            <button className="btn-ghost" style={{ marginTop: 12, width: "100%", fontSize: 12 }} onClick={() => setTab("profiles")}>View All Profiles →</button>
                        </div>
                    </div>
                    {/* Announcements Preview */}
                    <div className="upload-panel" style={{ margin: "18px 0 0" }}>
                        <h3 style={{ marginBottom: 14, fontSize: 15 }}>📢 Latest Announcements</h3>
                        {announcements.slice(0, 2).map(a => (
                            <div key={a.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                                <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 4 }}>{a.text}</div>
                                <div style={{ fontSize: 11, color: "var(--muted2)" }}>Posted by {a.author} · {a.time}</div>
                            </div>
                        ))}
                        <button className="btn-ghost" style={{ marginTop: 12, width: "100%", fontSize: 12 }} onClick={() => setTab("announcements")}>Manage Announcements →</button>
                    </div>
                </div>
            )}

            {/* ── NOTES MODERATION TAB ── */}
            {tab === "notes" && (
                <div className={mounted ? "animate-in" : ""}>
                    <div style={{ marginBottom: 16, fontSize: 13, color: "var(--muted2)" }}>
                        {allNotes.length} notes in database. You can delete inappropriate content.
                    </div>
                    {allNotes.length === 0 && <div className="empty-state"><div className="empty-icon">📒</div><p>No notes uploaded yet.</p></div>}
                    <div className="tasks-list">
                        {allNotes.map((note, i) => (
                            <div key={note.id} className="task-card animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
                                <div className="task-left"><div className="task-icon-wrap" style={{ fontSize: 18 }}>📄</div></div>
                                <div className="task-body">
                                    <div className="task-header-row">
                                        <h3 className="task-name">{note.title}</h3>
                                        <div className="task-badges">
                                            <span className="task-type-badge">{note.subject}</span>
                                            <span className="task-type-badge" style={{ background: "#6366f118", color: "#818cf8", border: "1px solid #6366f133" }}>{note.tag}</span>
                                        </div>
                                    </div>
                                    <p className="task-desc">by {note.author_name} · {new Date(note.created_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} {note.pages > 0 ? `· ${note.pages} pages` : ""}</p>
                                    <div className="task-meta-row">
                                        {note.file_url ? <a href={note.file_url} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: 12, textDecoration: "none" }}>📎 Has attachment</a> : <span style={{ color: "var(--muted2)", fontSize: 12 }}>No file attached</span>}
                                    </div>
                                </div>
                                <div className="task-actions">
                                    {note.file_url && <a href={note.file_url} target="_blank" rel="noreferrer" className="btn-ghost sm" style={{ textDecoration: "none", marginRight: 6 }}>View</a>}
                                    <button className="toggle-task-btn paused" style={{ background: "#ef444418", color: "#ef4444", border: "1px solid #ef444433" }} onClick={() => deleteNote(note.id)} disabled={deleting === note.id}>
                                        {deleting === note.id ? <span className="spinner" /> : "🗑 Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── PROFILES TAB ── */}
            {tab === "profiles" && (
                <div className={mounted ? "animate-in" : ""}>
                    <div style={{ marginBottom: 16, fontSize: 13, color: "var(--muted2)" }}>{allProfiles.length} student profiles registered for roommate matching.</div>
                    {allProfiles.length === 0 && <div className="empty-state"><div className="empty-icon">🏠</div><p>No profiles yet.</p></div>}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
                        {allProfiles.map((p, i) => (
                            <div key={p.id} className="task-card animate-in" style={{ animationDelay: `${i * 0.05}s`, flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{(p.full_name || "??").slice(0, 2).toUpperCase()}</div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{p.full_name || "Anonymous"}</div>
                                        <div style={{ fontSize: 12, color: "var(--muted2)" }}>{p.year} · {p.major}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    <span className="rm-chip">🌙 {p.sleep}</span>
                                    <span className="rm-chip">🔊 {p.noise}</span>
                                    <span className="rm-chip">✨ {p.cleanliness}/5</span>
                                </div>
                                {(p.hobbies || []).length > 0 && (
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                        {(p.hobbies || []).map(h => <span key={h} className="hobby-tag">{h}</span>)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── AUTOMATIONS TAB ── */}
            {tab === "automations" && (
                <div className={mounted ? "animate-in" : ""}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <div style={{ fontSize: 13, color: "var(--muted2)" }}>{tasks.filter(t => t.status === "active").length} active · {tasks.filter(t => t.status === "paused").length} paused · {tasks.filter(t => t.status === "draft").length} drafts</div>
                        <button className="btn-glow sm" onClick={() => setShowNew(!showNew)}>+ New Task</button>
                    </div>
                    {showNew && (
                        <div className="upload-panel animate-slide-down">
                            <h3>⚙️ Create Automation</h3>
                            <div className="form-row">
                                <input className="inp" placeholder="Task Name" value={newTaskForm.name} onChange={e => setNewTaskForm(f => ({ ...f, name: e.target.value }))} />
                                <select className="inp" value={newTaskForm.type} onChange={e => setNewTaskForm(f => ({ ...f, type: e.target.value }))}>
                                    <option>Email</option><option>SMS</option><option>Report</option><option>Notification</option><option>Form</option>
                                </select>
                            </div>
                            <textarea className="inp" placeholder="Describe what this automation should do..." rows="3" value={newTaskForm.desc} onChange={e => setNewTaskForm(f => ({ ...f, desc: e.target.value }))} />
                            <div className="upload-actions">
                                <button className="btn-glow sm" onClick={addTask}>Create Task</button>
                                <button className="btn-ghost" onClick={() => setShowNew(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                    <div className="tasks-list">
                        {tasks.map((task, i) => {
                            const cfg = sc[task.status]; return (
                                <div key={task.id} className="task-card animate-in" style={{ animationDelay: `${i * 0.07}s` }}>
                                    <div className="task-left"><div className="task-icon-wrap"><I.Bot /></div></div>
                                    <div className="task-body">
                                        <div className="task-header-row"><h3 className="task-name">{task.title}</h3><div className="task-badges"><span className="task-type-badge">{task.type}</span><span className="status-pill" style={{ color: cfg.color, background: cfg.bg }}><span className="status-dot-sm" style={{ background: cfg.color }} />{cfg.label}</span></div></div>
                                        <p className="task-desc">{task.desc}</p>
                                        <div className="task-progress-wrap"><div className="task-progress-bar"><div className="task-progress-fill" style={{ width: `${task.progress}%`, background: cfg.color }} /></div><span className="task-progress-label">{task.progress}%</span></div>
                                        <div className="task-meta-row"><span>🔁 {task.runs.toLocaleString()} runs</span><span>🕐 Last: {task.lastRun}</span></div>
                                    </div>
                                    <div className="task-actions">{task.status !== "draft" ? <button className={`toggle-task-btn ${task.status}`} onClick={() => toggle(task.id)}>{task.status === "active" ? <><I.Pause /> Pause</> : <><I.Play /> Resume</>}</button> : <button className="btn-ghost sm" onClick={() => toggle(task.id)}>▶ Publish</button>}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── ANNOUNCEMENTS TAB ── */}
            {tab === "announcements" && (
                <div className={mounted ? "animate-in" : ""}>
                    <div className="upload-panel" style={{ margin: "0 0 20px" }}>
                        <h3 style={{ marginBottom: 14, fontSize: 15 }}>📢 Post New Announcement</h3>
                        <textarea className="inp" placeholder="Write a campus-wide announcement for students..." rows="3" value={announce} onChange={e => setAnnounce(e.target.value)} />
                        <div className="upload-actions" style={{ marginTop: 12 }}>
                            <button className="btn-glow sm" onClick={postAnnouncement} disabled={!announce.trim()}>📣 Post Announcement</button>
                        </div>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 12 }}>{announcements.length} announcements posted</div>
                    <div className="tasks-list">
                        {announcements.map((a, i) => (
                            <div key={a.id} className="task-card animate-in" style={{ animationDelay: `${i * 0.07}s`, alignItems: "flex-start", gap: 14 }}>
                                <div style={{ fontSize: 28, lineHeight: 1 }}>📢</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, color: "var(--text)", marginBottom: 8, lineHeight: 1.5 }}>{a.text}</div>
                                    <div style={{ fontSize: 12, color: "var(--muted2)" }}>Posted by <b>{a.author}</b> · {new Date(a.created_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
                                </div>
                                <button onClick={() => deleteAnnouncement(a.id)} style={{ background: "none", border: "none", color: "var(--muted2)", cursor: "pointer", fontSize: 18, padding: 4 }}>✕</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── MESS MENU TAB ── */}
            {tab === "mess" && (
                <div className={mounted ? "animate-in" : ""}>
                    <div className="upload-panel">
                        <MessMenuAdmin />
                    </div>
                </div>
            )}
        </div>
    );
}

// CAMPUS BOT
const BOT_KB = [
    { keys: ["note", "notes", "upload", "pdf", "find note", "study"], answer: "📒 Go to **Notes Hub** in the navbar! You can search notes by title or subject, filter by tag (Exam Prep, Summary, etc.), and download PDFs. To share your own notes, click **Upload Note**." },
    { keys: ["roommate", "match", "room", "hostel", "partner"], answer: "🏠 Head to **Roommate Match**! Fill in your sleep schedule, noise preference, cleanliness level & hobbies. Our algorithm will match you with compatible students. Click **Connect** to reach out!" },
    { keys: ["admin", "automation", "automate", "task", "fee reminder", "attendance"], answer: "⚙️ The **Admin Dashboard** (visible only to admins) lets you manage automations like Fee Payment Reminders, Attendance Reports, and Library Alerts. It also shows live stats and announcements." },
    { keys: ["login", "sign in", "register", "account", "signup", "password"], answer: "🔑 You can **Sign In** or **Create Account** from the login page. Forgot your password? Use the 'Forgot password?' link to get a reset email sent to you instantly." },
    { keys: ["fee", "payment", "due", "challan"], answer: "💳 Fee payment reminders are automated! The **Fee Payment Reminder** automation sends you an email 7 days before your due date. Check with your college admin for actual payment portal access." },
    { keys: ["library", "book", "return", "due date"], answer: "📚 The **Library Due Date Alert** automation notifies you 2 days before your book return date via SMS. Make sure your contact number is updated with the library." },
    { keys: ["exam", "schedule", "timetable", "test"], answer: "📅 Exam schedules are published via the **Exam Schedule Publisher** automation — it pushes timetables directly to your student dashboard. Check the Admin section for updates." },
    { keys: ["complaint", "hostel complaint", "warden", "issue"], answer: "🏨 Use the **Hostel Complaint Tracker** to route your complaint to the respective warden. It's available in the Admin Automation section." },
    { keys: ["announcement", "notice", "news"], answer: "📢 Campus-wide announcements are posted by admins in the **Announcements** tab of the Admin Dashboard. Check there for the latest notices!" },
    { keys: ["hi", "hello", "hey", "hii", "helo"], answer: "👋 Hey there! I'm **CampusBot**, your AI campus assistant. Ask me anything about notes, roommates, fee reminders, exams, or how to use this app!" },
    { keys: ["who are you", "what are you", "bot", "ai", "chatbot"], answer: "🤖 I'm **CampusBot** — the AI assistant for CampusCatalyst! I can help you find notes, navigate the app, answer campus queries, and guide you through all features." },
    { keys: ["help", "what can you do", "features", "how"], answer: "🚀 Here's what I can help with:\n• 📒 Finding & uploading notes\n• 🏠 Roommate matching\n• ⚙️ Admin automations\n• 📅 Exam & fee info\n• 🔑 Account & login help\n\nJust ask me anything!" },
    { keys: ["thank", "thanks", "great", "nice", "awesome", "perfect"], answer: "😊 You're welcome! Is there anything else I can help you with?" },
];

function getReply(msg) {
    const lower = msg.toLowerCase();
    for (const entry of BOT_KB) {
        if (entry.keys.some(k => lower.includes(k))) return entry.answer;
    }
    return "🤔 I'm not sure about that one! Try asking about **notes**, **roommates**, **fees**, **exams**, or **admin features**. You can also contact your campus admin for specific queries.";
}

const QUICK_REPLIES = ["How do I find notes?", "How does roommate matching work?", "Tell me about automations", "Help with login"];

function CampusBot({ user }) {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([
        { id: 1, from: "bot", text: `👋 Hi ${user?.user_metadata?.full_name?.split(" ")[0] || "there"}! I'm **CampusBot**. Ask me anything about CampusCatalyst!` }
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [pulse, setPulse] = useState(true);
    const [unread, setUnread] = useState(1);
    const bottomRef = useRef(null);

    useEffect(() => { if (open) { setUnread(0); setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50); } }, [msgs, open]);
    useEffect(() => { const t = setTimeout(() => setPulse(false), 3000); return () => clearTimeout(t); }, []);

    const send = async (text) => {
        const userMsg = text || input.trim();
        if (!userMsg) return;
        setInput("");
        setMsgs(m => [...m, { id: Date.now(), from: "user", text: userMsg }]);
        setTyping(true);
        await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
        const reply = getReply(userMsg);
        setTyping(false);
        setMsgs(m => [...m, { id: Date.now() + 1, from: "bot", text: reply }]);
        if (!open) setUnread(u => u + 1);
    };

    const renderText = (text) => text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
    );

    return (
        <>
            {/* Floating Bubble */}
            <button className={`chatbot-bubble ${pulse ? "pulse" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Open CampusBot">
                {open ? <span style={{ fontSize: 22 }}>✕</span> : <><I.Bot />{unread > 0 && <span className="chat-unread">{unread}</span>}</>}
            </button>

            {/* Chat Panel */}
            {open && (
                <div className="chatbot-panel animate-slide-up">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div className="chatbot-avatar"><I.Bot /></div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>CampusBot</div>
                                <div style={{ fontSize: 11, color: "#a0f0a0", display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> Online
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 18, padding: 4 }}>✕</button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {msgs.map(m => (
                            <div key={m.id} className={`chat-msg ${m.from === "user" ? "chat-user" : "chat-bot"}`}>
                                {m.from === "bot" && <div className="chat-bot-avatar"><I.Bot /></div>}
                                <div className={`chat-bubble ${m.from === "user" ? "bubble-user" : "bubble-bot"}`}>
                                    {m.text.split("\n").map((line, i) => <span key={i}>{renderText(line)}{i < m.text.split("\n").length - 1 && <br />}</span>)}
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="chat-msg chat-bot">
                                <div className="chat-bot-avatar"><I.Bot /></div>
                                <div className="chat-bubble bubble-bot chat-typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick Replies */}
                    {msgs.length <= 2 && (
                        <div className="chat-quick-replies">
                            {QUICK_REPLIES.map(q => (
                                <button key={q} className="quick-reply-btn" onClick={() => send(q)}>{q}</button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="chatbot-input-row">
                        <input
                            className="chatbot-input"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && send()}
                        />
                        <button className="chatbot-send" onClick={() => send()} disabled={!input.trim()}>
                            <I.Arrow />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

// MESS MENU — student view
function MessMenuPage() {
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
    const [menus, setMenus] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [selectedDay, setSelectedDay] = useState(todayName);

    useEffect(() => { setTimeout(() => setMounted(true), 50); fetchMenu(); }, [selectedDay]);

    const fetchMenu = async () => {
        const { data } = await supabase.from("mess_menu").select("*").eq("day", selectedDay).order("meal_order", { ascending: true });
        if (data) setMenus(data);
    };

    const mealMeta = {
        Breakfast: { icon: "🌅", time: "7:00 – 9:00 AM", color: "#f59e0b" },
        Lunch: { icon: "☀️", time: "12:00 – 2:00 PM", color: "#6366f1" },
        Snacks: { icon: "🍪", time: "4:30 – 5:30 PM", color: "#10b981" },
        Dinner: { icon: "🌙", time: "7:00 – 9:00 PM", color: "#ec4899" },
    };

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div>
                    <div className="page-eyebrow">Hostel Life</div>
                    <h2 className="page-title">Mess <span className="title-accent">Menu</span></h2>
                    <p className="page-sub">Weekly menu — posted by your hostel admin</p>
                </div>
                {selectedDay === todayName && (
                    <span style={{ background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e44", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>📅 Today</span>
                )}
            </div>

            {/* Day Tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
                {DAYS.map(d => (
                    <button key={d} onClick={() => setSelectedDay(d)} style={{
                        padding: "8px 16px", borderRadius: 100, border: "1px solid",
                        borderColor: selectedDay === d ? "var(--accent)" : "var(--border)",
                        background: selectedDay === d ? "var(--glow2)" : "transparent",
                        color: selectedDay === d ? "var(--accent3)" : "var(--muted2)",
                        fontWeight: selectedDay === d ? 600 : 400,
                        fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s",
                        boxShadow: d === todayName ? "0 0 0 2px #22c55e44" : "none"
                    }}>
                        {d === todayName ? `📅 ${d}` : d.slice(0, 3)}
                    </button>
                ))}
            </div>

            {menus.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🍽️</div>
                    <p>No menu posted for {selectedDay} yet.<br /><span style={{ fontSize: 13, color: "var(--muted)" }}>Check back later!</span></p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                    {menus.map((m, i) => {
                        const meta = mealMeta[m.meal_type] || { icon: "🍽️", time: "", color: "#6366f1" };
                        return (
                            <div key={m.id} className={`mess-card ${mounted ? "animate-in" : ""}`}
                                style={{ animationDelay: `${i * 0.1}s`, borderColor: `${meta.color}33` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                    <div style={{ fontSize: 28 }}>{meta.icon}</div>
                                    <div>
                                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>{m.meal_type}</div>
                                        <div style={{ fontSize: 11, color: meta.color }}>{meta.time}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {(m.items || "").split(",").map((item, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text)" }}>
                                            <span style={{ color: meta.color, fontSize: 10 }}>◆</span>
                                            {item.trim()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// MESS MENU ADMIN — used inside AdminPage
function MessMenuAdmin() {
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [day, setDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
    const [meal, setMeal] = useState("Breakfast");
    const [items, setItems] = useState("");
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const [existing, setExisting] = useState([]);
    const mealOrder = { Breakfast: 1, Lunch: 2, Snacks: 3, Dinner: 4 };
    const mealIcons = { Breakfast: "🌅", Lunch: "☀️", Snacks: "🍪", Dinner: "🌙" };

    useEffect(() => { fetchExisting(); }, [day]);

    const fetchExisting = async () => {
        const { data } = await supabase.from("mess_menu").select("*").eq("day", day).order("meal_order", { ascending: true });
        if (data) setExisting(data);
    };

    const postMenu = async () => {
        if (!items.trim()) return setMsg("Please enter at least one item.");
        setSaving(true); setMsg("");
        await supabase.from("mess_menu").upsert({ day, meal_type: meal, items: items.trim(), meal_order: mealOrder[meal] }, { onConflict: "day,meal_type" });
        setMsg("✅ Menu posted!"); setItems(""); fetchExisting(); setSaving(false);
    };

    const deleteMenu = async (id) => {
        await supabase.from("mess_menu").delete().eq("id", id);
        fetchExisting();
    };

    return (
        <div>
            <h3 style={{ marginBottom: 16, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>🍽️ Post Mess Menu <span style={{ fontSize: 11, color: "var(--muted2)", fontWeight: 400, marginLeft: "auto" }}>Students see this live</span></h3>

            {/* Day selector */}
            <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "var(--muted2)", display: "block", marginBottom: 8 }}>Day of Week</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {DAYS.map(d => (
                        <button key={d} onClick={() => setDay(d)} style={{
                            padding: "6px 14px", borderRadius: 100, border: "1px solid",
                            borderColor: day === d ? "var(--accent)" : "var(--border)",
                            background: day === d ? "var(--glow2)" : "transparent",
                            color: day === d ? "var(--accent3)" : "var(--muted2)",
                            fontWeight: day === d ? 600 : 400,
                            fontSize: 12, cursor: "pointer", transition: "all .2s"
                        }}>{d.slice(0, 3)}</button>
                    ))}
                </div>
            </div>

            <div className="form-row" style={{ marginBottom: 12 }}>
                <div>
                    <label style={{ fontSize: 12, color: "var(--muted2)", display: "block", marginBottom: 6 }}>Meal</label>
                    <select className="inp" value={meal} onChange={e => setMeal(e.target.value)}>
                        {["Breakfast", "Lunch", "Snacks", "Dinner"].map(m => <option key={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label style={{ fontSize: 12, color: "var(--muted2)", display: "block", marginBottom: 6 }}>Items <span style={{ opacity: 0.6 }}>(comma separated)</span></label>
                    <input className="inp" placeholder="e.g. Idli, Sambar, Chutney, Coffee" value={items} onChange={e => setItems(e.target.value)} />
                </div>
            </div>
            {msg && <div className={msg.startsWith("✅") ? "auth-success" : "auth-error"} style={{ marginBottom: 12 }}>{msg}</div>}
            <button className={`btn-glow sm ${saving ? "loading" : ""}`} onClick={postMenu} disabled={saving}>{saving ? <span className="spinner" /> : "📤 Post Menu"}</button>

            {existing.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Posted for {day}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {existing.map(e => (
                            <div key={e.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "var(--bg3)", borderRadius: 10, padding: "10px 14px", border: "1px solid var(--border)" }}>
                                <span style={{ fontSize: 18 }}>{mealIcons[e.meal_type]}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{e.meal_type}</div>
                                    <div style={{ fontSize: 12, color: "var(--muted2)", marginTop: 2 }}>{e.items}</div>
                                </div>
                                <button onClick={() => deleteMenu(e.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 14, opacity: 0.7 }}>✕</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// LOST & FOUND
function LostFoundPage({ user }) {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", type: "Lost", category: "Electronics", location: "", contact: "" });
    const [saving, setSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setTimeout(() => setMounted(true), 50); fetchItems(); }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from("lost_found").select("*").order("created_at", { ascending: false });
        if (data) setItems(data);
    };

    const postItem = async () => {
        if (!form.title || !form.location) return;
        setSaving(true);
        await supabase.from("lost_found").insert({
            ...form, user_id: user.id,
            author_name: user.user_metadata?.full_name || user.email.split("@")[0],
            resolved: false
        });
        setForm({ title: "", description: "", type: "Lost", category: "Electronics", location: "", contact: "" });
        setShowForm(false); setSaving(false); fetchItems();
    };

    const toggleResolved = async (id, resolved) => {
        setItems(i => i.map(x => x.id === id ? { ...x, resolved: !resolved } : x));
        await supabase.from("lost_found").update({ resolved: !resolved }).eq("id", id);
    };

    const deleteItem = async (id) => {
        setItems(i => i.filter(x => x.id !== id));
        await supabase.from("lost_found").delete().eq("id", id);
    };

    const typeColor = { Lost: "#ef4444", Found: "#22c55e" };
    const categories = ["Electronics", "ID Card", "Books", "Clothing", "Keys", "Wallet", "Bag", "Other"];
    const filtered = filter === "All" ? items : filter === "Resolved" ? items.filter(i => i.resolved) : items.filter(i => i.type === filter && !i.resolved);

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div>
                    <div className="page-eyebrow">Campus Community</div>
                    <h2 className="page-title">Lost <span className="title-accent">&amp; Found</span></h2>
                    <p className="page-sub">Post lost items or report what you've found on campus</p>
                </div>
                <button className="btn-glow sm" onClick={() => setShowForm(!showForm)}>+ Post Item</button>
            </div>

            {showForm && (
                <div className="upload-panel animate-slide-down" style={{ marginBottom: 24 }}>
                    <h3>📍 Post Lost / Found Item</h3>
                    <div className="form-row">
                        <div>
                            <label style={{ fontSize: 12, color: "var(--muted2)", display: "block", marginBottom: 6 }}>Type</label>
                            <div style={{ display: "flex", gap: 8 }}>
                                {["Lost", "Found"].map(t => (
                                    <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} style={{ padding: "8px 20px", borderRadius: 10, border: `1.5px solid ${form.type === t ? typeColor[t] : "var(--border)"}`, background: form.type === t ? `${typeColor[t]}18` : "transparent", color: form.type === t ? typeColor[t] : "var(--muted2)", fontWeight: form.type === t ? 700 : 400, cursor: "pointer", fontSize: 13 }}>{t}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "var(--muted2)", display: "block", marginBottom: 6 }}>Category</label>
                            <select className="inp" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                {categories.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <input className="inp" placeholder="Item name (e.g. Blue iPhone 14)" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ margin: "10px 0" }} />
                    <input className="inp" placeholder="Where was it lost/found? (e.g. Library 2nd floor)" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={{ marginBottom: 10 }} />
                    <input className="inp" placeholder="Contact info (phone / email / insta)" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} style={{ marginBottom: 10 }} />
                    <textarea className="inp" placeholder="Description (optional)" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ marginBottom: 10, resize: "vertical" }} />
                    <div className="upload-actions">
                        <button className={`btn-glow sm ${saving ? "loading" : ""}`} onClick={postItem} disabled={saving || !form.title || !form.location}>{saving ? <span className="spinner" /> : "Post"}</button>
                        <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                {["All", "Lost", "Found", "Resolved"].map(f => (
                    <button key={f} className={`tag-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f === "Lost" ? "🔴" : f === "Found" ? "🟢" : f === "Resolved" ? "✅" : "📋"} {f}</button>
                ))}
            </div>

            {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">🔍</div><p>No {filter === "All" ? "" : filter.toLowerCase()} items yet.</p></div>}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map((item, i) => (
                    <div key={item.id} className={`lf-card ${mounted ? "animate-in" : ""} ${item.resolved ? "lf-resolved" : ""}`} style={{ animationDelay: `${i * 0.06}s` }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <div style={{ background: `${typeColor[item.type]}18`, border: `1px solid ${typeColor[item.type]}44`, borderRadius: 10, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: typeColor[item.type], whiteSpace: "nowrap", flexShrink: 0 }}>{item.type}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 600, fontSize: 15, textDecoration: item.resolved ? "line-through" : "none", color: item.resolved ? "var(--muted)" : "var(--text)" }}>{item.title}</span>
                                    <span style={{ fontSize: 10, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 7px", color: "var(--muted2)" }}>{item.category}</span>
                                </div>
                                {item.description && <p style={{ fontSize: 13, color: "var(--muted2)", margin: "0 0 6px" }}>{item.description}</p>}
                                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--muted2)", flexWrap: "wrap" }}>
                                    <span>📍 {item.location}</span>
                                    {item.contact && <span>📞 {item.contact}</span>}
                                    <span>by {item.author_name}</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                {item.user_id === user.id && (
                                    <>
                                        <button onClick={() => toggleResolved(item.id, item.resolved)} style={{ background: item.resolved ? "#22c55e18" : "var(--bg3)", border: "1px solid", borderColor: item.resolved ? "#22c55e44" : "var(--border)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: item.resolved ? "#22c55e" : "var(--muted2)", cursor: "pointer" }}>{item.resolved ? "✅ Done" : "Mark Found"}</button>
                                        <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", opacity: 0.7, padding: 4 }}>✕</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// CAMPUS EVENTS
function EventsPage({ user }) {
    const ADMIN_EMAILS = ["nagapatla.dhatrri2024@vitstudent.ac.in"];
    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(user?.email?.toLowerCase().trim());
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", category: "Cultural", date: "", time: "", venue: "" });
    const [saving, setSaving] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [rsvped, setRsvped] = useState(new Set());

    useEffect(() => { setTimeout(() => setMounted(true), 50); fetchEvents(); }, []);

    const fetchEvents = async () => {
        const { data } = await supabase.from("campus_events").select("*").order("event_date", { ascending: true });
        if (data) setEvents(data);
    };

    const postEvent = async () => {
        if (!form.title || !form.date || !form.venue) return;
        setSaving(true);
        await supabase.from("campus_events").insert({
            title: form.title, description: form.description, category: form.category,
            event_date: form.date, event_time: form.time, venue: form.venue,
            user_id: user.id, author_name: user.user_metadata?.full_name || user.email.split("@")[0],
            rsvp_count: 0
        });
        setForm({ title: "", description: "", category: "Cultural", date: "", time: "", venue: "" });
        setShowForm(false); setSaving(false); fetchEvents();
    };

    const toggleRsvp = async (id, count) => {
        const already = rsvped.has(id);
        setRsvped(s => { const n = new Set(s); already ? n.delete(id) : n.add(id); return n; });
        setEvents(e => e.map(x => x.id === id ? { ...x, rsvp_count: (x.rsvp_count || 0) + (already ? -1 : 1) } : x));
        await supabase.from("campus_events").update({ rsvp_count: count + (already ? -1 : 1) }).eq("id", id);
    };

    const deleteEvent = async (id) => {
        setEvents(e => e.filter(x => x.id !== id));
        await supabase.from("campus_events").delete().eq("id", id);
    };

    const catColor = { Cultural: "#a855f7", Academic: "#6366f1", Sports: "#22c55e", Social: "#f59e0b", Technical: "#ec4899", Other: "#64748b" };
    const catEmoji = { Cultural: "🎭", Academic: "📚", Sports: "🏆", Social: "🎉", Technical: "💻", Other: "📌" };
    const cats = ["Cultural", "Academic", "Sports", "Social", "Technical", "Other"];
    const today = new Date().toISOString().split("T")[0];
    const filtered = filter === "All" ? events : events.filter(e => e.category === filter);
    const isPast = (d) => d < today;

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div>
                    <div className="page-eyebrow">Campus Life</div>
                    <h2 className="page-title">Campus <span className="title-accent">Events</span></h2>
                    <p className="page-sub">Discover events, workshops, and fests happening around you</p>
                </div>
                {isAdmin && <button className="btn-glow sm" onClick={() => setShowForm(!showForm)}>+ Post Event</button>}
            </div>

            {isAdmin && showForm && (
                <div className="upload-panel animate-slide-down" style={{ marginBottom: 24 }}>
                    <h3>📅 New Campus Event</h3>
                    <div className="form-row">
                        <input className="inp" placeholder="Event Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                        <select className="inp" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                            {cats.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="form-row" style={{ marginTop: 10 }}>
                        <div>
                            <label style={{ fontSize: 12, color: "var(--muted2)", display: "block", marginBottom: 6 }}>Date</label>
                            <input type="date" className="inp" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ colorScheme: "dark" }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "var(--muted2)", display: "block", marginBottom: 6 }}>Time (optional)</label>
                            <input type="time" className="inp" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} style={{ colorScheme: "dark" }} />
                        </div>
                    </div>
                    <input className="inp" placeholder="Venue (e.g. SAC Auditorium)" value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} style={{ margin: "10px 0" }} />
                    <textarea className="inp" placeholder="Description (optional)" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ marginBottom: 10, resize: "vertical" }} />
                    <div className="upload-actions">
                        <button className={`btn-glow sm ${saving ? "loading" : ""}`} onClick={postEvent} disabled={saving || !form.title || !form.date || !form.venue}>{saving ? <span className="spinner" /> : "Post Event"}</button>
                        <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto" }}>
                {["All", ...cats].map(f => (
                    <button key={f} className={`tag-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f === "All" ? "📋" : catEmoji[f]} {f}</button>
                ))}
            </div>

            {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">🎉</div><p>No events posted yet — be the first!</p></div>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                {filtered.map((ev, i) => {
                    const past = isPast(ev.event_date);
                    const color = catColor[ev.category] || "#6366f1";
                    return (
                        <div key={ev.id} className={`event-card ${mounted ? "animate-in" : ""} ${past ? "event-past" : ""}`} style={{ animationDelay: `${i * 0.07}s`, borderColor: `${color}33` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${color}18`, color, border: `1px solid ${color}33` }}>{catEmoji[ev.category]} {ev.category}</span>
                                {ev.user_id === user.id && <button onClick={() => deleteEvent(ev.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", opacity: 0.6, fontSize: 14 }}>✕</button>}
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: past ? "var(--muted)" : "var(--text)" }}>{ev.title}</h3>
                            {ev.description && <p style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 10, lineHeight: 1.5 }}>{ev.description}</p>}
                            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                                <span style={{ fontSize: 12, color: past ? "#ef4444" : color, fontWeight: 600 }}>📅 {new Date(ev.event_date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}{ev.event_time ? ` · ${ev.event_time}` : ""}{past ? " · Ended" : ""}</span>
                                <span style={{ fontSize: 12, color: "var(--muted2)" }}>📍 {ev.venue}</span>
                                <span style={{ fontSize: 12, color: "var(--muted2)" }}>by {ev.author_name}</span>
                            </div>
                            {!past && (
                                <button onClick={() => toggleRsvp(ev.id, ev.rsvp_count || 0)} style={{ width: "100%", padding: "9px", borderRadius: 10, border: `1.5px solid ${rsvped.has(ev.id) ? color : "var(--border)"}`, background: rsvped.has(ev.id) ? `${color}18` : "transparent", color: rsvped.has(ev.id) ? color : "var(--muted2)", fontWeight: rsvped.has(ev.id) ? 700 : 400, cursor: "pointer", fontSize: 13, transition: "all .2s" }}>
                                    {rsvped.has(ev.id) ? "✅" : "🙋"} {rsvped.has(ev.id) ? "Going" : "RSVP"} · {(ev.rsvp_count || 0)} going
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// PROFILE PAGE
const AVATAR_OPTIONS = ["🎓", "🦁", "🐼", "🦊", "🐻", "🐯", "🦋", "🌟", "🔥", "💎", "🚀", "🎯", "🎸", "🍀", "🌙", "⚡", "🏆", "🎨", "🌊", "🦅"];
const DEPARTMENTS = ["Computer Science", "Information Technology", "Electronics & Communication", "Mechanical", "Civil", "Electrical", "Biotechnology", "Business Administration", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate"];

function ProfilePage({ user }) {
    const LS_KEY = `cc_profile_${user.id}`;
    const loadLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; } };

    const initProfile = () => {
        const local = loadLocal();
        return {
            display_name: local.display_name || user.user_metadata?.full_name || user.email.split("@")[0],
            bio: local.bio || "",
            avatar: local.avatar || "🎓",
            department: local.department || "",
            year: local.year || "",
        };
    };

    const [profile, setProfile] = useState(initProfile);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const [stats, setStats] = useState({ notes: 0, likes: 0 });
    const [mounted, setMounted] = useState(false);
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 50);
        fetchProfile();
        fetchStats();
    }, []);

    const fetchProfile = async () => {
        const local = loadLocal();
        const { data } = await supabase.from("profiles").select("id,full_name,year,major").eq("id", user.id).single();
        if (data) {
            setProfile(p => ({
                ...p,
                display_name: local.display_name || data.full_name || user.user_metadata?.full_name || user.email.split("@")[0],
                department: local.department || data.major || "",
                year: local.year || data.year || "",
            }));
        }
    };

    const fetchStats = async () => {
        const [{ count: notesCount }, { count: likesCount }] = await Promise.all([
            supabase.from("notes").select("*", { count: "exact", head: true }).eq("author_id", user.id),
            supabase.from("note_likes").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        ]);
        setStats({ notes: notesCount || 0, likes: likesCount || 0 });
    };

    const saveProfile = async () => {
        if (!profile.display_name.trim()) return setMsg("Display name can't be empty.");
        setSaving(true); setMsg("");
        localStorage.setItem(LS_KEY, JSON.stringify({
            display_name: profile.display_name,
            bio: profile.bio,
            avatar: profile.avatar,
            department: profile.department,
            year: profile.year,
        }));
        const { error } = await supabase.from("profiles").upsert({
            id: user.id,
            full_name: profile.display_name,
            year: profile.year,
            major: profile.department,
        });
        setSaving(false);
        if (error) { setMsg("❌ " + error.message); }
        else { setMsg("✅ Profile saved!"); setEditing(false); setTimeout(() => setMsg(""), 3000); }
    };

    const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";

    return (
        <div className="page profile-page">
            <div className={`profile-hero ${mounted ? "animate-in" : ""}`}>
                <div className="profile-hero-bg" />
                <div className="profile-avatar-wrap">
                    <div className="profile-avatar-emoji">{profile.avatar}</div>
                    {editing && (
                        <button className="profile-avatar-edit-btn" onClick={() => setShowAvatarPicker(s => !s)}>
                            <I.Camera /> Change
                        </button>
                    )}
                </div>
                <div className="profile-hero-info">
                    <div className="profile-hero-name">{profile.display_name}</div>
                    <div className="profile-hero-email">{user.email}</div>
                    <div className="profile-hero-badges">
                        <span className="profile-badge">🎓 Student</span>
                        {profile.year && <span className="profile-badge">{profile.year}</span>}
                        {profile.department && <span className="profile-badge">{profile.department}</span>}
                    </div>
                </div>
                <button className="profile-edit-btn" onClick={() => { setEditing(e => !e); setShowAvatarPicker(false); }}>
                    {editing ? "✕ Cancel" : <><I.Edit2 /> Edit Profile</>}
                </button>
            </div>

            {showAvatarPicker && editing && (
                <div className="avatar-picker-inline animate-slide-down">
                    <div className="avatar-picker-title">🎨 Pick your avatar</div>
                    <div className="avatar-grid">
                        {AVATAR_OPTIONS.map(e => (
                            <button key={e} className={`avatar-opt ${profile.avatar === e ? "selected" : ""}`}
                                onClick={() => { setProfile(p => ({ ...p, avatar: e })); setShowAvatarPicker(false); }}>
                                {e}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className={`profile-stats-row ${mounted ? "animate-in" : ""}`} style={{ animationDelay: "0.1s" }}>
                {[
                    { icon: "📒", val: stats.notes, label: "Notes Uploaded" },
                    { icon: "❤️", val: stats.likes, label: "Notes Liked" },
                    { icon: "🗓️", val: joinedDate, label: "Member Since", raw: true },
                ].map(s => (
                    <div key={s.label} className="profile-stat-chip">
                        <div className="profile-stat-icon">{s.icon}</div>
                        <div className="profile-stat-val">{s.raw ? s.val : s.val.toLocaleString()}</div>
                        <div className="profile-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className={`profile-form-card ${mounted ? "animate-in" : ""}`} style={{ animationDelay: "0.15s" }}>
                <div className="profile-form-header">
                    <span className="page-eyebrow">About Me</span>
                </div>
                <div className="profile-field-row">
                    <div className="profile-field">
                        <label className="profile-label">Display Name</label>
                        {editing
                            ? <input className="inp" value={profile.display_name} onChange={e => setProfile(p => ({ ...p, display_name: e.target.value }))} placeholder="Your name" />
                            : <div className="profile-value">{profile.display_name || "—"}</div>
                        }
                    </div>
                    <div className="profile-field">
                        <label className="profile-label">Email</label>
                        <div className="profile-value" style={{ opacity: 0.7 }}>{user.email}</div>
                    </div>
                </div>
                <div className="profile-field" style={{ marginTop: 16 }}>
                    <label className="profile-label">Bio</label>
                    {editing
                        ? <textarea className="inp profile-bio-inp" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder="Tell your campus what you're about... 🎯" rows={3} />
                        : <div className="profile-value">{profile.bio || <span style={{ opacity: 0.45 }}>No bio yet — click Edit to add one!</span>}</div>
                    }
                </div>
                <div className="profile-field-row" style={{ marginTop: 16 }}>
                    <div className="profile-field">
                        <label className="profile-label">Department</label>
                        {editing
                            ? <select className="inp" value={profile.department} onChange={e => setProfile(p => ({ ...p, department: e.target.value }))}>
                                <option value="">Select department</option>
                                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                            </select>
                            : <div className="profile-value">{profile.department || "—"}</div>
                        }
                    </div>
                    <div className="profile-field">
                        <label className="profile-label">Year of Study</label>
                        {editing
                            ? <select className="inp" value={profile.year} onChange={e => setProfile(p => ({ ...p, year: e.target.value }))}>
                                <option value="">Select year</option>
                                {YEARS.map(y => <option key={y}>{y}</option>)}
                            </select>
                            : <div className="profile-value">{profile.year || "—"}</div>
                        }
                    </div>
                </div>
                {msg && <div className={msg.startsWith("✅") ? "auth-success" : "auth-error"} style={{ marginTop: 16 }}>{msg}</div>}
                {editing && (
                    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                        <button className={`btn-glow sm ${saving ? "loading" : ""}`} onClick={saveProfile} disabled={saving}>
                            {saving ? <span className="spinner" /> : "💾 Save Changes"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// NOTICE BOARD (STUDENT VIEW)
function NoticeBoard({ user }) {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 50);
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        const { data } = await supabase.from("campus_announcements").select("*").order("created_at", { ascending: false });
        if (data) setNotices(data);
        setLoading(false);
    };

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div>
                    <div className="page-eyebrow">Announcements</div>
                    <h2 className="page-title">Notice <span className="title-accent">Board</span></h2>
                    <p className="page-sub">Official updates and campus-wide notifications</p>
                </div>
                <div className="notice-header-icon">📢</div>
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--muted2)" }}>
                    <span className="spinner" style={{ marginBottom: 12 }} />
                    <p>Fetching latest updates...</p>
                </div>
            ) : notices.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>No announcements yet. Check back soon!</p>
                </div>
            ) : (
                <div className="notice-board">
                    {notices.map((n, i) => (
                        <div key={n.id} className={`notice-card ${mounted ? "animate-in" : ""}`} style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="notice-card-glow" />
                            <div className="notice-card-header">
                                <div className="notice-badge">OFFICIAL</div>
                                <span className="notice-time">{new Date(n.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                            <div className="notice-card-body">
                                {n.text}
                            </div>
                            <div className="notice-card-footer">
                                <div className="notice-author">
                                    <div className="author-avatar">A</div>
                                    <span>Posted by Campus Admin</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── TIMETABLE TRACKER ────────────────────────────────────────────────────────
function TimetablePage({ user }) {
    const [step, setStep] = useState("loading"); // loading | setup | grid
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState(1);
    const [slots, setSlots] = useState([]);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const [mounted, setMounted] = useState(false);
    // Modal state
    const [modal, setModal] = useState(null); // { day, time } | null
    const [form, setForm] = useState({ subject: "", faculty: "", room: "", endTime: "" });
    const [addingSlot, setAddingSlot] = useState(false);

    useEffect(() => { setTimeout(() => setMounted(true), 50); loadSettings(); }, []);

    const loadSettings = async () => {
        const { data } = await supabase.from("timetable_settings").select("*").eq("user_id", user.id).single();
        if (data) {
            setCourse(data.course);
            setSemester(data.semester);
            await fetchSlots(data.course, data.semester);
            setStep("grid");
        } else {
            setStep("setup");
        }
    };

    const fetchSlots = async (c, s) => {
        const { data } = await supabase.from("timetable_slots").select("*")
            .eq("user_id", user.id).eq("course", c).eq("semester", s);
        if (data) setSlots(data);
    };

    const saveSetup = async () => {
        if (!course) return setMsg("Please select a course.");
        setSaving(true); setMsg("");
        await supabase.from("timetable_settings").upsert({ user_id: user.id, course, semester }, { onConflict: "user_id" });
        await fetchSlots(course, semester);
        setSaving(false);
        setStep("grid");
    };

    const openModal = (day, time) => {
        // Check if slot already exists
        const existing = slots.find(s => s.day === day && s.start_time === time);
        if (existing) return; // slot taken
        const idx = TT_TIMES.indexOf(time);
        const endTime = TT_TIMES[idx + 1] || time;
        setForm({ subject: "", faculty: "", room: "", endTime });
        setModal({ day, time });
    };

    const addSlot = async () => {
        if (!form.subject.trim()) return;
        setAddingSlot(true);
        const color = TT_COLORS[slots.length % TT_COLORS.length];
        const { data, error } = await supabase.from("timetable_slots").insert({
            user_id: user.id, day: modal.day, start_time: modal.time,
            end_time: form.endTime, subject: form.subject.trim(),
            faculty: form.faculty.trim(), room: form.room.trim(),
            course, semester, color
        }).select().single();
        if (!error && data) {
            setSlots(s => [...s, data]);
        }
        setModal(null);
        setAddingSlot(false);
    };

    const deleteSlot = async (id, e) => {
        e.stopPropagation();
        setSlots(s => s.filter(x => x.id !== id));
        await supabase.from("timetable_slots").delete().eq("id", id);
    };

    const getSlot = (day, time) => slots.find(s => s.day === day && s.start_time === time);
    const semCount = COURSES[course] || 8;

    if (step === "loading") return (
        <div className="page"><div className="empty-state"><div className="empty-icon">⏳</div><p>Loading your timetable...</p></div></div>
    );

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div>
                    <div className="page-eyebrow">Schedule</div>
                    <h2 className="page-title">My <span className="title-accent">Timetable</span></h2>
                    <p className="page-sub">
                        {step === "grid" ? <>{course} · Semester {semester} · <button className="switch-link" onClick={() => setStep("setup")} style={{ fontSize: 13 }}>Change</button></> : "Set up your weekly class schedule"}
                    </p>
                </div>
                {step === "grid" && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 14px", fontSize: 13, color: "var(--muted2)" }}>
                        <I.Timetable /> {slots.length} class{slots.length !== 1 ? "es" : ""} added
                    </div>
                )}
            </div>

            {/* ── SETUP STEP ── */}
            {step === "setup" && (
                <div className={`pref-form ${mounted ? "animate-in" : ""}`}>
                    <div className="pref-form-inner">
                        <div className="pref-section">
                            <div className="pref-label">🎓 Your Course</div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8, marginTop: 8 }}>
                                {Object.keys(COURSES).map(c => (
                                    <button key={c} className={`option-chip ${course === c ? "active" : ""}`}
                                        onClick={() => { setCourse(c); setSemester(1); }}>
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {course && (
                            <div className="pref-section" style={{ marginTop: 24 }}>
                                <div className="pref-label">📅 Current Semester <span style={{ color: "var(--muted2)", fontWeight: 400, fontSize: 12 }}>({COURSES[course]} total)</span></div>
                                <div className="option-row" style={{ flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                                    {Array.from({ length: COURSES[course] }, (_, i) => i + 1).map(s => (
                                        <button key={s} className={`option-chip ${semester === s ? "active" : ""}`}
                                            onClick={() => setSemester(s)}>
                                            Sem {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {msg && <div className="auth-error" style={{ marginTop: 16 }}>{msg}</div>}
                        <button className={`btn-glow full ${saving ? "loading" : ""}`} style={{ marginTop: 28 }}
                            onClick={saveSetup} disabled={saving}>
                            {saving ? <span className="spinner" /> : "Continue to Timetable ✨"}
                        </button>
                    </div>
                </div>
            )}

            {/* ── GRID STEP ── */}
            {step === "grid" && (
                <div className={`tt-scroll-wrap ${mounted ? "animate-in" : ""}`}>
                    <div className="tt-grid">
                        {/* Header row */}
                        <div className="tt-time-header" />
                        {TT_DAYS.map(d => (
                            <div key={d} className="tt-day-header">{d.slice(0, 3)}</div>
                        ))}

                        {/* Time rows */}
                        {TT_TIMES.map((time, ti) => (
                            <>
                                <div key={`t-${time}`} className="tt-time-label">{time}</div>
                                {TT_DAYS.map(day => {
                                    const slot = getSlot(day, time);
                                    return (
                                        <div key={`${day}-${time}`} className="tt-cell"
                                            onClick={() => !slot && openModal(day, time)}>
                                            {slot ? (
                                                <div className="tt-slot" style={{ background: `${slot.color}18`, border: `1.5px solid ${slot.color}55`, borderLeft: `3px solid ${slot.color}` }}>
                                                    <button className="tt-delete-btn" onClick={e => deleteSlot(slot.id, e)}><I.X /></button>
                                                    <div className="tt-slot-subject" style={{ color: slot.color }}>{slot.subject}</div>
                                                    {slot.faculty && <div className="tt-slot-meta">👤 {slot.faculty}</div>}
                                                    {slot.room && <div className="tt-slot-meta">📍 {slot.room}</div>}
                                                    <div className="tt-slot-time">{slot.start_time} – {slot.end_time}</div>
                                                </div>
                                            ) : (
                                                <button className="tt-add-btn"><I.Plus /></button>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        ))}
                    </div>

                    <div style={{ marginTop: 16, fontSize: 12, color: "var(--muted2)", textAlign: "center" }}>
                        💡 Click any empty cell to add a class · Click ✕ on a slot to remove it
                    </div>
                </div>
            )}

            {/* ── ADD SLOT MODAL ── */}
            {modal && (
                <div className="tt-modal-overlay" onClick={() => setModal(null)}>
                    <div className="tt-modal animate-slide-up" onClick={e => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700 }}>📚 Add Class</h3>
                            <button onClick={() => setModal(null)} style={{ background: "none", border: "none", color: "var(--muted2)", cursor: "pointer", fontSize: 18 }}>✕</button>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 16, display: "flex", gap: 12 }}>
                            <span>📅 {modal.day}</span>
                            <span>🕐 {modal.time} – {form.endTime}</span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <input className="inp" placeholder="Subject name *" value={form.subject}
                                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} autoFocus />
                            <input className="inp" placeholder="Faculty / Professor (optional)" value={form.faculty}
                                onChange={e => setForm(f => ({ ...f, faculty: e.target.value }))} />
                            <div style={{ display: "flex", gap: 10 }}>
                                <input className="inp" placeholder="Room / Hall (optional)" value={form.room}
                                    onChange={e => setForm(f => ({ ...f, room: e.target.value }))} style={{ flex: 1 }} />
                                <select className="inp" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} style={{ flex: 0, minWidth: 90 }}>
                                    {TT_TIMES.filter(t => t > modal.time).map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                            <button className={`btn-glow sm ${addingSlot ? "loading" : ""}`} onClick={addSlot}
                                disabled={addingSlot || !form.subject.trim()}>
                                {addingSlot ? <span className="spinner" /> : "Add Class"}
                            </button>
                            <button className="btn-ghost" onClick={() => setModal(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// MARKETPLACE / BUY-SELL BOARD
const MARKET_CATS = ["Textbooks", "Electronics", "Furniture", "Clothing", "Stationery", "Cycles", "Other"];
const MARKET_CONDITIONS = ["Brand New", "Like New", "Good", "Fair"];
const MARKET_CAT_EMOJI = { Textbooks: "📚", Electronics: "💻", Furniture: "🪑", Clothing: "👕", Stationery: "✏️", Cycles: "🚲", Other: "📦" };
const MARKET_CAT_COLOR = { Textbooks: "#6366f1", Electronics: "#ec4899", Furniture: "#f59e0b", Clothing: "#22c55e", Stationery: "#8b5cf6", Cycles: "#14b8a6", Other: "#64748b" };

function MarketplacePage({ user }) {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", price: "", category: "Textbooks", condition: "Good" });
    const [saving, setSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setTimeout(() => setMounted(true), 50); fetchItems(); }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from("marketplace_items").select("*").order("created_at", { ascending: false });
        if (data) setItems(data);
    };

    const postItem = async () => {
        if (!form.title || !form.price) return;
        setSaving(true);
        await supabase.from("marketplace_items").insert({
            title: form.title, description: form.description, price: parseFloat(form.price),
            category: form.category, condition: form.condition,
            user_id: user.id, author_name: user.user_metadata?.full_name || user.email.split("@")[0],
            author_email: user.email,
        });
        setForm({ title: "", description: "", price: "", category: "Textbooks", condition: "Good" });
        setShowForm(false); setSaving(false); fetchItems();
    };

    const deleteItem = async (id) => {
        setItems(it => it.filter(x => x.id !== id));
        await supabase.from("marketplace_items").delete().eq("id", id);
    };

    const filtered = items.filter(it => {
        if (filter !== "All" && it.category !== filter) return false;
        if (search && !it.title.toLowerCase().includes(search.toLowerCase()) && !(it.description || "").toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="page">
            <div className={`page-header ${mounted ? "animate-in" : ""}`}>
                <div>
                    <div className="page-eyebrow">Campus Trade</div>
                    <h2 className="page-title">Market<span className="title-accent">place</span></h2>
                    <p className="page-sub">Buy, sell, and trade with fellow students</p>
                </div>
                <button className="btn-glow sm" onClick={() => setShowForm(!showForm)}>+ List Item</button>
            </div>

            {showForm && (
                <div className="upload-panel animate-slide-down" style={{ marginBottom: 24 }}>
                    <h3>📦 List an Item for Sale</h3>
                    <div className="form-row">
                        <input className="inp" placeholder="Item name" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                        <input className="inp" type="number" placeholder="Price (₹)" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} style={{ maxWidth: 140 }} />
                    </div>
                    <div className="form-row" style={{ marginTop: 10 }}>
                        <select className="inp" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                            {MARKET_CATS.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <select className="inp" value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}>
                            {MARKET_CONDITIONS.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <textarea className="inp" placeholder="Describe your item (optional)" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ margin: "10px 0", resize: "vertical" }} />
                    <div className="upload-actions">
                        <button className={`btn-glow sm ${saving ? "loading" : ""}`} onClick={postItem} disabled={saving || !form.title || !form.price}>{saving ? <span className="spinner" /> : "Post Item"}</button>
                        <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Search + Filters */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 320 }}>
                    <I.Search />
                    <input className="inp" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
                    <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted2)", pointerEvents: "none" }}><I.Search /></div>
                </div>
                <div style={{ display: "flex", gap: 6, overflowX: "auto", flex: "1 1 auto" }}>
                    {["All", ...MARKET_CATS].map(f => (
                        <button key={f} className={`tag-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f === "All" ? "🛒" : MARKET_CAT_EMOJI[f]} {f}</button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">🛍️</div><p>{search || filter !== "All" ? "No items match your search." : "No items listed yet — be the first to sell!"}</p></div>}

            <div className="marketplace-grid">
                {filtered.map((item, i) => {
                    const color = MARKET_CAT_COLOR[item.category] || "#6366f1";
                    const isOwner = item.user_id === user.id;
                    return (
                        <div key={item.id} className={`marketplace-card ${mounted ? "animate-in" : ""}`} style={{ animationDelay: `${i * 0.07}s` }}>
                            <div className="marketplace-card-top">
                                <div className="marketplace-emoji">{MARKET_CAT_EMOJI[item.category] || "📦"}</div>
                                <div className="marketplace-price">₹{Number(item.price).toLocaleString("en-IN")}</div>
                            </div>
                            <div className="marketplace-card-body">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                                    <span className="marketplace-cat-badge" style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>{MARKET_CAT_EMOJI[item.category]} {item.category}</span>
                                    {isOwner && <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", opacity: 0.6, fontSize: 14 }}>✕</button>}
                                </div>
                                <h3 className="marketplace-title">{item.title}</h3>
                                {item.description && <p className="marketplace-desc">{item.description}</p>}
                                <div className="marketplace-meta">
                                    <span className="marketplace-condition" style={{ background: item.condition === "Brand New" ? "#22c55e18" : "var(--bg3)", color: item.condition === "Brand New" ? "#22c55e" : "var(--muted2)" }}>{item.condition}</span>
                                    <span>by {item.author_name}</span>
                                    <span>{new Date(item.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                                </div>
                            </div>
                            {!isOwner && (
                                <a href={`mailto:${item.author_email}?subject=Interested in: ${item.title}&body=Hi! I saw your listing for "${item.title}" (₹${item.price}) on CampusCatalyst Marketplace. Is it still available?`}
                                    className="marketplace-contact-btn"
                                    style={{ borderColor: `${color}44`, color }}>
                                    ✉️ Contact Seller
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// APP ROOT
export default function App() {
    const [user, setUser] = useState(null); const [loading, setLoading] = useState(true); const [page, setPage] = useState("home");
    const [theme, setTheme] = useState(() => localStorage.getItem("cc-theme") || "dark");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("cc-theme", theme);
    }, [theme]);
    const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
    useEffect(() => { supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setLoading(false); }); const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => { setUser(session?.user ?? null); }); return () => subscription.unsubscribe(); }, []);
    const logout = async () => { await supabase.auth.signOut(); setUser(null); setPage("home"); };
    const go = p => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
    if (loading) return <div className="app-loading"><div className="brand-logo" style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#5b6ef5,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><I.Zap /></div><div className="loading-bar"><div className="loading-fill" /></div></div>;
    if (!user) return <AuthPage onAuth={setUser} theme={theme} toggleTheme={toggleTheme} />;
    const pages = { home: <HomePage setPage={go} user={user} />, notes: <NotesPage user={user} />, roommate: <RoommatePage user={user} />, mess: <MessMenuPage />, lostfound: <LostFoundPage user={user} />, events: <EventsPage user={user} />, admin: <AdminPage user={user} />, profile: <ProfilePage user={user} />, notices: <NoticeBoard user={user} />, timetable: <TimetablePage user={user} />, marketplace: <MarketplacePage user={user} /> };
    return (<div className="app"><Navbar page={page} setPage={go} user={user} onLogout={logout} theme={theme} toggleTheme={toggleTheme} /><main className="main-content" key={page}>{pages[page]}</main><CampusBot user={user} /></div>);
}
