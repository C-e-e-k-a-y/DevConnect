import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchTerm = skill.trim();

    if (!searchTerm) {
      return;
    }

    navigate(
      `/search?skill=${encodeURIComponent(searchTerm)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-9 flex w-full max-w-2xl rounded-2xl border border-white/10 bg-white p-1.5 shadow-2xl"
    >
      {/* Search icon */}
      <div className="hidden items-center pl-4 text-slate-400 sm:flex">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search by skill — e.g. React, Python..."
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-dev-navy outline-none placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="rounded-xl bg-dev-green px-5 py-3 text-sm font-bold text-dev-navy transition-all duration-200 hover:bg-dev-green-light hover:shadow-lg active:scale-95"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;