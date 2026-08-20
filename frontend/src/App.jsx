import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DeveloperProfile from "./pages/DeveloperProfile";
import SearchResults from "./pages/SearchResults";
import GraphPage from "./pages/GraphPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/developers/:name"
          element={<DeveloperProfile />}
        />
        <Route
          path="/search"
          element={<SearchResults />}
        />
        <Route
          path="/graph"
          element={<GraphPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;