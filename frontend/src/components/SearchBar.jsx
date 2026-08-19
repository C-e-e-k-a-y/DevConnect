import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!skill.trim()) {
      return;
    }

    navigate(
      `/search?skill=${encodeURIComponent(skill.trim())}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex max-w-2xl rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm"
    >
      <input
        type="text"
        placeholder="Search developers by skill..."
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;