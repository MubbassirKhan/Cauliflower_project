// // NavBar.jsx
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// /* ─── Menu icons – add / remove as needed ─── */
// import {
//   Home,
//   Stethoscope,
//   Database,
//   BookOpen,
//   Info,
//   Menu,
//   X,
// } from "lucide-react";

// /* ─── Logo ───
//    • Replace src with your SVG / PNG if you have one.
//    • If you’d rather keep a pure‑icon logo, swap <img …> with <Home …> or any Lucide icon.
// */
// const Logo = () => (
//   <img
//     src="/logo.svg"              // ← put your own file here
//     alt="CauliCare logo"
//     className="w-8 h-8 object-contain"
//   />
// );

// export default function NavBar() {
//   const [open, setOpen] = useState(false);
//   const { pathname } = useLocation();   // highlight the active link

//   /* label, route, icon component */
//   const navItems = [
//     { label: "Home", to: "/", icon: Home },
//     { label: "Diagnose", to: "/diagnose", icon: Stethoscope },
//     { label: "Dataset", to: "/dataset", icon: Database },
//     { label: "Docs", to: "/docs", icon: BookOpen },
//     { label: "About", to: "/about", icon: Info },
//   ];

//   /* Tailwind colour helpers */
//   const barBg   = "bg-green-900/90 backdrop-blur";   // slight translucency
//   const accent  = "text-lime-400";
//   const hover   = "hover:text-lime-300";

//   return (
//     <header className={`${barBg} sticky top-0 z-50 text-white shadow-md`}>
//       <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
//         {/* Brand + logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-2xl font-bold tracking-wide"
//         >
//           <Logo />
//           Cauli<span className={accent}>Care</span>
//         </Link>

//         {/* Desktop navigation */}
//         <nav className="hidden gap-8 md:flex">
//           {navItems.map(({ label, to, icon: Icon }) => {
//             const active = pathname === to;
//             return (
//               <Link
//                 key={to}
//                 to={to}
//                 className={`
//                   flex items-center gap-2 font-medium transition
//                   ${active ? accent : ""} ${hover}
//                 `}
//               >
//                 <Icon size={18} strokeWidth={2} />
//                 {label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Mobile toggle */}
//         <button
//           className="md:hidden p-2 rounded transition hover:bg-white/10"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
//         >
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <nav className="md:hidden flex flex-col gap-2 bg-green-800 px-4 pb-4">
//           {navItems.map(({ label, to, icon: Icon }) => (
//             <Link
//               key={to}
//               to={to}
//               onClick={() => setOpen(false)}
//               className="flex items-center gap-3 py-2 border-b border-green-700 transition hover:text-lime-300"
//             >
//               <Icon size={20} strokeWidth={2} />
//               {label}
//             </Link>
//           ))}
//         </nav>
//       )}
//     </header>
//   );
// }








// NavBar.jsx – “AgroScan” dark‑gradient bar, now FIXED on top
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* ─── Icons ─── */
import {
  Sprout,  // logo icon
  Home,
  Stethoscope,
  Database,
  BookOpen,
  Info,
  Menu,
  X,
} from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const navItems = [
    { label: "Home", to: "/", icon: Home },
    { label: "Diagnose", to: "/diagnose", icon: Stethoscope },
    { label: "Dataset", to: "/dataset", icon: Database },
    { label: "Docs", to: "/docs", icon: BookOpen },
    { label: "About", to: "/about", icon: Info },
  ];

  /* Style helpers */
  const gradient = "bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900/90";
  const glass    = `${gradient} backdrop-blur`;
  const accent   = "text-lime-400";
  const hover    = "hover:text-lime-300";

  return (
    /*  changed: fixed inset‑x‑0 top‑0 w‑full  */
    <header className={`${glass} fixed inset-x-0 top-0 w-full z-50 text-white shadow-md`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo + brand */}
        <Link
          to="/"
          aria-label="AgroScan Home"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide"
        >
          <Sprout size={30} className={accent} strokeWidth={2.5} />
          Agro<span className="text-lime-400">Scan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {navItems.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center gap-2 font-medium transition
                ${pathname === to ? accent : ""} ${hover}
              `}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded transition hover:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden flex flex-col gap-2 px-4 pb-4 border-t border-white/10 backdrop-blur bg-emerald-900/80">
          {navItems.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2 border-b border-white/10 transition hover:text-lime-300"
            >
              <Icon size={20} strokeWidth={2} />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
