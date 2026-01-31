import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import { fetchTopNews } from "../services/api";

const Search = ({ keyword, onClear }) => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchTopNews()
      .then((res) => {
        const articles = res.data.articles || [];
        setAllNews(articles);
        filterNews(articles, keyword);
      })
      .catch(() => {
        setAllNews([]);
        setFilteredNews([]);
      })
      .finally(() => setLoading(false));
  }, [keyword]);

  const filterNews = (articles, searchKeyword) => {
    if (!searchKeyword.trim()) {
      setFilteredNews(articles);
      return;
    }
    const lowerKeyword = searchKeyword.toLowerCase();
    const filtered = articles.filter(
      (article) =>
        (article.title && article.title.toLowerCase().includes(lowerKeyword)) ||
        (article.description &&
          article.description.toLowerCase().includes(lowerKeyword))
    );
    setFilteredNews(filtered);
  };

  if (loading) return <Loader />;

  return (
    <section>
      <div style={{ marginBottom: "16px" }}>
        <h2>Search Results for "{keyword}"</h2>
        <button onClick={onClear} style={{ marginRight: "10px" }}>
          ← Clear Search
        </button>
        <span style={{ color: "#666" }}>
          ({filteredNews.length} articles found)
        </span>
      </div>

      <div className="news-grid">
        {filteredNews.length > 0 ? (
          filteredNews.map((article) => (
            <NewsCard
              key={article.url || article.title}
              article={article}
            />
          ))
        ) : (
          <p>No articles found for "{keyword}".</p>
        )}
      </div>
    </section>
  );
};

// ✅ THIS LINE WAS MISSING
export default Search;
