import { useEffect, useState } from "react";
import { fetchTopNews } from "../services/api";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopNews()
      .then((res) => {
        setNews(res.data.articles || []);
        setError(null);
      })
      .catch((err) => {
        setNews([]);
        setError(
          "Unable to connect to the news service. Please check if the backend is running and try again."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>⚠️ Connection Error</h2>
        <p style={{ color: "#d32f2f", fontSize: "16px" }}>{error}</p>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Make sure your backend server is running at{" "}
          <code>{import.meta.env.VITE_API_URL || "http://localhost:5000"}</code>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Top Headlines</h2>
      <div className="news-grid">
        {news.length > 0 ? (
          news.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))
        ) : (
          <p>No articles found at the moment. Please try again later.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
