import { useState } from "react";

const Navbar = ({ onCategory, onSearch }) => {
  const categories = ["business", "sports", "technology", "health"];
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput("");
    }
  };

  return (
    <nav style={{ padding: "15px", background: "#222", color: "#fff" }}>
      {/* Logo + Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <img
          src="/logo.png"
          alt="Satyam News Logo"
          style={{ height: "40px" }}
        />
        <h2 style={{ margin: 0 }}>SATYAM NEWS</h2>
      </div>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategory(category)}
            style={{
              padding: "8px 16px",
              background: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Search news..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            flex: 1,
            maxWidth: "300px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
