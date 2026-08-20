import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-dev-navy/95 text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex min-h-18 w-[92%] max-w-7xl items-center justify-between py-3">
        
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-dev-green text-sm font-black text-dev-navy transition-transform duration-200 group-hover:scale-105">
            D
          </div>

          <span className="text-xl font-extrabold tracking-tight">
            Dev<span className="text-dev-green">Connect</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            Developers
          </NavLink>

          <NavLink
            to="/graph"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-dev-green text-dev-navy"
                  : "bg-dev-blue-light text-white hover:bg-dev-green hover:text-dev-navy"
              }`
            }
          >
            Graph Explorer
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;