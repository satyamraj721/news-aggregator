📰 Satyam News – News Aggregator App

Satyam News is a full-stack news aggregation web application that fetches and displays the latest news articles by category and search keywords.
It is built with React + Vite on the frontend and Node.js + Express on the backend, using the NewsAPI as the data source.

🚀 Live Demo

Frontend (Vercel):
👉 https://news-aggregator-two-olive.vercel.app/

Backend (Render):
👉 https://news-aggregator-ug2i.onrender.com

Health Check:
👉 https://news-aggregator-ug2i.onrender.com/health

✨ Features

📰 Latest top headlines

🗂️ Category-based news

Business

Sports

Technology

Health

🔍 Search news by keyword

⚡ Fast UI using Vite

🌐 Fully deployed (Frontend + Backend)

📱 Responsive design

🛡️ CORS-enabled backend

🔧 Production-ready API handling

🛠️ Tech Stack
Frontend

React

Vite

Axios

JavaScript (ES6+)

CSS

Backend

Node.js

Express.js

Axios

NewsAPI

Deployment

Frontend: Vercel

Backend: Render

📂 Project Structure
news-aggregator/
│
├── backend/
│   ├── routes/
│   │   └── newsRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NewsCard.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Category.jsx
│   │   │   └── Search.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Environment Variables
Backend (backend/.env)
NEWS_API_KEY=your_newsapi_key_here
PORT=5000

Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000


For production (Vercel):

VITE_API_URL=https://news-aggregator-ug2i.onrender.com

▶️ Run Locally
1️⃣ Clone the repository
git clone https://github.com/satyamraj721/news-aggregator.git
cd news-aggregator

2️⃣ Start Backend
cd backend
npm install
npm start


Backend runs at:

http://localhost:5000

3️⃣ Start Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔌 API Endpoints
Method	Endpoint	Description
GET	/api/news/top	Top headlines
GET	/api/news/category/:category	Category news
GET	/api/news/search?q=keyword	Search news
GET	/health	Backend health check
