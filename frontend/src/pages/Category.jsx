import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import { fetchCategoryNews } from "../services/api";

const Category = ({ category, onBack }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCategoryNews(category)
      .then((res) => {
        setArticles(res.data.articles || []);
        setError(null);
      })
      .catch((err) => {
        setArticles([]);
        setError(
          "Unable to fetch articles for this category. Please check if the backend is running."
        );
      })
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <section>
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ textTransform: "capitalize" }}>{category} News</h2>
          <button onClick={onBack}>← Back to Top Headlines</button>
        </div>
        <div style={{ padding: "20px" }}>
          <p style={{ color: "#d32f2f", fontSize: "16px" }}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ textTransform: "capitalize" }}>{category} News</h2>
        <button onClick={onBack}>← Back to Top Headlines</button>
      </div>
      <div className="news-grid">
        {articles.length > 0 ? (
          articles.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))
        ) : (
          <p>No articles found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default Category;
