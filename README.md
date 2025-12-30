 # Phase 2 — AI-Powered Article Enhancer & Publisher

 An orchestration script (Node.js) that enhances and republishes articles by finding top-ranking competitors, extracting content, improving the original with an LLM, and publishing the updated version via a CRUD API.

 ---

 ## 📌 Objective

 For each article produced in Phase 1 the pipeline will:

 1. Fetch the article from your API
 2. Search the article title via Google Custom Search
 3. Identify top competing blog articles
 4. Scrape the real content from those articles
 5. Rewrite and improve the original using an LLM
 6. Append references to the source articles
 7. Publish the updated article via the CRUD API

 ---

 ## 🧠 High-Level Architecture

 Source API → Google Custom Search → External Articles → Scraper → LLM Rewrite → Publish API

 ---

 ## ⚠️ Difficulty & Considerations

- External API integrations (Google, OpenAI)
- Web scraping across heterogeneous HTML
- Prompt engineering and LLM output validation
- Rate limits and polite scraping (respect robots.txt)

 ---

 ## 🛠 Tech Stack

- Node.js — runtime
- axios — HTTP requests
- cheerio — HTML parsing / scraping
- Google Custom Search API — search queries
- OpenAI API (or other LLM provider) — rewriting
- dotenv — environment variables

 ---

 ## 📂 Project Structure

 phase2-article-enhancer/

- index.js — pipeline entrypoint
- .env — environment variables (not committed)
- services/
  - fetchArticles.js — fetch articles from Phase 1 API
  - googleSearch.js — query Google Custom Search API
  - scrapeContent.js — scrape candidate articles
  - llmRewrite.js — orchestrate LLM rewrite
  - publishArticle.js — call CRUD API to update articles
- utils/
  - isArticleUrl.js — helper to validate article URLs

 ---

 ## ⚙️ Prerequisites

- Phase 1 backend (the source CRUD API) is available
- Node.js installed (recommended v16+)
- Create a `.env` file with the values below

 Example API endpoints used by the project:

```
GET  http://localhost:5000/api/articles
POST http://localhost:5000/api/articles
```

 ---

 ## 🔐 Environment Variables

Create a `.env` file in the project root with:

```env
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_search_engine_id
OPENAI_API_KEY=your_openai_api_key
API_BASE_URL=http://localhost:5000
```

Notes:
- Use the official Google Custom Search API — do NOT scrape Google search result pages.
- Keep API keys secret and out of source control.

 ---

 ## 🔎 Core Workflow Overview

1. Fetch articles from the source API
2. Search each title (top N results) via Google Custom Search
3. Filter for article-like URLs (exclude YouTube, social, PDFs)
4. Choose best 1–2 competing articles
5. Scrape content with `cheerio` (best-effort selectors)
6. Provide scraped text as context to the LLM to rewrite the original
7. Append a `References` section with source URLs
8. Publish via the source CRUD API

 ---

 ## ▶️ Running the Script

Install dependencies and run:

```bash
npm install
node index.js
```

Each article is processed sequentially: fetched → enhanced → published.

 ---

 ## ✅ Completion Checklist (Phase 2)

- Fetch articles from API
- Google search via official API
- Extract top competing articles
- Scrape real content
- LLM-based rewriting
- Append reference citations
- Publish updated articles

 ---

 ## ⚠️ Limitations & Future Enhancements

- Scraping is best-effort and site-dependent
- LLM output quality depends on prompt and model
- Google API usage limits may apply

Possible improvements:
- Retry and error-recovery
- Duplicate detection and plagiarism checks
- Rate limiting and exponential backoff
- Better extraction (Readability.js / heuristics)

 ---

 ## 👨‍💻 Author

Shobhit Poddar — Full Stack Developer | Backend & AI Integration

 ---

## 📄 License

This project is licensed under the MIT License.
Copy code

---
