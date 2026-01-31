import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";

function App() {
  const [category, setCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCategory(""); // Clear category when searching
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setSearchKeyword(""); // Clear search when selecting category
  };

  return (
    <div>
      <Navbar onCategory={handleCategoryClick} onSearch={handleSearch} />
      <main style={{ padding: "20px" }}>
        {searchKeyword ? (
          <Search keyword={searchKeyword} onClear={() => setSearchKeyword("")} />
        ) : category ? (
          <Category category={category} onBack={() => setCategory("")} />
        ) : (
          <Home />
        )}
      </main>
    </div>
  );
}

export default App;
