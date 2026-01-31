const express = require("express");
const axios = require("axios");

const router = express.Router();

/* ------------------ CATEGORY KEYWORDS ------------------ */
const CATEGORY_KEYWORDS = {
  business: [
    "business",
    "market",
    "stock",
    "economy",
    "finance",
    "company",
    "trade",
    "deal",
    "inflation",
    "budget",
    "tax",
    "policy",
    "senate",
    "government",
    "investment",
    "bank",
    "crypto"
  ],

  sports: [
    "sport",
    "match",
    "team",
    "league",
    "nfl",
    "football",
    "cricket",
    "nba",
    "player",
    "coach"
  ],

  technology: [
    "tech",
    "technology",
    "ai",
    "software",
    "google",
    "apple",
    "microsoft",
    "space",
    "nasa",
    "robot"
  ],

  health: [
    "health",
    "virus",
    "medical",
    "disease",
    "covid",
    "hospital",
    "doctor",
    "medicine"
  ]
};

/* ------------------ FETCH ONCE ------------------ */
const fetchTopHeadlines = async () => {
  const response = await axios.get(
    "https://newsapi.org/v2/top-headlines",
    {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    }
  );
  return response.data.articles || [];
};

/* ------------------ TEST ------------------ */
router.get("/test", (req, res) => {
  res.json({ message: "newsRoutes working ✅" });
});

/* ------------------ TOP HEADLINES ------------------ */
router.get("/top", async (req, res) => {
  try {
    const articles = await fetchTopHeadlines();
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top news" });
  }
});

/* ------------------ CATEGORY ------------------ */
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const keywords = CATEGORY_KEYWORDS[category] || [];

    const articles = await fetchTopHeadlines();

    let filtered = articles.filter((a) => {
      const text = `
        ${a.title || ""}
        ${a.description || ""}
        ${a.content || ""}
      `.toLowerCase();

      return keywords.some((kw) => text.includes(kw));
    });

    // 🔥 FALLBACK: if nothing matched
    if (filtered.length === 0) {
      filtered = articles.slice(0, 8);
    }

    res.json({ articles: filtered });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category news" });
  }
});


/* ------------------ SEARCH ------------------ */
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase();
    if (!q) return res.json({ articles: [] });

    const articles = await fetchTopHeadlines();

    const filtered = articles.filter((a) => {
      const text = `
        ${a.title || ""}
        ${a.description || ""}
        ${a.content || ""}
      `.toLowerCase();

      return text.includes(q);
    });

    res.json({ articles: filtered });
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
