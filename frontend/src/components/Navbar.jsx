import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 w-[90%] max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-slate-900"
        >
          DevConnect
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Developers
          </Link>

          <Link
            to="/graph"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Graph Explorer
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;