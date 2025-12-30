import dotenv from "dotenv";
dotenv.config();

import { fetchArticles } from "./services/fetchArticles.js";
import { getTopTwoArticles } from "./services/googleSearch.js";
import { scrapeArticleContent } from "./services/scrapeContent.js";
import { rewriteArticle } from "./services/llmRewrite.js";
import { appendReferences } from "./services/llmRewrite.js";
import { publishArticle } from "./services/publishArticle.js";

(async () => {
  const articles = await fetchArticles();

  for (const article of articles) {
    console.log(`Processing: ${article.title}`);

    const links = await getTopTwoArticles(article.title);

    const contents = [];
    for (const link of links) {
      contents.push(await scrapeArticleContent(link));
    }

    const rewritten = await rewriteArticle(article, contents, links);
    const finalContent = appendReferences(rewritten, links);

    await publishArticle({
        title: article.title + " (Updated)",
        content: finalContent,
        link: article.link + "?enhanced=true"
    });

    console.log("Published updated article");
  }
})();
