// Footer.jsx – Polished Full-Section Dark Footer for AgroScan

import { Link } from "react-router-dom";
import {
  Sprout,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

const gradient =
  "bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900/90";
const glass = `${gradient} backdrop-blur`;
const accent = "text-lime-400";
const hover = "hover:text-lime-300";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${glass} text-white w-full`}>
      {/* ── Main Content ── */}
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        {/* ── Brand ── */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-bold mb-4"
          >
            <Sprout size={34} className={accent} strokeWidth={2.5} />
            Agro<span className={accent}>Scan</span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-300 max-w-xs">
            AI‑driven cauliflower disease detection.
            Empowering farmers with instant insights for healthier crops and sustainable agriculture.
          </p>

          {/* ── Social Icons ── */}
          <div className="mt-6 flex gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className={hover}
            >
              <Github size={22} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className={hover}
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className={hover}
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>

        {/* ── Product Links ── */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-gray-200 uppercase tracking-wide">
            Product
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className={hover}>Home</Link></li>
            <li><Link to="/diagnose" className={hover}>Diagnose</Link></li>
            <li><Link to="/dataset" className={hover}>Dataset</Link></li>
          </ul>
        </div>

        {/* ── Resources ── */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-gray-200 uppercase tracking-wide">
            Resources
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/docs" className={hover}>Docs</Link></li>
            <li><Link to="/about" className={hover}>About</Link></li>
            <li><a href="mailto:support@example.com" className={hover}>Contact</a></li>
          </ul>
        </div>

        {/* ── Newsletter ── */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-gray-200 uppercase tracking-wide">
            Newsletter
          </h4>
          <p className="text-sm text-gray-300">
            Get monthly insights and updates. No spam.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded bg-emerald-800/50 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded bg-lime-500 px-3 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-lime-400 focus:ring-2 focus:ring-lime-400"
            >
              <Mail size={16} strokeWidth={2} /> Join
            </button>
          </form>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="bg-emerald-950/80 border-t border-white/10 text-center py-4 text-xs text-gray-400">
        © {year} AgroScan. All rights reserved.
      </div>
    </footer>
  );
}
