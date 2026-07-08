import { Link } from "react-router-dom";
import {
  FiMenu,
  FiBell,
  FiSun,
  FiMoon,
  FiUser,
} from "react-icons/fi";

export default function Navbar({
  onMenuClick,
  dark,
  onToggleTheme,
}) {
  return (
    // <header className="sticky top-0 z-50 glass border-b border-slate-200/50 dark:border-slate-700/50">
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-xl p-2.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {dark ? (
              <FiSun className="h-5 w-5" />
            ) : (
              <FiMoon className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-xl py-1.5 pl-2 pr-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
              <FiUser className="h-4 w-4 text-white" />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Super Admin
              </p>
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}   